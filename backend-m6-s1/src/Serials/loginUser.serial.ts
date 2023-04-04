import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin } from "../interfaces/users";

const loginUserShape: SchemaOf<IUserLogin> = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().required(),
});

export default loginUserShape;
