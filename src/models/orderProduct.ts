import Client from '../database'

export type OrderProduct = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
}

export class OrderProductStore {
    async index(): Promise<OrderProduct[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM order_products';
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get order_products. Error: ${err}`);
        }
    }

    async show(id: string): Promise<OrderProduct> {
        try {
            const sql = 'SELECT * FROM order_products WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get order_product ${id}. Error: ${err}`)
        }
    }

    async create(product: OrderProduct): Promise<OrderProduct> {
        try {
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [product.order_id, product.product_id, product.quantity]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not add order_product. Error: ${err}`);
        }
    }

    async edit(product: OrderProduct): Promise<OrderProduct> {
        try {
            const sql = 'UPDATE order_products SET order_id = $2 product_id = $3 quantity = $4) WHERE id=$1';
            const conn = await Client.connect();
            const result = await conn.query(sql, [product.id, product.order_id, product.product_id, product.quantity]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not edit order_product ${product.id}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<OrderProduct> {
        try {
            const sql = 'DELETE FROM order_products WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not delete order_product ${id}. Error: ${err}`);
        }
    }

    async deleteAll(): Promise<OrderProduct> {
        try {
            const sql = 'DELETE FROM order_products';
            const conn = await Client.connect();
            const result = await conn.query(sql);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not delete order_products. Error: ${err}`)
        }
    }
}
