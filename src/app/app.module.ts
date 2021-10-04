import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponentComponent } from './layout/main-component/main-component.component';
import {MaterialModule} from './material/material.module';
import { RouterModule } from '@angular/router';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainComponentComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RouterModule.forRoot(route, { useHash: true }),
    BrowserAnimationsModule,
    NgxBarcodeModule,
    HttpClientModule,
    MaterialModule,
    NgxQRCodeModule,
    NgbModule,
    DocumentViewerModule,
    NgSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
