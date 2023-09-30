import { Request } from 'express';

export const parseFormData = (req: Request) => {
  const keys: string[] = Object.keys(req.body);
  const object: any = {};
  keys.forEach((k) => {
    object[k] = req.body[k];
  });
  return object;
};
