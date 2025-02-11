import { GoneException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { Blog } from 'src/typeorm/Blog';
import { GlobalService } from 'src/utils/global.service';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    private readonly configService: ConfigService,
  ) {}

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  getUrlFromBucket(s3Bucket, fileName) {
    const {
      config: { params, region },
    } = s3Bucket;
    const regionString = region.includes(process.env.AWS_S3_REGION) ? '' : '-' + region;
    return `https://${params.Bucket}.s3${regionString}.amazonaws.com/${fileName}`;
  }

  async uploadFile(filename: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: filename,
        Body: file,
      }),
    );
    const url=this.getUrlFromBucket(process.env.AWS_S3_BUCKET,filename)
    this.userRepository.update(GlobalService.user_id,{profile_url : url})
  }

  createUser(createUserDto: CreateUserDto) {
    // this is done after validation
    const newUser: User = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  readUser(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, updatedUser: UpdateUserDto) {
    return this.userRepository.update(id, updatedUser);
  }

  deleteUser(user_id: number) {
    return this.userRepository.delete(user_id);
  }

  // public + users private
  getPublicFeed() {
    const is_public = true;
    const conditions = {
      ...(is_public ? { is_public } : {}),
    };

    return this.blogRepository.find({
      where: conditions,
    });
  }

  // users (public + private)
  getPrivateFeed() {
    const author_id = GlobalService.user_id;
    const conditions = {
      ...(author_id ? { author_id } : {}),
    };

    return this.blogRepository.find({
      where: conditions,
    });
  }
}
