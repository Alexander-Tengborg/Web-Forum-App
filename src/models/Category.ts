import { Model, Table, Column, DataType, BeforeCreate } from 'sequelize-typescript';

@Table
class Category extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    category_name!: string;
}

export default Category;