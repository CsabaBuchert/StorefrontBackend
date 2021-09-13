import bodyParser from "body-parser";
import ServerCreator from "./serverCreator";
import express from "express";

export default class ServerBase {
    public app;
    public port: number;
    public api_name: string;

    constructor(port: number, api_name: string) {
        this.app = ServerCreator.getInstance().getServer(port);
        this.port = port;
        this.api_name = api_name;

        this.app.use(bodyParser.json())

        //set endpoint
        this.app.get("/" + this.api_name, (request, response) => {
            if (this.messageReceived) {
                this.messageReceived(request, response);
            } else {
                throw new Error(
                    "Api can't receive message due to unimplemented messageReceived function!"
                );
            }
        });
    }

    public startListening(): void {
        ServerCreator.getInstance().startListening(this.port);
    }

    protected messageReceived?(
        request: express.Request,
        response: express.Response
    ): void;
}
