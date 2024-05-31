import { Model, Table, Column, DataType, BeforeCreate, HasMany } from 'sequelize-typescript';

import Thread from './Thread';

@Table({updatedAt: false})
class Category extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true
    })
    id!: number;

    @Column({
        primaryKey: true,
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    category_name!: string;

    @HasMany(() => Thread, {foreignKey:'category', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    threads!: Thread[];
}

export default Category;