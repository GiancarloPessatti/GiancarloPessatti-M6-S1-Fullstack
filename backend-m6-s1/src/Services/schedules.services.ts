// import AppDataSource from "../data-source";
// import { User } from "../Entities/user.entity";
// import { AppError } from "../Errors/error";
// import { Request } from "express";
// import { IScheduleRequest } from "../interfaces/schedules";
// import { Schedules } from "../Entities/shedules.entity";
// import { Propertie } from "../Entities/properties.entity";

// export const createScheduleService = async (
//   scheduleData: Request
// ): Promise<Schedules> => {
//   const body: IScheduleRequest = scheduleData.body;
//   const userId = scheduleData.user.id;

//   const scheduleRepository = AppDataSource.getRepository(Schedules);
//   const propertyRepository = AppDataSource.getRepository(Propertie);
//   const userRepository = AppDataSource.getRepository(User);

//   const userFinded = await userRepository.findOneBy({ id: String(userId) });
//   const propertyFinded = await propertyRepository.findOneBy({
//     id: body.propertyId,
//   });

//   if (!userFinded) {
//     throw new AppError("email alredy exist", 404);
//   }

//   if (!propertyFinded) {
//     throw new AppError("email alredy exist", 404);
//   }

//   let dataSplit = body.date.split("/");

//   const year = dataSplit[0];
//   const month = dataSplit[1];
//   const day = dataSplit[2];

//   let timeSplit = body.hour.split(":");

//   const hour = timeSplit[0];
//   const minutes = timeSplit[1];

//   const novaData = new Date(
//     Number(year),
//     Number(month) - 1,
//     Number(day),
//     Number(hour) - 3,
//     Number(minutes)
//   );

//   const time18hour = new Date(
//     Number(year),
//     Number(month) - 1,
//     Number(day),
//     15,
//     0
//   );
//   const time8hour = new Date(
//     Number(year),
//     Number(month) - 1,
//     Number(day),
//     5,
//     0
//   );

//   if (
//     novaData.getTime() > time18hour.getTime() ||
//     novaData.getTime() < time8hour.getTime() ||
//     novaData.getDay() <= 0 ||
//     novaData.getDay() >= 6
//   ) {
//     throw new AppError("Hora errada", 400);
//   }

//   const schedules = await userRepository
//     .createQueryBuilder("users")
//     .innerJoinAndSelect("users.schedules", "schedules")
//     .where("users.id = :id_user", { id_user: userId })
//     .andWhere("schedules.date = :Sdate", { Sdate: body.date })
//     .andWhere("schedules.hour = :Shour", { Shour: body.hour })
//     .select(["schedules"])
//     .getRawMany();

//   if (schedules.length > 0) {
//     throw new AppError("email alredy exist", 409);
//   }

//   const scheduleCreated = scheduleRepository.create({
//     ...body,
//     propertie: propertyFinded,
//     user: userFinded,
//   });

//   await scheduleRepository.save(scheduleCreated);

//   return scheduleCreated;
// };

// export const listScheduleService = async (
//   request: Request
// ): Promise<Array<Schedules>> => {
//   const propertyRepository = AppDataSource.getRepository(Propertie);

//   if (!request.user.type) {
//     throw new AppError("Permission denied", 403);
//   }

//   const findschedules: any = await propertyRepository.findOne({
//     where: { id: request.params.id },
//     relations: ["schedules", "schedules.user"],
//   });

//   if (!findschedules) {
//     throw new AppError("Permission denied", 404);
//   }

//   return findschedules;
// };
