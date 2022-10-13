import express, { Express } from 'express';
import { ChattyServer } from './setup/setupServer';
import dbConnect from './setup/setupDatabase';
import { config } from './setup/config';

class Application {
  public initialize(): void {
    this.loadConfig();
    dbConnect();
    const app: Express = express();
    const server: ChattyServer = new ChattyServer(app);
    server.start();
  }

  private loadConfig() {
    config.validateConfig();
  }
}

const application = new Application();
application.initialize();
