import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';
import { AddLabEmployeesComponent } from '../add-lab-employees/add-lab-employees.component';

@Component({
  selector: 'app-add-front-office',
  templateUrl: './add-front-office.component.html',
  styleUrls: ['./add-front-office.component.scss']
})
export class AddFrontOfficeComponent implements OnInit {
  FrontOfficeFormGroup:FormGroup
  selectedFrontOffice: any;
  companyDetails: any;
  role=[
    "lab","lab-incharge","lab-technician"
  ]
  subdivision = [
    "branch", "hospital", "location", "lab"
  ]
  constructor(private fb:FormBuilder,
    private readonly HealthService:HealthService,
    private readonly adminService:AdminService,
    private dialogRef: MatDialogRef<AddFrontOfficeComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.selectedFrontOffice = data;
    this.FrontOfficeFormGroup = this.fb.group({
       name:[""],
       emailAddress:[""],
       mobileNumber:[""],
       password:["",],
       subdivision:[""],
       role:[""]

    })
  }

  ngOnInit(): void {
    this.loadcompanyform()
  }

  loadcompanyform(){
    if(this.selectedFrontOffice.action === "update"){
      this.FrontOfficeFormGroup.patchValue({
        name : this.selectedFrontOffice.data.name,
       emailAddress: this.selectedFrontOffice.data.emailAddress,
       mobileNumber: this.selectedFrontOffice.data.mobileNumber,
       subdivision: this.selectedFrontOffice.data.subdivision,
       role: this.selectedFrontOffice.data.role,
      })
    }
    // else{
    //   this.FrontOfficeFormGroup.patchValue({
    //     role:this.selectedFrontOffice.role
    //   })
    // }
  }

  

  get o(){ return this.FrontOfficeFormGroup.controls}

  addFrontOffice(){
    console.log("form",this.FrontOfficeFormGroup.value)
    const formData = {
      "name": this.FrontOfficeFormGroup.value.name,
      "emailAddress": this.FrontOfficeFormGroup.value.emailAddress,
      "mobileNumber": this.FrontOfficeFormGroup.value.mobileNumber.toString(),
      "password": this.FrontOfficeFormGroup.value.password,
      "subdivision": this.FrontOfficeFormGroup.value.subdivision,
      // "department": this.FrontOfficeFormGroup.value.department,
      "role": "front-office"
    }
    this.adminService.createUser(formData).subscribe((res)=>{
      console.log("FrontOffice",res)
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
  updateFrontOffice(){
    console.log(this.FrontOfficeFormGroup.value)
    const formData = {
      "name": this.FrontOfficeFormGroup.value.name,
      "emailAddress": this.FrontOfficeFormGroup.value.emailAddress,
      "mobileNumber": this.FrontOfficeFormGroup.value.mobileNumber.toString(),
      // "password": this.FrontOfficeFormGroup.value.password,
      "subdivision": this.FrontOfficeFormGroup.value.subdivision,
      // "department": this.FrontOfficeFormGroup.value.department,
      "role": "front-office"
    }
    this.adminService.updateUser(this.selectedFrontOffice.data._id,formData).subscribe((res)=>{
      console.log("FrontOffice",res)
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
