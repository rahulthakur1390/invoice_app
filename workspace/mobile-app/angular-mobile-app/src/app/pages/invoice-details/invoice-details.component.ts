import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/models/Invoice';
import { InvoiceRepository } from 'src/app/repositories/invoice.repository';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  invoices: Array<Invoice> = [];
  constructor(private invoiceRepository: InvoiceRepository, private route: Router) { }

  ngOnInit(): void {
    this.invoiceRepository.getInvoices().then((invoices: Array<Invoice>)=>{
      this.invoices = invoices;
    }).catch((err)=>console.log(err));
  }

  handleOnClick(invoice: Invoice) {
    this.route.navigate(['/add-edit-details/'+invoice.id]);
  }

}
