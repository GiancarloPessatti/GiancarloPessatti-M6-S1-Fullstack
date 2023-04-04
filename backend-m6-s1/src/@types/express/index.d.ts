import { ICategoryRequest } from "../../interfaces/contacts";
import { IPropertyRequest } from "../../interfaces/properties";
import { IScheduleRequest } from "../../interfaces/schedules";
import { IUserRequest } from "../../interfaces/users";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number | any;
        type: string;
      };
    }
  }
}

export {};
