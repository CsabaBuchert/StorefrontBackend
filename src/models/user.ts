import { ModelStoreBase } from './modelBase'
import bcrypt from "bcrypt"

export type User = {
    id?: number;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
}

export class UserStore extends ModelStoreBase<User> {
    private saltRounds = parseInt(process.env.SALT_ROUNDS as unknown as string);
    private pepper = process.env.BCRYPT_PASSWORD as unknown as string;

    constructor() {
        super("users");
    }

    async create(user: User): Promise<User> {
        const hash = bcrypt.hashSync(user.password + this.pepper, this.saltRounds);
        const result = await this.runQuery(`INSERT INTO ${this.database} (user_name, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *`, [user.user_name, user.first_name, user.last_name, hash]);
        return result.rows[0];
    }

    async edit(user: User): Promise<User> {
        const hash = bcrypt.hashSync(user.password + this.pepper, this.saltRounds);
        const result = await this.runQuery(`UPDATE ${this.database} SET user_name = $2, first_name = $3, last_name = $4, password = $5 WHERE id=$1 RETURNING *`, [user.id, user.user_name, user.first_name, user.last_name, hash]);
        return result.rows[0];
    }

    async authenticate(user_name: string, password: string): Promise<User | null> {
        const result = await this.runQuery(`SELECT * FROM ${this.database} WHERE user_name=($1)`, [user_name]);

        if (result.rows.length) {
            const user = result.rows[0];

            if (bcrypt.compareSync(password + this.pepper, user.password)) {
                return user;
            }
        }

        return null;
    }
}
