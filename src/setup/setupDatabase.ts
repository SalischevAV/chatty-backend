import mongoose from 'mongoose';
import { config } from './config';
import Logger from 'bunyan';

const logger: Logger = config.createLogger('setupDB');

export default () => {
  const connect = () => {
    mongoose
      .connect(config.DB_URL!)
      .then(() => logger.info('Successfully connected to DB'))
      .catch((error) => {
        logger.error('Error connecting to DB ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
