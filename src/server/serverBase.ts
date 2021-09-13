import bodyParser from "body-parser";
import ServerCreator from "./serverCreator";
import express from "express";

export default class ServerBase {
    private _app;
    private _port: number;
    private _api_name: string;

    constructor(port: number, api_name: string) {
        this._app = ServerCreator.getInstance().getServer(port);
        this._port = port;
        this._api_name = api_name;

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

    public get app() {
        return this._app;
    }

    protected get api_name(): string {
        return this._api_name;
    }

    public get port(): number {
        return this._port;
    }

    public startListening(): void {
        ServerCreator.getInstance().startListening(this.port);
    }

    protected messageReceived?(
        request: express.Request,
        response: express.Response
    ): void;
}
