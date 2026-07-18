import dotenv from 'dotenv';
import path from 'path';

const testEnv = process.env.SD_TEST_ENV ?? 'qa';

dotenv.config({
  path: path.resolve(__dirname, `.env.${testEnv}`)
});


function getEnv(name:string):string {
  const value = process.env[name]?.trim();
  if(!value){
    throw new Error(`Environment variable invalid/not found: ${name}`);
  }
  return value;
}

export const env = {
  testEnv,
  baseUrl: getEnv("SD_BASE_URL"),
  username: getEnv("SD_USERNAME"),
  password: getEnv("SD_PASSWORD")
};
