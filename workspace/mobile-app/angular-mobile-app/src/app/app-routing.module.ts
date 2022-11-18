import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditDetailsComponent } from './pages/add-edit-details/add-edit-details.component';
import { InvoiceDetailsComponent } from './pages/invoice-details/invoice-details.component';
import { InvoiceHeaderComponent } from './pages/invoice-header/invoice-header.component';

const routes: Routes = [
  { path: '', redirectTo: 'invoice-header', pathMatch: 'full' }, 
  { path: 'invoice-header', component: InvoiceHeaderComponent, title: 'Invoice-header' }, 
  { path: 'invoice-details', component: InvoiceDetailsComponent, title: 'Invoice-details' }, 
  { path: 'add-edit-details', component: AddEditDetailsComponent, title: 'add-details' },
  { path: 'add-edit-details/:id', component: AddEditDetailsComponent, title: 'edit-details' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
