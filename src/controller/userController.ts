import { Request, Response } from "express";
import { IBooking, IGuest, ICabin } from "../Interface/interface";
import { addBooking, fetchCabin, fetchGuest } from "../repo/userRepo";
interface CustomRequest<T> extends Request {
  body: T;
}

export const getAllUser = (req: Request, resp: Response) => {
  resp.status(200).json({
    status: "success",
  });
};
export const Booking = async (req: CustomRequest<IBooking>, resp: Response) => {
  try {
    const booking: IBooking = req.body;
    if (
      !booking.cabinId ||
      !booking.cabinPrice ||
      !booking.createdAt ||
      !booking.endDate ||
      !booking.extrasPrice ||
      !booking.guestId ||
      !booking.hasBreakFast ||
      !booking.id ||
      !booking.isPaid ||
      !booking.numGuests ||
      !booking.numNights ||
      !booking.observation ||
      !booking.startDate ||
      !booking.status ||
      !booking.totalPrice
    )
      throw new Error("Please provide complete information");

    //fetching cabin and guest from the db
    const guest: IGuest | null = await fetchGuest(booking.guestId);
    const cabin: ICabin | null = await fetchCabin(booking.cabinId);

    //if guest is not in db
    if (!guest) throw new Error("Guest is not found.Please register your self");
    //if it is an invalid cabin
    if (!cabin) throw new Error("Invalid Cabin");

    //if all is good
    addBooking(booking, resp);
  } catch (error) {
    console.log("error");
    let message: string = "";
    if (error instanceof Error) message = error.message;
    resp.status(404).json({
      message,
    });
  }
};
