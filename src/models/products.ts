import Client from '../database'

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {

    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get product ${id}. Error: ${err}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            const conn = await Client.connect();
            const result = await conn.query(sql, [product.name, product.price, product.category]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not add product ${product.name}. Error: ${err}`);
        }
    }

    async edit(product: Product): Promise<Product> {
        try {
            const sql = 'UPDATE products SET name = $2 price = $3 category = $4) WHERE id=$1'
            const conn = await Client.connect();
            const result = await conn.query(sql, [product.id, product.name, product.price, product.category]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not edit product ${product.name}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)'
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const ret = result.rows[0];
            conn.release();

            return ret;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
}
