import { Result, ValidationError } from 'express-validator';
import { IError } from '../Interface/interface';
export const refactorErrorMessage = (
  result: Result<ValidationError>
): IError[] => {
  const error = result.array().map((el): IError => {
    if (el.type === 'field') {
      return { [el.path]: el.msg };
    }
    return { message: el.msg };
  });

  return error;
};
