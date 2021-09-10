import Client from '../database'
import bcrypt from "bcrypt"

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password: string;
}

export class UserStore {
    private saltRounds = parseInt(process.env.SALT_ROUNDS as unknown as string);
    private pepper = process.env.BCRYPT_PASSWORD as unknown as string;

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get user ${id}. Error: ${err}`)
        }
    }

    async create(user: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
            const conn = await Client.connect();
            const hash = bcrypt.hashSync(user.password + this.pepper, this.saltRounds);
            const result = await conn.query(sql, [user.first_name, user.last_name, hash]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not add user ${user.first_name} ${user.last_name}. Error: ${err}`);
        }
    }

    async edit(user: User): Promise<User> {
        try {
            const sql = 'UPDATE users SET first_name = $2 last_name = $3 password = $4) WHERE id=$1'
            const conn = await Client.connect();
            const hash = bcrypt.hashSync(user.password + this.pepper, this.saltRounds);
            const result = await conn.query(sql, [user.id, user.first_name, user.last_name, hash]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not edit user ${user.first_name} ${user.last_name}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)'
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    async authenticate(first_name: string, last_name: string, password: string): Promise<User | null> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users WHERE first_name=($1) AND last_name=($2)';

        const result = await conn.query(sql, [first_name, last_name]);

        if (result.rows.length) {
            const user = result.rows[0];

            if (bcrypt.compareSync(password + this.pepper, user.password)) {
                return user;
            }
        }

        return null;
    }
}
