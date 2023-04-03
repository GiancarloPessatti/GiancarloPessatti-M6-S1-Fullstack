import * as yup from "yup";
import { SchemaOf } from "yup";
import { IContactRequest } from "../interfaces/contacts";

const createContactShape: SchemaOf<IContactRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),
});

export default createContactShape;
