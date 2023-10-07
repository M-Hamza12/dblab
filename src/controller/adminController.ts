// import { Request, Response } from 'express';
// import { IBooking } from '../Interface/interface';
// import { addBooking, fetchCabin, fetchGuest } from '../repo/adminRepo';
// import { refactorErrorMessage } from '../utils/error';
// import { validationResult } from 'express-validator';

// export const Booking = async (req: Request, resp: Response) => {
//   try {
//     const booking = req.body as IBooking;

//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//       const error = refactorErrorMessage(result);
//       return resp.status(400).json({
//         status: 'fail',
//         error,
//       });
//     }

//     //fetching cabin and guest from the db
//     const guest = await fetchGuest(booking.guestId);
//     const cabin = await fetchCabin(booking.cabinId);

//     //if guest is not in db
//     if (!guest) throw new Error('Guest is not found.Please register your self');
//     //if it is an invalid cabin
//     if (!cabin) throw new Error('Invalid Cabin');

//     //if all is good
//     addBooking(booking, resp);
//   } catch (error) {
//     console.log('error');
//     let message: string = '';
//     if (error instanceof Error) message = error.message;
//     resp.status(404).json({
//       message,
//     });
//   }
// };
