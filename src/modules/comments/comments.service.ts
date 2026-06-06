import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
    constructor(private readonly commentsRepository: CommentsRepository) {}

    public async create(): Promise<void> {}

    public async findAllByPostID(): Promise<void> {}
}
