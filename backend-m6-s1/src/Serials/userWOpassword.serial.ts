import * as yup from "yup";
import { Schema } from "yup";
import { IUser } from "../interfaces/users";

const createUserWOShape: Schema<IUser> = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});

export default createUserWOShape;
