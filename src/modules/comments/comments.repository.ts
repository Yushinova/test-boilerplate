import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comments.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsRepository {
    constructor(
        @InjectRepository(Comment)
        private readonly commentModel: Repository<Comment>
    ) {}
}
