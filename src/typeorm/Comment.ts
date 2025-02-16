import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(["blog_id", "created_at"])
export class Comment {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'Comment_id',
  })
  id: number; // this is a PK

  @Column({
    name: 'content',
    nullable: true,
    default: '',
  })
  content: string;

  @Column({
    name: 'is_public',
    nullable: false,
    default: true,
  })
  is_public: boolean;

  @Column({
    name: 'blog_id',
    nullable: true,
  })
  blog_id: number; // works as FK 1 

  @Column({
    name: 'author_id',
    nullable: true,
  })
  author_id: number; // works as FK 2 

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
