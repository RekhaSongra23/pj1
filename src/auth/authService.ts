import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/createUserDto';
import { User } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findbyusername(username: string) {
    return await this.userModel.findOne({ username });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, department, address } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await this.userModel.create({ ...createUserDto, password: hashedPassword, });
    return res;
  }

  async login(username: string, password: string) {
    const usersign = await this.findbyusername(username);
    if (!usersign) {
      throw new UnauthorizedException(`User not found`);
    }

    const validPassword = await bcrypt.compare(password, usersign.password);
    if (!validPassword) {
      throw new UnauthorizedException(`Password not matched`);
    }

    const payload = {
      sub: usersign.id,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });
    return { accessToken };
  }
}
