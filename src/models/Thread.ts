import { Model, Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, UpdatedAt, AllowNull } from 'sequelize-typescript';
import Category from './Category';
import User from './User';

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

    @Column
    @ForeignKey(() => Category)
    category!: string;

    @BelongsTo(() => Category,  )
    category_info!: Category

    @Column
    @ForeignKey(() => User)
    author!: string;

    @BelongsTo(() => User, 'author')
    author_info!: User

}

export default Thread;