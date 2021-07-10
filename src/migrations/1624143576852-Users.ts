import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1624143576852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            generationStrategy: 'uuid',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varChar',
          },
          {
            name: 'login',
            type: 'varChar',
          },
          {
            name: 'password',
            type: 'varChar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
