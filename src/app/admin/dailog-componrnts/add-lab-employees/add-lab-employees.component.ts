
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lab-employees',
  templateUrl: './add-lab-employees.component.html',
  styleUrls: ['./add-lab-employees.component.scss']
})
export class AddLabEmployeesComponent implements OnInit {
  LabInchargeFormGroup:FormGroup
  selectedLabIncharge: any;
  companyDetails: any;
  role=[
    "lab","lab-incharge","lab-technician"
  ]
  subdivision = [
    "branch", "hospital", "location", "lab"
  ]
  departments: any;
  constructor(private fb:FormBuilder,
    private readonly HealthService:HealthService,
    private readonly adminService:AdminService,
    private dialogRef: MatDialogRef<AddLabEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.selectedLabIncharge = data;
    this.LabInchargeFormGroup = this.fb.group({
       name:[""],
       emailAddress:[""],
       mobileNumber:[""],
       password:["",],
       subdivision:[""],
       department:[""],
       role:[{value:this.selectedLabIncharge.role,disabled:this.selectedLabIncharge.action}]

    })
  }

  ngOnInit(): void {
    this.loadcompanyform()
    this.getDepartments() 
  }

  getDepartments() {
    this.HealthService.getDepartments().subscribe(res => {
      this.departments = res.data.departments
      console.log("res",this.departments)
    })
  }

  loadcompanyform(){
    if(this.selectedLabIncharge.action === "update"){
      this.LabInchargeFormGroup.patchValue({
        name : this.selectedLabIncharge.data.name,
       emailAddress: this.selectedLabIncharge.data.emailAddress,
       mobileNumber: this.selectedLabIncharge.data.mobileNumber,
       subdivision: this.selectedLabIncharge.data.subdivision,
       role: this.selectedLabIncharge.data.role,
       department: this.selectedLabIncharge.data.departmentId,
      })
    }
    // else{
    //   this.LabInchargeFormGroup.patchValue({
    //     role:this.selectedLabIncharge.role
    //   })
    // }
  }

  

  get o(){ return this.LabInchargeFormGroup.controls}

  addLabIncharge(){
    console.log("form",this.LabInchargeFormGroup.value)
    const formData = {
      "name": this.LabInchargeFormGroup.value.name,
      "emailAddress": this.LabInchargeFormGroup.value.emailAddress,
      "mobileNumber": this.LabInchargeFormGroup.value.mobileNumber.toString(),
      "password": this.LabInchargeFormGroup.value.password,
      "subdivision": this.LabInchargeFormGroup.value.subdivision,
      "department": this.LabInchargeFormGroup.value.department,
      // "department": this.LabInchargeFormGroup.value.department,
      "role": this.selectedLabIncharge.role
    }
    this.adminService.createLabEmployees(formData).subscribe((res)=>{
      console.log("LabIncharge",res)
      if(res.statusCode === 200){
        Swal.fire({
          title:'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
         
    
        }).then(result=>{
          this.dialogRef.close()
        })
        
      }
      
    })
    
  }
  updateLabIncharge(){
    console.log(this.LabInchargeFormGroup.value)
    const formData = {
      "name": this.LabInchargeFormGroup.value.name,
      "emailAddress": this.LabInchargeFormGroup.value.emailAddress,
      "mobileNumber": this.LabInchargeFormGroup.value.mobileNumber.toString(),
      // "password": this.FrontOfficeFormGroup.value.password,
      "subdivision": this.LabInchargeFormGroup.value.subdivision,
      "department": this.LabInchargeFormGroup.value.department,
      "role": this.selectedLabIncharge.role
    }
    this.adminService.updateUser(this.selectedLabIncharge.data._id,formData).subscribe((res)=>{
      console.log("updateLabIncharge",res)
      if(res.statusCode === 200){
        Swal.fire({
          title:'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
         
    
        }).then(result=>{
          this.dialogRef.close()
        })
      }
      
    })
  }
  onClose(){
    this.dialogRef.close()
  }
}