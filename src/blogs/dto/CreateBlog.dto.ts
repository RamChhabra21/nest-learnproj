import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateBlogDto{
    @IsNotEmpty()
    author_id : number 

    @IsNotEmpty()
    @MinLength(2)
    content : string

    is_public : Boolean
}