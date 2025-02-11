import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number; // this is a PK

  @Column({
    name: 'username',
    nullable: false,
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  emailaddress: string;

  @Column({
    name: 'password',
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    type: 'bigint',
    name: 'contact',
    nullable: true,
  })
  contact_no: number;

  @Column({
    name: 'role',
    default: 'user',
  })
  role: string;

  @Column({
    name: 'profile_url',
    default: '',
  })
  profile_url: string;

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
