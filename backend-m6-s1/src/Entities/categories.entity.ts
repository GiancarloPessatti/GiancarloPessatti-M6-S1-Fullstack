import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Propertie } from "./properties.entity";

@Entity("categories")
export class Categorie {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Propertie, (propertie) => propertie.category)
  properties?: Propertie[];
}
