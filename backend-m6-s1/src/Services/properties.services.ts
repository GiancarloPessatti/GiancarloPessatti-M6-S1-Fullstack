import AppDataSource from "../data-source";
import { AppError } from "../Errors/error";
import { Request } from "express";
import { Propertie } from "../Entities/properties.entity";
import { Categorie } from "../Entities/categories.entity";
import { Address } from "../Entities/addresses.entity";

export const createPropertieService = async (
  propertiesData: Request
): Promise<Propertie[]> => {
  const databody = propertiesData.body;
  const { address } = databody;

  const propertieRepository = AppDataSource.getRepository(Propertie);
  const categoryRepository = AppDataSource.getRepository(Categorie);
  const addressRepository = AppDataSource.getRepository(Address);

  const findcategory = await categoryRepository.findOneBy({
    id: databody.categoryId,
  });
  const propertieExist = await propertieRepository.findOneBy({
    address: databody.address,
  });

  if (!findcategory) {
    throw new AppError("Permission denied", 404);
  }

  if (!propertiesData.user.type) {
    throw new AppError("Permission denied", 403);
  }

  if (propertieExist) {
    throw new AppError("address alredy exist", 409);
  }

  if (!address.zipCode || address.zipCode.length > 8) {
    throw new AppError("Permission denied", 400);
  }
  if (!address.state || address.state.length > 2) {
    throw new AppError("Permission denied", 400);
  }

  const createdAdress = addressRepository.create(address);
  await addressRepository.save(createdAdress);

  const createdPropetie: any = propertieRepository.create({
    ...databody,
    address: createdAdress,
    category: findcategory,
  });
  await propertieRepository.save(createdPropetie);

  return createdPropetie;
};

export const listPropertieService = async (
  request: Request
): Promise<Propertie[]> => {
  const propertieRepository = AppDataSource.getRepository(Propertie);
  const findcategory = await propertieRepository.find();
  return findcategory;
};
