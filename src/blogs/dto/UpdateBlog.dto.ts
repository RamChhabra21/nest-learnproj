import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UpdateBlogDto{
    @IsNotEmpty()
    author_id : number

    @IsNotEmpty()
    @MinLength(2)
    content : string

    is_public : Boolean
}