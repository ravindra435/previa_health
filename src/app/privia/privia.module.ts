import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriviaRoutingModule } from './privia-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppoinmentsComponent } from './appoinments/appoinments.component';
import { DepartmentsComponent } from './departments/departments.component';
import { PatientsComponent } from './patients/patients.component';
import { MaterialModule } from '../material/material.module';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddPaymentsComponent } from './payments/add-payments/add-payments.component';
import { BranchComponent } from './branch/branch.component';
import { TestMasterComponent } from './test-master/test-master.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { TestResultMasterComponent } from './test-result-master/test-result-master.component';
import { SchemeMasterComponent } from './scheme-master/scheme-master.component';
import { PriceDetailsComponent } from './price-details/price-details.component';
import {TestResultComponent} from './test-result/test-result.component';
import { PehlebotomyComponent } from './pehlebotomy/pehlebotomy.component';
import { SampleRecieptDetailsComponent } from './sample-reciept-details/sample-reciept-details.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { AddTestResultComponent } from './test-result/add-test-result/add-test-result.component';
import { NgxEditorModule } from 'ngx-editor';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TestMasterListComponent } from './test-master-list/test-master-list.component';



@NgModule({
  declarations: [DashboardComponent, AppoinmentsComponent, DepartmentsComponent, PatientsComponent, AddDoctorComponent, EditAppointmentComponent, AddAppointmentComponent, AddDepartmentComponent, AddPatientComponent, PaymentsComponent, AddPaymentsComponent,BranchComponent,SchemeMasterComponent,TestResultMasterComponent,PriceDetailsComponent, PehlebotomyComponent, SampleRecieptDetailsComponent, 
    DepartmentMasterComponent,
    TestMasterComponent,
    TestResultComponent,
    AddTestResultComponent,
    TestMasterListComponent
  ],
  imports: [
    CommonModule,
    PriviaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEditorModule,
    NgbModalModule,
    NgxDocViewerModule,
    CKEditorModule,
    NgxEchartsModule.forRoot({
      echarts,
    })
  ],
  exports:[],
  entryComponents:[
    AddDoctorComponent,
    EditAppointmentComponent,
    AddDepartmentComponent,
    AddPatientComponent,
    AddPaymentsComponent,
    AddTestResultComponent,
    TestResultComponent
  ]
})
export class PriviaModule { }
