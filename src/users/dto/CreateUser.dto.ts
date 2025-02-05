import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @MinLength(2)
    username : string;

    @IsNotEmpty()
    @IsEmail()
    emailaddress : string; 

    @IsNotEmpty()
    @MinLength(8)
    password : string;

    @IsNotEmpty()
    contact_no : number;
}