import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserUpdate } from "../interfaces/users";

const patchUserShape: SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().notRequired(),
  phone: yup.string().required(),
  password: yup.string().notRequired(),
});

export default patchUserShape;
