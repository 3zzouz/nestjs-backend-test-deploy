import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLoginDto } from './dto/create-login.dto';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() data: CreateLoginDto) {
    return this.authService.signIn(data);
  }
  @ApiBearerAuth('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshToken(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @Post('resetpassword')
  async resetPassword(@Body() data: CreateEmailDto) {
    const tokenPassword = Math.floor(
      100000000000000 + Math.random() * 984455559298,
    ).toString();
    const user = { email: data.email };
    await this.authService.resetPassword(user, tokenPassword);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Patch('modifyPassword/:id')
  async newPassword(@Body() data: UpdateUserDto, @Param('id') id: string) {
    await this.authService.updatePassword(id, data);
  }
  @ApiBearerAuth('access-token')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/users',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  @UseGuards(AccessTokenGuard)
  @Patch('updateuserby/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.file = file?.filename;
    const { user, token } = await this.authService.updateProfile(id, data);
    return { user, token };
  }
}
