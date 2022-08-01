import { Body, Controller, Get, Post, UseInterceptors, UploadedFile} from '@nestjs/common';
import { AppService } from './app.service';
import { map, toArray } from 'rxjs'; 
import { Render } from '@nestjs/common';
import {Data} from './models/data.schema'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  showData(): string {
    return `Check`
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: `./files`
    })
  }))
  async inputData(@UploadedFile() file, @Body() dataDto: Data ) {

    // console.log(dataDto,);
    // console.log(file, `<<<<< controller`);
    
    // return this.appService.inputData(dataDto)
    return this.appService.parse(file)
  }
}


