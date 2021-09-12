import Client from '../database'
import { QueryResult } from 'pg';

export class ModelStoreBase<ModelType> {
    protected database: string;

    constructor(database: string) {
        this.database = database;
    }

    protected async runQuery(sql: string, params: any[] | null): Promise<QueryResult<any>> {
        try {
            const conn = await Client.connect();
            let result;
            if (params) {
                result = await conn.query(sql, params);
            } else {
                result = await conn.query(sql);
            }
            conn.release();

            return result;
        } catch (err) {
            throw new Error(`Query run error. Error: ${err}`);
        }
    }

    async index(): Promise<ModelType[]> {
        const result = await this.runQuery(`SELECT * FROM ${this.database}`, null);
        return result.rows;
    }

    async show(id: string): Promise<ModelType> {
        const result = await this.runQuery(`SELECT * FROM ${this.database} WHERE id=($1)`, [id]);
        return result.rows[0];
    }

    async delete(id: string): Promise<ModelType> {
        const result = await this.runQuery(`DELETE FROM ${this.database} WHERE id=($1)`, [id]);
        return result.rows[0];
    }

    async deleteAll() {
        await this.runQuery(`DELETE FROM ${this.database}`, null);
    }
}
