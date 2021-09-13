import { HandlerBase } from './handlerBase';
import { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order';

export default class OrderHandler extends HandlerBase<Order, OrderStore> {
    constructor() {
        super(OrderStore);
    }

    override async create(req: Request, res: Response): Promise<void> {
        await this.handleRequest(false, req, res, async (req) => {
            return await this.store.create({
                user_id: req.body.user_id,
                status: req.body.staus ?? "new"
            });
        });
    }

    override async edit(req: Request, res: Response): Promise<void> {
        await this.handleRequest(false, req, res, async (req) => {
            return await this.store.edit({
                id: req.body.id,
                user_id: req.body.user_id,
                status: req.body.staus ?? "new"
            });
        });
    }
}