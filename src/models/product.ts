import { ModelStoreBase } from './modelBase'

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore extends ModelStoreBase<Product> {
    constructor() {
        super("products");
    }

    async create(product: Product): Promise<Product> {
        const result = await this.runQuery(`INSERT INTO ${this.database} (name, price, category) VALUES($1, $2, $3) RETURNING *`, [product.name, product.price, product.category]);
        return result.rows[0];
    }

    async edit(product: Product): Promise<Product> {
        const result = await this.runQuery(`UPDATE ${this.database} SET name = $2, price = $3, category = $4 WHERE id=$1 RETURNING *`, [product.id, product.name, product.price, product.category]);
        return result.rows[0];
    }
}
