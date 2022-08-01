import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import {Data, DataDocument} from './models/data.schema'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CsvParser } from 'nest-csv-parser'
import { createReadStream, readFileSync } from 'fs';
import path from 'path';

@Injectable()
export class AppService {
  constructor(
    private readonly csvParser: CsvParser
    // @InjectModel('raw_data') private readonly dataModel: Model<DataDocument>
  ){}

  async parse(file: any) {
    const stream = createReadStream(file.path)
    const entities = await this.csvParser.parse(stream, Data)

    console.log(entities);
    
    return entities
  }

  // async inputData(data : Data) : Promise<Data> {
  //   console.log(Data, `<<<< service`);
    
  //   const newData = new this.dataModel(data)
  //   return newData.save()
  // }
}
