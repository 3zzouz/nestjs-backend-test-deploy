import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config/dist';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateLoginDto } from './dto/create-login.dto';
import * as argon2 from 'argon2';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private MailerService: MailerService,
  ) {}
  //generate token
  async generateToken(userId: string, userName: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          userName,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          userName,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: '10d',
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
  async signIn(data: CreateLoginDto) {
    //1ere test user exist
    const user = await this.userService.findUserByUserName(data.userName);
    if (!user) throw new BadRequestException('User does not exist');
    //2eme test password correcte
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password Is Incorrect');
    //3eme generation du token et retour de la réponse avec le token
    const token = await this.generateToken(user._id, user.userName);
    await this.updateRefreshToken(user._id, token.refreshToken);
    return { user, token };
  }
  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await argon2.hash(refreshToken);
    await this.userService.updateUser(userId, {
      refreshToken: hashedToken,
    });
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    //tester si l'utilasteur n'existe pas ou déconnecté
    if (!user || !user.refreshToken)
      throw new ForbiddenException('access denied');
    //test si les tokens sont identiques
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const token = await this.generateToken(user._id, user.userName);
    await this.updateRefreshToken(user._id, token.refreshToken);
    return token;
  }
  async logout(userId: string) {
    await this.userService.updateUser(userId, { refreshToken: null });
  }
  async resetPassword(user: any, tokenPassword: string) {
    const newPassword = tokenPassword;
    await this.userService.findUserByEmail(user.email);
    await this.MailerService.sendMail({
      to: user.email,
      template: './resetPassword',
      context: {
        subject: 'Reset Password',
        name: user.fullName,
        email: user.email,
        newPassword,
      },
    });
    const hashedPassword = await argon2.hash(newPassword);
    await this.userService.findOneUserAndResetPassword(
      { email: user.email },
      { password: hashedPassword },
    );
  }

  async updatePassword(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException('user not found ');
    const hashedPassword = await argon2.hash(updateUserDto.newPassword);
    const updatePass = await this.userService.updateUser(userId, {
      ...updateUserDto,
      password: hashedPassword,
    });
    const token = await this.generateToken(user._id, user.userName);
    await this.updateRefreshToken(user._id, token.refreshToken);
    return {updatePass,token};
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(userId, updateUserDto);
    const token = await this.generateToken(user._id, user.userName);
    await this.updateRefreshToken(userId, token.refreshToken);
    //console.log(updateUserDto);
    return { user, token };
  }
}
