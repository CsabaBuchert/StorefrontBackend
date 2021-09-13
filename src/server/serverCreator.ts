import express, { Express } from "express";

type ServerStorage = {
    server: Express;
    listening: boolean;
};

export default class ServerCreator {
    private static instance: ServerCreator;
    private serverStorage: Map<Number, ServerStorage>;

    private constructor() {
        this.serverStorage = new Map();
    }

    public static getInstance(): ServerCreator {
        if (!ServerCreator.instance) {
            ServerCreator.instance = new ServerCreator();
        }

        return ServerCreator.instance;
    }

    public getServer(port: number): Express {
        var storage = this.serverStorage.get(port);
        if (!storage) {
            const server = express();
            storage = { server: server, listening: false };
            this.serverStorage.set(port, storage);
        }
        return storage.server;
    }

    public startListening(port: number): void {
        var storage = this.serverStorage.get(port);
        if (storage) {
            if (!storage.listening) {
                storage.listening = true;
                storage.server.listen(port, () => {
                    console.log("Server listening on port " + port + "!");
                });
            }
        }
    }
}