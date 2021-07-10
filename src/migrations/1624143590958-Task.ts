import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Task1624143590958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
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
            name: 'title',
            type: 'varChar',
          },
          {
            name: 'order',
            type: 'int',
          },
          {
            name: 'description',
            type: 'varChar',
          },
          {
            name: 'userId',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'boardId',
            type: 'varChar',
            isNullable: true,
          },
          {
            name: 'columnId',
            type: 'text',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
