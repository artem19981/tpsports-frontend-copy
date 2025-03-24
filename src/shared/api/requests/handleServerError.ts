import { AxiosError } from 'axios';

export async function handleServerError<T>(fn: Promise<T | string>) {
  const data = await fn;

  const isDataString = typeof data === 'string';

  if (!isDataString) {
    return data;
  }

  const error = JSON.parse(data) as AxiosError;

  throw error;
}
