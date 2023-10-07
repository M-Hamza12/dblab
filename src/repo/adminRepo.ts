// import { Response } from 'express';
// import { IGuest, ICabin, IBooking } from '../Interface/interface';
// import { mySqlConnection } from '..';
// import { fetchModel } from './genericRepo';

// export const fetchGuest = async (guestId: number): Promise<IGuest | null> => {
//   try {
//     const guest = await fetchModel<IGuest>(
//       'SELECT * FROM GUEST WHERE id=' + guestId
//     );
//     return guest;
//   } catch (error) {
//     return null;
//   }
// };

// export const fetchCabin = async (cabinId: number): Promise<ICabin | null> => {
//   try {
//     const cabin = await fetchModel<ICabin>(
//       'SELECT * FROM Cabin WHERE id=' + cabinId
//     );
//     return cabin;
//   } catch (error) {
//     return null;
//   }
// };

// export const addBooking = (booking: IBooking, resp: Response) => {
//   mySqlConnection.query('INSERT INTO BOOKING() VALUES()', (error, rows) => {
//     try {
//       if (error) throw error;
//       resp.status(201).json({
//         status: 'success',
//       });
//     } catch (error) {
//       resp.status(404).json({
//         status: 'fail',
//       });
//     }
//   });
// };
