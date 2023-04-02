import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Propertie } from "./properties.entity";

import { User } from "./user.entity";

@Entity("schedules_user_properties")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date")
  date: string;

  @Column("time")
  hour: string;

  @ManyToOne(() => Propertie, (propertie) => propertie.schedules)
  propertie: Propertie;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;
}
