import dotenv from 'dotenv';
import path from 'path';

const testEnv = process.env.SD_TEST_ENV ?? 'qa';

dotenv.config({
  path: path.resolve(__dirname, `.env.${testEnv}`)
});

export const env = {
  testEnv,
  baseUrl: process.env.SD_BASE_URL!,
  username: process.env.SD_USERNAME!,
  password: process.env.SD_PASSWORD!
};
