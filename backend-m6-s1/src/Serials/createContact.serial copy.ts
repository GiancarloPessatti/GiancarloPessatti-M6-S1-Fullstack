import * as yup from "yup";
import { Schema } from "yup";
import { IContactRequest } from "../interfaces/contacts";

const createContactShape: Schema<IContactRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});

export default createContactShape;
