import Client from '../database'

export type Order = {
    id?: number;
    user_id: number;
    status: string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get order ${id}. Error: ${err}`)
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [order.user_id, order.status]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not add order. Error: ${err}`);
        }
    }

    async edit(order: Order): Promise<Order> {
        try {
            const sql = 'UPDATE orders SET user_id = $2 status = $3) WHERE id=$1';
            const conn = await Client.connect();
            const result = await conn.query(sql, [order.id, order.user_id, order.status]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not edit order ${order.id}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    async deleteAll() {
        try {
            const sql = 'DELETE FROM orders';
            const conn = await Client.connect();
            await conn.query(sql);
            conn.release();
        } catch (err) {
            throw new Error(`Could not delete orders. Error: ${err}`)
        }
    }
}
