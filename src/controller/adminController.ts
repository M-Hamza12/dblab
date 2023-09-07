import { Request, Response } from "express";
import { IGuest, ICabin } from "../Interface/interface";
import validator from "validator";
export const addGuest = (req: Request, resp: Response) => {
  try {
    const guest = <IGuest>req.body;
    if (
      !guest.countryFlag ||
      !guest.createdAt ||
      !guest.email ||
      !guest.fullName ||
      !guest.id ||
      !guest.natioanality ||
      !guest.nationalId
    )
      throw new Error("please provide complete info");
    if (validator.isEmail(guest.email))
      throw new Error("please enter valid email");
  } catch (error) {}
};

export const addCabin = (req: Request, resp: Response) => {
  const cabin = <ICabin>req.body;
  try {
    if (
      !cabin.createdAt ||
      !cabin.description ||
      !cabin.discount ||
      !cabin.discount ||
      !cabin.id ||
      !cabin.maxCapacity ||
      !cabin.name ||
      !cabin.regularPrice
    )
      throw new Error("Please provide full and correct info");
  } catch (error) {}
};
