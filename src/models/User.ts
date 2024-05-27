import { Model, Table, Column, DataType, BeforeCreate } from 'sequelize-typescript';
import bcryptjs from 'bcryptjs';

@Table
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        validate: {isEmail: true},
        unique: true,
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;

    @BeforeCreate
    static async generatePasswordHash(user: User) {
        const hashedPassword: string = await bcryptjs.hash(user.password, 10);
        user.password = hashedPassword;
    }
}

export default User;