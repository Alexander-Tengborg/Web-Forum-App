import { Model, Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, UpdatedAt, AllowNull, HasMany } from 'sequelize-typescript';
import Category from './Category';
import User from './User';
import Post from './Post';

@Table({updatedAt: false})
class Thread extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true
    })
    id!: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    text!: string;

    @Column
    @ForeignKey(() => Category)
    category!: string;

    @BelongsTo(() => Category, 'category')
    category_info!: Category

    @Column
    @ForeignKey(() => User)
    author!: string;

    @BelongsTo(() => User, 'author')
    author_info!: User

    @HasMany(() => Post, {foreignKey:'threadId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    posts!: Post[];
}

export default Thread;