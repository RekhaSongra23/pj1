import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/user.schema";
import { authController } from "./auth.controller";
import { AuthService } from "./authService";

@Module({
    imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema}]), JwtModule.register({
        secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:"2h"}
    })],
    controllers:[authController],
    providers:[AuthService,JwtService],

})

export class AuthMOdule{}