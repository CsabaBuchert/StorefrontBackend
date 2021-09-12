import { ModelStoreBase } from './modelBase'

export type OrderProduct = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
}

export class OrderProductStore extends ModelStoreBase<OrderProduct> {
    constructor() {
        super("order_products");
    }

    async create(product: OrderProduct): Promise<OrderProduct> {
        const result = await this.runQuery(`INSERT INTO ${this.database} (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`, [product.order_id, product.product_id, product.quantity]);
        return result.rows[0];
    }

    async edit(product: OrderProduct): Promise<OrderProduct> {
        const result = await this.runQuery(`UPDATE ${this.database} SET order_id = $2 product_id = $3 quantity = $4) WHERE id=$1`, [product.id, product.order_id, product.product_id, product.quantity]);
        return result.rows[0];
    }
}
