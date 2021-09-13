import express from "express";
import UserHandler from "../handlers/user";
import ServerBase from "./serverBase";

export default class StoreFrontServer extends ServerBase {
    private handler = new UserHandler();

    constructor(port: number) {
        super(port, "store_front");

        this.app.get(`/${this.api_name}/users`, (req, res) => this.handler.index(req, res));
        this.app.get(`/${this.api_name}/users/:id`, (req, res) => this.handler.show(req, res));
        this.app.post(`/${this.api_name}/users`, (req, res) => this.handler.create(req, res));
        this.app.post(`/${this.api_name}/users/:id`, (req, res) => this.handler.edit(req, res));
        this.app.delete(`/${this.api_name}/users`, (req, res) => this.handler.delete(req, res));
        this.app.get(`/${this.api_name}/authenticate`, (req, res) => this.handler.authenticate(req, res));

        process.on("unhandledRejection", (error) => {
            console.log("unhandledRejection", error);
        });
    }
    protected messageReceived?(request: express.Request, response: express.Response): void {
        response.send("Store front backend entry point");
    }
}
