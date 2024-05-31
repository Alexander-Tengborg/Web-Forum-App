import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

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

    @BelongsTo(() => Thread, {foreignKey:'threadId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    thread_info!: Thread

    @Column
    @ForeignKey(() => User)
    author!: string;

    @BelongsTo(() => User, 'author')
    author_info!: User
}

export default Post;