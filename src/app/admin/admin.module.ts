import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { LabComponent } from './lab/lab.component';
import { LabInchargeComponent } from './lab-incharge/lab-incharge.component';
import { ManagementComponent } from './management/management.component';
import { ManagerComponent } from './manager/manager.component';
import { LabTechnicianComponent } from './lab-technician/lab-technician.component';
import { AddLabEmployeesComponent } from './dailog-componrnts/add-lab-employees/add-lab-employees.component';
import { HospitalComponent } from './hospital/hospital.component';
import { LocationComponent } from './location/location.component';
import { AddSubdivisionComponent } from './dailog-componrnts/add-subdivision/add-subdivision.component';
import { BranchComponent } from './branch/branch.component';
import { PatientComponent } from './patient/patient.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { DoctorMasterComponent } from './doctor-master/doctor-master.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrintModule } from 'ngx-print';
import { DoctorListComponent } from './doctor-master/doctor-list/doctor-list.component';
import { QuestionComponent } from './question/question.component';
import { AddFrontOfficeComponent } from './dailog-componrnts/add-front-office/add-front-office.component';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { NgxPrinterModule } from 'ngx-printer';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CollectionComponent } from './collection/collection.component';
import { TestPackagesComponent } from './test-packages/test-packages.component';
import { AddTestPackagesComponent } from './dailog-componrnts/add-test-packages/add-test-packages.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { IgxTimePickerModule } from "igniteui-angular";
import { NgSelectModule } from '@ng-select/ng-select';
import { TechnicianComponent } from './technician/technician.component';
import { TechnicianListComponent } from './technician-list/technician-list.component';
import { TechnicianAssignComponent } from './technician-assign/technician-assign.component';


@NgModule({
  declarations: [
    FrontOfficeComponent,
    LabComponent,
    LabInchargeComponent,
    ManagementComponent,
    ManagerComponent, 
    LabTechnicianComponent, 
    AddLabEmployeesComponent, 
    HospitalComponent, 
    LocationComponent, 
    AddSubdivisionComponent, 
    BranchComponent, 
    PatientComponent, 
    LaboratoryComponent,
    DoctorMasterComponent,
    DoctorsComponent,
    DoctorListComponent,
    QuestionComponent,
    AddFrontOfficeComponent,
    AddQuestionComponent,
    CollectionComponent,
    TestPackagesComponent,
    AddTestPackagesComponent,
    TechnicianComponent,
    TechnicianListComponent,
    TechnicianAssignComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    NgxBarcodeModule,
    QRCodeModule,
    NgxPrintModule,
    ReactiveFormsModule,FormsModule,
    NgxPrinterModule.forRoot({printOpenWindow: true}),
    NgxQRCodeModule,
    CKEditorModule,
    IgxTimePickerModule,
    NgSelectModule
  ],
  entryComponents:[
    AddLabEmployeesComponent,
    DoctorMasterComponent,
    AddQuestionComponent,
    AddTestPackagesComponent
  ]
})
export class AdminModule { }
