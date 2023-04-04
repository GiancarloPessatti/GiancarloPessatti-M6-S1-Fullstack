import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueCons1680619344928 implements MigrationInterface {
    name = 'UniqueCons1680619344928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_84cae51c485079bdd8cdf1d828f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_84cae51c485079bdd8cdf1d828f" UNIQUE ("phone")`);
    }

}
