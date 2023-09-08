import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(user: any, token: string) {
    const url = `exemple.com/auth/confirm?token=${token}`
    await this.mailerService.sendMail({
      to:user.email,
      subject:'welcome to our nice app ! confirm your email',
      template:'./activation',
      context:{
        name:user.name,
        url
      },
    })
  }
}
