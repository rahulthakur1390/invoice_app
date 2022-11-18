import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxBoxModule, DxButtonModule, DxDropDownBoxModule, DxDropDownButtonModule, DxFormModule, DxListModule, DxSelectBoxModule, DxTextBoxModule, DxTileViewModule } from 'devextreme-angular';
import { InvoiceHeaderComponent } from './pages/invoice-header/invoice-header.component';
import { InvoiceDetailsComponent } from './pages/invoice-details/invoice-details.component';
import { AddEditDetailsComponent } from './pages/add-edit-details/add-edit-details.component';
import { DatabaseService } from './services/database.service';
import { DetailService } from './services/detail.service';
import { InitializeAppService } from './services/initialize.app.service';
import { SQLiteService } from './services/sqlite.service';
import { HttpClientModule } from '@angular/common/http';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { MigrationService } from './services/migrations.service';
import { InvoiceRepository } from './repositories/invoice.repository';
import { ProductDefaultQueryRepository } from './repositories/invoice.default.query.repository';


export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    InvoiceHeaderComponent,
    InvoiceDetailsComponent,
    AddEditDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    DxFormModule,
    DxSelectBoxModule,
    DxDropDownBoxModule,
    DxDropDownButtonModule,
    DxTextBoxModule,
    HttpClientModule,
    DxListModule,
    DxTileViewModule,
    DxBoxModule,
  ],
  providers: [
    SQLiteService,
    DetailService,
    DatabaseService,
    MigrationService,
    InitializeAppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true
    },
    InvoiceRepository,
    ProductDefaultQueryRepository,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
