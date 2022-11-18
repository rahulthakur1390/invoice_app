
import { DBSQLiteValues, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import InvoicesData from './invoice-data-example';
import { Invoice } from '../models/Invoice';
@Injectable()
export class InvoiceRepository {
  constructor(private _databaseService: DatabaseService) {
  }

  async getInvoices(): Promise<Invoice[]> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var Invoices: DBSQLiteValues = await db.query("select * from Invoices");
      return Invoices.values as Invoice[];
    });
  }

  async createInvoice(invoice: Invoice) {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "insert into Invoices (mainContact, aName, eName, price, quantity, productType, discountPercentage, taxPercentage, totalAmount) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      let values: Array<any> = [invoice.mainContact, invoice.aName, invoice.eName, invoice.price, invoice.quantity, invoice.productType, invoice.discountPercentage, invoice.taxPercentage, invoice.totalAmount];
      let ret: any = await db.run(sqlcmd, values);
      if (ret.changes.lastId > 0) {
        return ret.changes as Invoice;
      }
      throw Error('create invoice failed');
    });
  }

  async updateProduct(invoice: Invoice) {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "update Invoices set mainContact = ?, aName = ?, eName = ?, price = ?, quantity = ?, productType = ?, discountPercentage = ?, taxPercentage = ?, totalAmount =? where id = ?";
      let values: Array<any> = [invoice.mainContact, invoice.aName, invoice.eName, invoice.price, invoice.quantity, invoice.productType, invoice.discountPercentage, invoice.taxPercentage, invoice.totalAmount, invoice.id];
      let ret: any = await db.run(sqlcmd, values);
      if (ret.changes.changes > 0 && invoice.id) {
        return await this.getInvoiceById(invoice.id);
      }
      throw Error('update invoice failed');
    });
  }

  async getInvoiceById(id: number): Promise<Invoice> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "select * from Invoices where id = ? limit 1";
      let values: Array<any> = [id];
      let ret: any = await db.query(sqlcmd, values);
      if (ret.values.length > 0) {
        return ret.values[0] as Invoice;
      }
      throw Error('get invoice by id failed');
    });
  }

  // async deleteProductById(id: number): Promise<void> {
  //   return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
  //     await db.query(`delete from Invoices where id = ${id};`);
  //   });
  // }

  // async getInvoicesByCategory(category: string): Promise<Invoice[]> {
  //   return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
  //     let sqlcmd: string = "select * from Invoices where category = ?";
  //     let values: Array<any> = [category];
  //     let ret: any = await db.query(sqlcmd, values);
  //     if (ret.values.length > 0) {
  //       return ret.values as Invoice[];
  //     }
  //     throw Error('get Invoices by category failed');
  //   });
  // }

  // async createTestData(): Promise<any> {
  //   await this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
  //     //delete all Invoices
  //     let sqlcmd: string = "DELETE FROM Invoices;";
  //     await db.execute(sqlcmd, false);
  //   });

  //   let Invoices: Invoice[] = InvoicesData;

  //   for (let invoice of Invoices) {
  //     await this.createProduct(invoice);
  //   }
  // }
}
