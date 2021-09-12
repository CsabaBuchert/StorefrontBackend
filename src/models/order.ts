import { ModelStoreBase } from './modelBase'

export type Order = {
    id?: number;
    user_id: number;
    status: string;
}

export class OrderStore extends ModelStoreBase<Order> {
    constructor() {
        super("orders");
    }

    async create(order: Order): Promise<Order> {
        const result = await this.runQuery(`INSERT INTO ${this.database} (user_id, status) VALUES($1, $2) RETURNING *`, [order.user_id, order.status]);
        return result.rows[0];
    }

    async edit(order: Order): Promise<Order> {
        const result = await this.runQuery(`UPDATE ${this.database} SET user_id = $2 status = $3) WHERE id=$1`, [order.id, order.user_id, order.status]);
        return result.rows[0];
    }
}
