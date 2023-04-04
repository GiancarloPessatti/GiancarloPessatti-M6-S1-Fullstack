import * as yup from "yup";
import { Schema } from "yup";
import { IUserLogin } from "../interfaces/users";

const loginUserShape: Schema<IUserLogin> = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().required(),
});

export default loginUserShape;
