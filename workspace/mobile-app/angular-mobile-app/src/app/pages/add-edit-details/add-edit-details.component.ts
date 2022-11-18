import { Component, OnInit } from '@angular/core';
import { AddEditDetailsService } from '../../services/add-edit-details.service';
import { InvoiceRepository } from '../../repositories/invoice.repository'
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/Invoice';
@Component({
  selector: 'app-add-edit-details',
  templateUrl: './add-edit-details.component.html',
  styleUrls: ['./add-edit-details.component.scss']
})
export class AddEditDetailsComponent implements OnInit {
  invoice: Invoice;
  productTypes: string[];
  buttonOptions = {
    text: 'REGISTER',
    type: 'success',
    useSubmitBehavior: true,
  };
  buttonOptionsClear = {
    text: 'Clear',
    type: 'danger',
  }
  constructor(private addEditService: AddEditDetailsService,
    private invoiceRepository: InvoiceRepository,
    private route: Router,
    private activatedRoute: ActivatedRoute) {
    this.invoice = {
      id: 0,
      mainContact: '',
      aName: '',
      eName: '',
      price: 0,
      quantity: 0,
      discountPercentage: 0,
      taxPercentage: 0,
      totalAmount: 0,
      productType: 0
    }
    this.productTypes = this.addEditService.getAllProductTypes();
  }

  ngOnInit(): void {
    const invoiceId = this.activatedRoute.snapshot.params['id']
    if (invoiceId) {
      this.invoiceRepository.getInvoiceById(invoiceId).then((invoice: Invoice) => {
        this.invoice = invoice;
      }).catch((err) => {
        console.error('Error-', err);
      });
    }
  }

  handleSubmit(e: any) {
    console.log('storing product');

    if(this.invoice.id) {
      this.invoiceRepository.updateProduct(this.invoice).then((invoice)=>{
        this.invoice = invoice;
        this.route.navigate(['/invoice-details']);
      }).catch(err=>{
        console.error('Error-', err);
      });
    } else {
      this.invoiceRepository.createInvoice(this.invoice).then(()=>{
        this.route.navigate(['/invoice-details']);
      }).catch(err=>{
        console.log('Error - ', err);
      });
    }

    e.preventDefault();

  }

  getProductTotal(): number {
    const price = this.invoice.price || 0;
    const quantity = this.invoice.quantity || 0;
    return price * quantity;
  }

  getTotalDiscount(): number {
    const productTotal = this.getProductTotal();
    const discount = this.invoice.discountPercentage || 0;
    return productTotal * discount / 100;
  }

  getTotalTax(): number {
    const taxPercentage = this.invoice.taxPercentage || 0;
    const discountedTotal = this.getProductTotal() - this.getTotalDiscount();
    return discountedTotal * taxPercentage / 100;
  }

  getNetCalculation(): number {
    return this.getProductTotal() - this.getTotalDiscount() + this.getTotalTax()
  }

  resetForm(): void {
    this.route.navigate(['/invoice-details']);
  }

}
