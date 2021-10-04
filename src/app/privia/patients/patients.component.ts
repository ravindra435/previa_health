import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  displayedColumns: string[] = ['date','pid','name', 'emailAddress', 'mobileNumber', 'gender','age','address','Actions'];
  dataSource:any

      //pagination and api integration starts from here
      length = 100;
      pageSize = 10;
      pageSizeOptions: number[] = [5, 10, 25, 50, 100];
      pageEvent: PageEvent;
      isDefault: boolean = true;
      sortDirection: string;
      sortvalue: any;
      //pagination code ends here

  @ViewChild(MatPaginator) paginator: MatPaginator;
  action: string;
  patients: any;
  patientDetails: any;

  ngAfterViewInit() {
   
  }
  constructor(public dialog: MatDialog, private healthService:HealthService,private router:Router) { }

  ngOnInit(): void {
    
    this.getPatients()
    
  }
   //Api Integration Starts from here
   onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getPatients()
    console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
  }

  getPatients(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData['role'] = "front-office"
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getpatientsDetails(formData)
  
  }

  getpatientsDetails(formData){
    this.healthService.getPatientsList(formData).subscribe((res)=>{
      console.log("frontOfficeDetails",res)
      this.patientDetails = res.data.patients
      this.length = res.data.total_count
    })
  }

  public  sortEvent(event): void{
    console.log("event",event,this.sortDirection)
   
    if(this.sortvalue === event){
      this.sortDirection = this.sortDirection === 'ASC' ? 'DASC' : 'ASC';
    }else{
      this.sortDirection = 'ASC'
    }
    console.log("sirtdirction",this.sortDirection)
    this.sortvalue = event
     
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData["sortBy"] = this.sortvalue
    formData["sortOrder"] = this.sortDirection
    formData['role'] = "front-office"
    this.getpatientsDetails(formData)
    // this.getAgentCounselors(formData)
  }

  // getPatients(){
  //   // this.healthService.getPatients().subscribe(res=>{
  //   //   console.log("respatients",res)
  //   //   this.patients = res.data.patients.filter(res=> {return res?.name})
  //   //   console.log("respatients",this.patients)
  //   //   this.dataSource = new MatTableDataSource<any>(this.patients);
  //   //   this.dataSource.paginator = this.paginator;
  //   // })
  // }
  add_patient(){
    this.action = "add"
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "500px"),
    
   
      (dialogConfig.data = {
        action: this.action,
      });
      const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((data) => {})
  }
  addBulkPatients(){
    this.action = "addbulk"
    const dialogConfig = new MatDialogConfig();
    
    (dialogConfig.width = "450px"),
      (dialogConfig.data = {
        action: this.action,
      });
      const dialogRef = this.dialog.open(AddPatientComponent,dialogConfig );
      dialogRef.afterClosed().subscribe((data) => {
        this.getPatients()
      })

  }
  editPatients(patient){
    console.log('hh',patient)
    localStorage.setItem('pid',patient.pid)
    this.router.navigateByUrl('/admin/patient')
  }

}
