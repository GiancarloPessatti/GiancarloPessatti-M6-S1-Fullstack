import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Address } from "./addresses.entity";
import { Categorie } from "./categories.entity";

import { Schedules } from "./shedules.entity";

@Entity("properties")
export class Propertie {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column("decimal", { precision: 12, scale: 2 })
  value: number;

  @Column("integer")
  size: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Categorie, (categorie) => categorie.properties)
  category: Categorie;

  @OneToMany(() => Schedules, (schedule) => schedule.propertie)
  schedules: Schedules[];
}
