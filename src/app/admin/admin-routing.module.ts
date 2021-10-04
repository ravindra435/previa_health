import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TestResultComponent } from '../privia/test-result/test-result.component';
import { BranchComponent } from './branch/branch.component';
import { AddSubdivisionComponent } from './dailog-componrnts/add-subdivision/add-subdivision.component';
import { DoctorListComponent } from './doctor-master/doctor-list/doctor-list.component';
import { DoctorMasterComponent } from './doctor-master/doctor-master.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { HospitalComponent } from './hospital/hospital.component';
import { LabInchargeComponent } from './lab-incharge/lab-incharge.component';
import { LabTechnicianComponent } from './lab-technician/lab-technician.component';
import { LabComponent } from './lab/lab.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { LocationComponent } from './location/location.component';
import { ManagementComponent } from './management/management.component';
import { ManagerComponent } from './manager/manager.component';
import { PatientComponent } from './patient/patient.component';
import { QuestionComponent } from './question/question.component';
import { CollectionComponent } from './collection/collection.component';
import { TestPackagesComponent } from './test-packages/test-packages.component';
import { RoleGuardGuard } from '../shared/role-guard.guard';
import { TestResultComponent } from '../privia/test-result/test-result.component';
import { TestMasterComponent } from '../privia/test-master/test-master.component';
import { TestMasterListComponent } from '../privia/test-master-list/test-master-list.component';
import { TestResultMasterComponent } from '../privia/test-result-master/test-result-master.component';
import { PatientsComponent } from '../privia/patients/patients.component';
import { TechnicianComponent } from './technician/technician.component';
import { TechnicianListComponent } from './technician-list/technician-list.component';


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "hospital",
        component: HospitalComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "add-subdivision",
        component: AddSubdivisionComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "location",
        component: LocationComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "frontOffice",
        component: FrontOfficeComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "lab",
        component: LabComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "labIncharge",
        component: LabInchargeComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "labTechnician",
        component: LabTechnicianComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "management",
        component: ManagementComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "manager",
        component: ManagerComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "branch",
        component: BranchComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "doctor-master",
        component: DoctorMasterComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "doctors",
        component: DoctorListComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "doctor",
        component: DoctorsComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: "patient",
        component: PatientComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin', foRole: 'front-office' }
      },
      {
        path: "patientList",
        component: PatientsComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin', foRole: 'front-office' }
      },
      {
        path: "laboratory",
        component: LaboratoryComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: 'question',
        component: QuestionComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: 'test-result',
        component: TestResultComponent,
        // lab-incharge lab-technician
        canActivate: [RoleGuardGuard],
        data: { adminRole: 'admin', foRole: 'front-office', labRole: 'lab', labInchargeRole: 'lab-incharge', labTechRole: 'lab-technician' }
      },
      {
        path: 'testMaster',
        component: TestMasterComponent,
        // lab-incharge lab-technician
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: 'testMasterList',
        component: TestMasterListComponent,
        // lab-incharge lab-technician
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: 'testResultMaster',
        component: TestResultMasterComponent,
        // lab-incharge lab-technician
        // canActivate: [RoleGuardGuard],
        // data: { adminRole: 'admin', foRole: 'front-office', labRole: 'lab', labInchargeRole: 'lab-incharge', labTechRole: 'lab-technician' }
      },
      {
        path: 'collection',
        component: CollectionComponent,
        // lab-incharge lab-technician
        canActivate: [RoleGuardGuard],
        data: { adminRole: 'admin', labRole: 'lab', labInchargeRole: 'lab-incharge', labTechRole: 'lab-technician' }
      },
      {
        path: 'testPackages',
        component: TestPackagesComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: 'technician',
        component: TechnicianComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
      {
        path: 'technicianList',
        component: TechnicianListComponent,
        canActivate: [RoleGuardGuard], data: { adminRole: 'admin' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
