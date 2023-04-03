import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { FixMigration1673264393299 } from "./Migrations/1673264393299-FixMigration";
import { User } from "./Entities/user.entity";
import { Contact } from "./Entities/contact.entity";
import { FixMigra1680489332848 } from "./Migrations/1680489332848-FixMigra";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/Entities/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        logging: true,
        synchronize: false,
        entities: [User, Contact],
        migrations: [FixMigration1673264393299, FixMigra1680489332848],
      }
);

export default AppDataSource;
