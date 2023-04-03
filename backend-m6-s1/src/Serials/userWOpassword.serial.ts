import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser } from "../interfaces/users";

const createUserWOShape: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.number().required(),
  isAdm: yup.boolean().required(),
  isActive: yup.boolean().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});

export default createUserWOShape;
