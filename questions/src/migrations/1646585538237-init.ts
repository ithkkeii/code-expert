import {MigrationInterface, QueryRunner} from "typeorm";

export class init1646585538237 implements MigrationInterface {
    name = 'init1646585538237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "liked_questions" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "question_id" integer NOT NULL, CONSTRAINT "PK_e8b4696d0d8ea858f9ed5267f26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solved_questions" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "question_id" integer NOT NULL, CONSTRAINT "PK_d6f9dd22581cfbfe42eab000d97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."questions_level_enum" AS ENUM('easy', 'medium', 'hard')`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "title" character(50) NOT NULL, "slug" character(50) NOT NULL, "problem" text NOT NULL, "input_format" text NOT NULL, "output_format" text NOT NULL, "challenge_seed" text NOT NULL, "level" "public"."questions_level_enum" NOT NULL DEFAULT 'easy', "points" integer NOT NULL DEFAULT '0', "is_premium" boolean NOT NULL DEFAULT false, CONSTRAINT "CHK_2f5819613064f43f7bde5c0992" CHECK (points >= 0), CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_cases" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "test_string" character varying NOT NULL, "question_id" integer NOT NULL, CONSTRAINT "PK_39eb2dc90c54d7a036b015f05c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "liked_questions" ADD CONSTRAINT "FK_8379bb12400b20eb721c04d4f0a" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solved_questions" ADD CONSTRAINT "FK_b05cafe452d15f8b32835a78999" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_cases" ADD CONSTRAINT "FK_2f3778f52854db547449976c8b8" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_cases" DROP CONSTRAINT "FK_2f3778f52854db547449976c8b8"`);
        await queryRunner.query(`ALTER TABLE "solved_questions" DROP CONSTRAINT "FK_b05cafe452d15f8b32835a78999"`);
        await queryRunner.query(`ALTER TABLE "liked_questions" DROP CONSTRAINT "FK_8379bb12400b20eb721c04d4f0a"`);
        await queryRunner.query(`DROP TABLE "test_cases"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TYPE "public"."questions_level_enum"`);
        await queryRunner.query(`DROP TABLE "solved_questions"`);
        await queryRunner.query(`DROP TABLE "liked_questions"`);
    }

}
