import { Request, Response } from "express";

export const getAllUser = (req: Request, resp: Response) => {
  resp.status(200).json({
    status: "success",
  });
};
