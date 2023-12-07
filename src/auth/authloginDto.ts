import { IsEnum, IsNotEmpty, IsString } from "@nestjs/class-validator";



export class authloginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

