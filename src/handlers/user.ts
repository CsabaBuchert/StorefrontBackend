import { HandlerBase } from './handlerBase';
import { Request, Response } from 'express'
import { User, UserStore } from '../models/user';

export default class UserHandler extends HandlerBase<User, UserStore> {
    constructor() {
        super(UserStore);
    }

    override async create(req: Request, res: Response): Promise<void> {
        await this.handleRequest(true, req, res, async (req) => {
            return await this.store.create({
                user_name: req.body.user_name,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            });
        });
    }

    override async edit(req: Request, res: Response): Promise<void> {
        await this.handleRequest(false, req, res, async (req) => {
            return await this.store.edit({
                id: req.body.id,
                user_name: req.body.user_name,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            });
        });
    }

    async authenticate(req: Request, res: Response): Promise<void> {
        await this.handleRequest(true, req, res, async (req) => {
            return await this.store.authenticate(req.body.user_name, req.body.password);
        });
    }
}