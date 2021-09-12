import { ModelStoreBase } from './modelBase'
import bcrypt from "bcrypt"

export type User = {
    id?: number;
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
        const result = await this.runQuery(`INSERT INTO ${this.database} (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *`, [user.first_name, user.last_name, hash]);
        return result.rows[0];
    }

    async edit(user: User): Promise<User> {
        const hash = bcrypt.hashSync(user.password + this.pepper, this.saltRounds);
        const result = await this.runQuery(`UPDATE ${this.database} SET first_name = $2 last_name = $3 password = $4) WHERE id=$1`, [user.id, user.first_name, user.last_name, hash]);
        return result.rows[0];
    }

    async authenticate(first_name: string, last_name: string, password: string): Promise<User | null> {
        const result = await this.runQuery(`SELECT * FROM ${this.database} WHERE first_name=($1) AND last_name=($2)`, [first_name, last_name]);

        if (result.rows.length) {
            const user = result.rows[0];

            if (bcrypt.compareSync(password + this.pepper, user.password)) {
                return user;
            }
        }

        return null;
    }
}
