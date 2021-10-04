import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.scss']
})
export class TechnicianComponent implements OnInit {
  technicianForm: FormGroup;
  title_name: string
  technicianDetails:any;
  technician_info: any = []
 
  constructor(private fb:FormBuilder, private service:AdminService) { 
    this.technicianForm = this.fb.group({
      category: [{value:this.technicianDetails?.role,disabled:true},],
      name: ['', Validators.required],
      email: ['',  Validators.required],
      mobileNumber: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      subdivision: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
    })
    this.technicianDetails = JSON.parse(localStorage.getItem("Technician"))
    this.lodform()
  }
 
  get l() { return this.technicianForm.controls; }
 
 
  lodform(){
    if(this.technicianDetails?.action === "update"){
      this.technicianForm.patchValue({
       
        name: this.technicianDetails?.data.name,
        email: this.technicianDetails?.data.emailAddress,
        mobileNumber: this.technicianDetails?.data.mobileNumber,
        city: this.technicianDetails?.data?.address?.city,
        state: this.technicianDetails?.data?.address?.state,
        pin: this.technicianDetails?.data?.address?.pin,
        country: this.technicianDetails?.data?.address?.country,
       
      })
    }else{
      
    }
  }



  submitTechnician(){
    const formData = {
     
      name: this.technicianForm.value.name,
      emailAddress: this.technicianForm.value.email,
      mobileNumber:`${ this.technicianForm.value.mobileNumber}`,
      password: this.technicianForm.value.password,
      subdivision : this.technicianForm.value.subdivision,
      department: this.technicianForm.value.department,
      role: "dd-technician",
      address:{
        country: this.technicianForm.value.country,
        state: this.technicianForm.value.state,
        city: this.technicianForm.value.city,
        place: this.technicianForm.value.place,
        street: this.technicianForm.value.street,
        pin: this.technicianForm.value.pin,
        zone: this.technicianForm.value.zone,
        email: this.technicianForm.value.email,
        mobile: this.technicianForm.value.mobile,
        fax: this.technicianForm.value.fax,
        phone1: this.technicianForm.value.phone1,
        phone2: this.technicianForm.value.phone2,
        website: this.technicianForm.value.website,
  
      },
     
    }
    if(this.technicianDetails?.action === "add"){
      this.service.technicianData(formData).subscribe((resp) => {
        if (resp.statusCode == 200) {
          this.technicianForm.reset();
          Swal.fire(resp.message);
        }
      })
  }else{
    // this.adminService.updateSubdivision(this.subDivisionDetails.data._id,formdata).subscribe(res=>{
    //   console.log("res",res)
    //   if(res.statusCode === 200){
    //     // alert(res.message)
    //     this.sweetAlert(res)
        
    //   }
    // })
  }
  
  }

  ngOnInit(): void {
  }

}