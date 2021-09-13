import { Request, Response } from 'express'
import jwt from "jsonwebtoken"
import { ModelStoreBase } from '../models/modelBase';

export abstract class HandlerBase<ModelType, ModelStoreType extends ModelStoreBase<ModelType>> {
    protected store: ModelStoreType;
    //private useJws: boolean;

    constructor(type: { new(): ModelStoreType; }) {
        this.store = new type();
        //this.useJws = process.env.USE_JWS != undefined ? (parseInt(process.env.USE_JWS as unknown as string) == 1) : true;
    }

    protected async handleRequest(useJwt: boolean, req: Request, res: Response, store_func: (req: Request) => any): Promise<void> {
        try {
            const result = await store_func(req);
            if (useJwt) {
                res.json(jwt.sign(result, process.env.TOKEN_SECRET as unknown as string));
            } else {
                res.json(result);
            }
        } catch (err) {
            res.status(400);
            res.json(err);
        }
    }

    async index(req: Request, res: Response): Promise<void> {
        await this.handleRequest(false, req, res, async () => {
            return await this.store.index();
        });
    }

    async show(req: Request, res: Response): Promise<void> {
        await this.handleRequest(false, req, res, async (req) => {
            return await this.store.show(req.body.id);
        });
    }

    abstract create(req: Request, res: Response): Promise<void>;

    abstract edit(req: Request, res: Response): Promise<void>;

    async delete(req: Request, res: Response): Promise<void> {
        await this.handleRequest(false, req, res, async (req) => {
            return await this.store.delete(req.body.id);
        });
    }
}