import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import {Data, DataDocument} from './models/data.schema'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CsvParser } from 'nest-csv-parser'
import { createReadStream} from 'fs';

@Injectable()
export class AppService {
  constructor(
    private readonly csvParser: CsvParser,
    @InjectModel('raw_data') private readonly dataModel: Model<DataDocument>
  ){}

  async parse(file: any) {
    console.log(file, `<<<file`);
    
    const stream = createReadStream(file.path)
    console.log(stream, `<<<<stream`);
    
    let entities = await this.csvParser.parse(stream, Data)

    entities.list.slice(1)

    entities.list.forEach(el => {
      let values = Object.values(el)      

      let arrValues = values[0].toString().split(',')

      let resultTime = arrValues[0]
      let enodebId = arrValues[5].slice(11)
      let cellId = arrValues[3].slice(15)
      let availDur = +arrValues[8]


      
      if (isNaN(availDur)) {
        console.log(`there's NaN`);
        return `NaN`
      }

      const newData = new this.dataModel({
        resultTime,
        enodebId,
        cellId,
        availDur
      })

      // console.log(newData);
      
      // return availDur
      return newData.save()
    })
  }

  async getGraph() {
    return this.dataModel.find({})
    .then((data) => {

      let result = data.map(el=> {
        let obj = {
          resultTime: el.resultTime,
          availability: 0
        }

        obj.availability = (el.availDur / 900) * 100

        return obj
      })
      
      return result
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
