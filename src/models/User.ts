import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({})
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        validate: {isEmail: true},
        unique: true
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    username!: string;

    @Column({})
    password!: string;
}

export default User;