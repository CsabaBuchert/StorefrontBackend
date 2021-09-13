import express from "express";
import OrderHandler from "../handlers/order";
import ProductHandler from "../handlers/product";
import UserHandler from "../handlers/user";
import authenticate from "../middlewares/authenticate";
import ServerBase from "./serverBase";

export default class StoreFrontServer extends ServerBase {
    private userHandler = new UserHandler();
    private productHandler = new ProductHandler();
    private orderHandler = new OrderHandler();

    constructor(port: number) {
        super(port, "store_front");

        this.app.get(`/${this.api_name}/users`, authenticate, (req, res) => this.userHandler.index(req, res));
        this.app.get(`/${this.api_name}/users/:id`, authenticate, (req, res) => this.userHandler.show(req, res));
        this.app.post(`/${this.api_name}/users`, (req, res) => this.userHandler.create(req, res));
        this.app.post(`/${this.api_name}/users/:id`, authenticate, (req, res) => this.userHandler.edit(req, res));
        this.app.delete(`/${this.api_name}/users`, authenticate, (req, res) => this.userHandler.delete(req, res));
        this.app.get(`/${this.api_name}/authenticate`, (req, res) => this.userHandler.authenticate(req, res));

        this.app.get(`/${this.api_name}/products`, (req, res) => this.productHandler.index(req, res));
        this.app.get(`/${this.api_name}/products/:id`, authenticate, (req, res) => this.productHandler.show(req, res));
        this.app.post(`/${this.api_name}/products`, authenticate, (req, res) => this.productHandler.create(req, res));
        this.app.post(`/${this.api_name}/products/:id`, authenticate, (req, res) => this.productHandler.edit(req, res));
        this.app.delete(`/${this.api_name}/products`, authenticate, (req, res) => this.productHandler.delete(req, res));

        this.app.get(`/${this.api_name}/orders`, authenticate, (req, res) => this.orderHandler.index(req, res));
        this.app.get(`/${this.api_name}/orders/:id`, authenticate, (req, res) => this.orderHandler.show(req, res));
        this.app.post(`/${this.api_name}/orders`, authenticate, (req, res) => this.orderHandler.create(req, res));
        this.app.post(`/${this.api_name}/orders/:id`, authenticate, (req, res) => this.orderHandler.edit(req, res));
        this.app.delete(`/${this.api_name}/orders`, authenticate, (req, res) => this.orderHandler.delete(req, res));

        this.app.get(`/${this.api_name}/orderProducts`, authenticate, (req, res) => this.orderHandler.index(req, res));
        this.app.get(`/${this.api_name}/orderProducts/:id`, authenticate, (req, res) => this.orderHandler.show(req, res));
        this.app.post(`/${this.api_name}/orderProducts`, authenticate, (req, res) => this.orderHandler.create(req, res));
        this.app.post(`/${this.api_name}/orderProducts/:id`, authenticate, (req, res) => this.orderHandler.edit(req, res));
        this.app.delete(`/${this.api_name}/orderProducts`, authenticate, (req, res) => this.orderHandler.delete(req, res));

        process.on("unhandledRejection", (error) => {
            console.log("unhandledRejection", error);
        });
    }
    protected messageReceived?(request: express.Request, response: express.Response): void {
        response.send("Store front backend entry point");
    }
}
