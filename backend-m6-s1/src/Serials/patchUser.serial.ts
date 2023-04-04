import * as yup from "yup";
import { Schema } from "yup";
import { IUserUpdate } from "../interfaces/users";

const patchUserShape: Schema<IUserUpdate> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
});

export default patchUserShape;
