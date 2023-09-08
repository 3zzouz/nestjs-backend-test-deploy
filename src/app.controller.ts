import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StreamableFileOptions } from '@nestjs/common/file-stream/interfaces';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('mail')
  async confirmEmail(@Res() response) {
    await this.appService.sendUserConfirmation(
      { email: 'qadg199@gmail.com', name: 'aziz' },
      Math.floor(1000 + Math.random() * 9000).toString(),
    );
  }

  @Get('file/:folder/:img')
  getFile(@Param('folder') folder, @Param('img') img): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), './upload/' + folder + '/' + img),
    );
    return new StreamableFile(file);
  }
}
//méthodes http read=>get create=>post update=>patch(modification partiel) , put(modification totale) delete=>delay