import { Model, Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, UpdatedAt, AllowNull } from 'sequelize-typescript';
import Category from './Category';
import User from './User';
import Thread from './Thread';

@Table({updatedAt: false})
class Post extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true
    })
    id!: number;
    
    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    text!: string;

    @Column
    @ForeignKey(() => Thread)
    threadId!: number;

    @BelongsTo(() => Thread, 'threadId')
    thread_info!: Thread

    @Column
    @ForeignKey(() => User)
    author!: string;

    @BelongsTo(() => User, 'author')
    author_info!: User
}

export default Post;