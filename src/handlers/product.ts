import { HandlerBase } from './handlerBase';
import { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product';

export default class ProductHandler extends HandlerBase<Product, ProductStore> {
    constructor() {
        super(ProductStore);
    }

    override async create(req: Request, res: Response): Promise<void> {
        await this.handleRequest(false, req, res, async (req) => {
            return await this.store.create({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category ?? ""
            });
        });
    }

    override async edit(req: Request, res: Response): Promise<void> {
        await this.handleRequest(false, req, res, async (req) => {
            return await this.store.edit({
                id: req.body.id,
                name: req.body.name,
                price: req.body.price,
                category: req.body.category ?? ""
            });
        });
    }
}