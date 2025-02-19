import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(["author_id", "updated_at"])
export class Blog {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'blog_id',
  })
  id: number; // this is a PK

  @Column({
    name: 'content',
    nullable: true,
    type : 'longtext'
  })
  content: string;

  @Column({
    name: 'is_public',
    nullable: false,
    default: true,
  })
  is_public: boolean;

  @Column({
    name: 'author_id',
    nullable: true,
  })
  author_id: number; // works as FK

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
