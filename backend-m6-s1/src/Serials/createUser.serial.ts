import * as yup from "yup";
import { Schema } from "yup";
import { IUserRequest } from "../interfaces/users";

const createUserShape: Schema<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  isAdm: yup.boolean().required(),
});

export default createUserShape;
