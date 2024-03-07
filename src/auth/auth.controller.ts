import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './authService';
import { CreateUserDto } from 'src/users/createUserDto';
import { authloginDto } from './authloginDto';

@Controller('auth')
export class authController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto:CreateUserDto) {
    try {
      const userCreate = await this.authService.createUser(createUserDto);
      return userCreate;
    } catch (err) {
      throw new HttpException(err.message, err.statuscode ?? 400);
    }
  }

  @Post('/signin')
  async signin(  username: string, password: string,
    @Body() usersign: authloginDto,
  ) {
    const userssign = await this.authService.login(
      usersign.username,
      usersign.password,
    );
    return userssign;
  }
}
