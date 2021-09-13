import { HandlerBase } from './handlerBase';
import { Request, Response } from 'express'
import { OrderProduct, OrderProductStore } from '../models/orderProduct';

export default class OrderProductHandler extends HandlerBase<OrderProduct, OrderProductStore> {
    constructor() {
        super(OrderProductStore);
    }

    override async create(req: Request, res: Response): Promise<void> {
        await this.handleRequest(false, req, res, async (req) => {
            return await this.store.create({
                order_id: req.body.order_id,
                product_id: req.body.product_id,
                quantity: req.body.quantity
            });
        });
    }

    override async edit(req: Request, res: Response): Promise<void> {
        await this.handleRequest(false, req, res, async (req) => {
            return await this.store.edit({
                id: req.body.id,
                order_id: req.body.order_id,
                product_id: req.body.product_id,
                quantity: req.body.quantity
            });
        });
    }
}