import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    public async create(createPostDto: CreatePostDto): Promise<Post> {
        return this.postsRepository.create(createPostDto);
    }

    public async findAll(): Promise<Post[]> {
        return this.postsRepository.findAll();
    }

    public async findOne(id: number): Promise<Post> {
        const post = await this.postsRepository.findById(id);
        if (!post) {
            throw new NotFoundException(`Пост с ID ${id} не найден`);
        }
        return post;
    }

    public async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
        await this.findOne(id); // проверяем, существует ли пост
        const updatedPost = await this.postsRepository.update(id, updatePostDto);
        if (!updatedPost) {
            throw new NotFoundException(`Пост с ID ${id} не найден`);
        }
        return updatedPost;
    }

    public async remove(id: number): Promise<void> {
        await this.findOne(id); // проверяем, существует ли пост
        await this.postsRepository.delete(id);
    }
}