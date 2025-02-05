import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UpdateUserDto{
    @IsNotEmpty()
    @MinLength(2)
    username : string;

    @IsNotEmpty()
    @IsEmail()
    emailaddress : string; 

    @IsNotEmpty()
    contact_no : number;

    @IsNotEmpty()
    password : string;
}