import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config();

class Config {
  public SERVER_PORT: number | string;
  public DB_PASSWORD: string | undefined;
  public DB_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public REDIS_HOST: string | undefined;

  constructor() {
    this.SERVER_PORT = process.env.SERVER_PORT || 5000;
    this.DB_URL = process.env.DB_URL;
    this.NODE_ENV = process.env.NODE_ENV;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
    this.REDIS_HOST = process.env.REDIS_HOST;
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({
      name,
      level: 'debug',
    });
  }

  public validateConfig() {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration error: ${key} is undefined`);
      }
    }
  }
}

export const config = new Config();
