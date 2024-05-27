import { Model, Table, Column, DataType, BeforeCreate, HasMany } from 'sequelize-typescript';
import bcryptjs from 'bcryptjs';
import Thread from './Thread';
import Post from './Post';

@Table({updatedAt: false})
class User extends Model {
    @Column({
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
        primaryKey: true,
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

    @HasMany(() => Thread, 'author')
    threads!: Thread[];

    @HasMany(() => Post, 'author')
    posts!: Post[];

    @BeforeCreate
    static async generatePasswordHash(user: User) {
        const hashedPassword: string = await bcryptjs.hash(user.password, 10);
        user.password = hashedPassword;
    }
}

export default User;