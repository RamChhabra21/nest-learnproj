import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateCommentDto{
    @IsNotEmpty()
    blog_id : number

    @IsNotEmpty()
    author_id : number 

    @IsNotEmpty()
    @MinLength(2)
    content : string

    is_public : Boolean
}