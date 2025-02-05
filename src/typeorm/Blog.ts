import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog{
    @PrimaryGeneratedColumn({
        type : 'bigint',
        name : 'blog_id' 
    })
    id : number // this is a PK 

    @Column({
        name : "content",
        nullable : true,
        default : ''
    })
    content : string

    @Column({
        name : "is_public",
        nullable : false,
        default : true
    })
    is_public : boolean

    @Column({
        name : "author_id",
        nullable : true,
        
    })
    author_id : number // works as FK 
}