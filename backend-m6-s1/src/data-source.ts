import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { FixMigration1673264393299 } from "./Migrations/1673264393299-FixMigration";
import { User } from "./Entities/user.entity";
import { Contact } from "./Entities/contact.entity";
import { FixMigra1680489332848 } from "./Migrations/1680489332848-FixMigra";
import { Phone1680520635214 } from "./Migrations/1680520635214-Phone";
import { UniqueCons1680619344928 } from "./Migrations/1680619344928-UniqueCons";
import { UniqueCons21680626605326 } from "./Migrations/1680626605326-UniqueCons2";
import { Cascade1680632919445 } from "./Migrations/1680632919445-Cascade";

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
        migrations: [
          FixMigration1673264393299,
          FixMigra1680489332848,
          Phone1680520635214,
          UniqueCons1680619344928,
          UniqueCons21680626605326,
          Cascade1680632919445,
        ],
      }
);

export default AppDataSource;
