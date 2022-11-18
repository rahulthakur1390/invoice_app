import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { SQLiteService } from './sqlite.service';

export const createSchemaProducts: string = `
CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY NOT NULL,
  mainContact TEXT NOT NULL,
  aName TEXT NOT NULL,
  eName TEXT NOT NULL,
  productType NUMBER NOT NULL,
  price NUMBER NOT NULL,
  quantity NUMBER NOT NULL,
  discountPercentage NUMBER NOT NULL,
  taxPercentage NUMBER NOT NULL,
  totalAmount NUMBER NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export const createSchemaTest: string = `
CREATE TABLE IF NOT EXISTS test (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);
`;

@Injectable()
export class MigrationService {

  constructor(private sqliteService: SQLiteService, private databaseService: DatabaseService) {
  }

  async migrate(): Promise<any> {
    await this.createTestTable();
    await this.createProductsTable();
  }

  async createProductsTable(): Promise<any> {
    await this.databaseService.executeQuery(async (db) => {
      await db.execute(createSchemaProducts);
    });
  }

  async createTestTable(): Promise<void> {
    console.log(`going to create a connection`)
    const db = await this.sqliteService.createConnection('test-db', false, "no-encryption", 1);
    console.log(`db ${JSON.stringify(db)}`)
    await db.open();
    console.log(`after db.open`)
    let query = `
            CREATE TABLE IF NOT EXISTS test (
              id INTEGER PRIMARY KEY NOT NULL,
              name TEXT NOT NULL
            );
            `
    console.log(`query ${query}`)

    const res: any = await db.execute(query);
    console.log(`res: ${JSON.stringify(res)}`)
    await this.sqliteService.closeConnection('test-db');
    console.log(`after closeConnection`)
  }
}
