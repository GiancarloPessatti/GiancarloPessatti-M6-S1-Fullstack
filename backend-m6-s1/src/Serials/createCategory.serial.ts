import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICategoryRequest } from "../interfaces/categories";

const createCategoryShape: SchemaOf<ICategoryRequest> = yup.object().shape({
  name: yup.string().required(),
});

export default createCategoryShape;
