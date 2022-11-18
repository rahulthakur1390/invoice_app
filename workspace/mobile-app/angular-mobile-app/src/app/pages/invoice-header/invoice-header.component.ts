import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/Invoice';
import { InvoiceRepository } from 'src/app/repositories/invoice.repository';

@Component({
  selector: 'app-invoice-header',
  templateUrl: './invoice-header.component.html',
  styleUrls: ['./invoice-header.component.scss']
})
export class InvoiceHeaderComponent implements OnInit {
  invoices: Array<Invoice> = [];
  constructor(private invoiceRepository: InvoiceRepository) { }

  ngOnInit(): void {
    this.invoiceRepository.getInvoices().then(invoices=>{
      this.invoices = invoices;
    }).catch(err=>console.error('Error-', err));
  }

}
