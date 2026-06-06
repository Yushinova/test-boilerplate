import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;  //теперь number

    @Column()
    title!: string;

    @Column()
    text!: string;
}