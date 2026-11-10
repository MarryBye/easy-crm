import {MigrationInterface, QueryRunner} from "typeorm";

export class CustomMigration1764525259100 implements MigrationInterface {
    name = 'CustomMigration1764525259100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cars" (
                "id" SERIAL NOT NULL,
                "model" character varying(32) NOT NULL,
                "mark" character varying(32) NOT NULL,
                "car_status" character varying(16) NOT NULL DEFAULT 'AVAILABLE',
                "car_class" character varying(16) NOT NULL DEFAULT 'STANDARD',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "driver_id" integer,
                CONSTRAINT "REL_1403195e3b80cf083352758adb" UNIQUE ("driver_id"),
                CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "username" character varying,
                "name" character varying,
                "role" character varying(30) NOT NULL DEFAULT 'STANDARD',
                "language" character varying(15) NOT NULL DEFAULT 'en-US',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "ride_orders" (
                "id" SERIAL NOT NULL,
                "order_status" character varying(32) NOT NULL DEFAULT 'In Progress',
                "payment_type" character varying(32) NOT NULL DEFAULT 'Credit Card',
                "start_date" TIMESTAMP DEFAULT now(),
                "end_date" TIMESTAMP DEFAULT now(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "driver_id" integer,
                "client_id" integer,
                CONSTRAINT "PK_187f9e20b21a53a077a41383514" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "cars"
            ADD CONSTRAINT "FK_1403195e3b80cf083352758adb0" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ride_orders"
            ADD CONSTRAINT "FK_9649a91a2a9ef685f22130bbd56" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ride_orders"
            ADD CONSTRAINT "FK_cbc21505a8c7e2d91aa7862bf13" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "ride_orders" DROP CONSTRAINT "FK_cbc21505a8c7e2d91aa7862bf13"
        `);
        await queryRunner.query(`
            ALTER TABLE "ride_orders" DROP CONSTRAINT "FK_9649a91a2a9ef685f22130bbd56"
        `);
        await queryRunner.query(`
            ALTER TABLE "cars" DROP CONSTRAINT "FK_1403195e3b80cf083352758adb0"
        `);
        await queryRunner.query(`
            DROP TABLE "ride_orders"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "cars"
        `);
    }

}
