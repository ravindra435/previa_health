import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-subdivision',
  templateUrl: './add-subdivision.component.html',
  styleUrls: ['./add-subdivision.component.scss']
})
export class AddSubdivisionComponent implements OnInit {
  public countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'usa',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
  branchForm:FormGroup;
  subDivisionDetails:any;
  responceMessage: any;
  constructor(private fb:FormBuilder, private adminService:AdminService, private router:Router) {
    this.subDivisionDetails = JSON.parse(localStorage.getItem("subdivision"))
    this.loadbranchForm()
    this.lodform()
    
   }

  ngOnInit(): void {
    
    
    console.log("subdivisionDetails", this.subDivisionDetails)
  }
  loadbranchForm(){
    this.branchForm = this.fb.group({
      category: [{value:this.subDivisionDetails?.role,disabled:true},],
      name: [""],
      type: [""],
      enableSMS: [false],
      enableEmail: [false],
      enableScheme: [false],
      enableTokenSystem: [false],
      description: [""],
      invoiceFooter: [""],
      paddingCode: [""],
      country: [""],
      state: [""],
      city: [""], 
      street: [""],
      mobile: [""],
      phone: [""],
      pin: [""],
      contactPerson: [""],
    })
  }

  lodform(){
    if(this.subDivisionDetails?.action === "update"){
      this.branchForm.patchValue({
        category: this.subDivisionDetails?.data.category,
        name: this.subDivisionDetails?.data.name,
        type: this.subDivisionDetails?.data.type,
        enableSMS: this.subDivisionDetails?.data.enableSMS,
        enableEmail: this.subDivisionDetails?.data.enableEmail,
        enableScheme: this.subDivisionDetails?.data.enableScheme,
        enableTokenSystem: this.subDivisionDetails?.data.enableTokenSystem,
        description: this.subDivisionDetails?.data.description,
        invoiceFooter: this.subDivisionDetails?.data.invoiceFooter,
        paddingCode: this.subDivisionDetails?.data.paddingCode,
        country: this.subDivisionDetails?.data.country,
        state: this.subDivisionDetails?.data.state,
        city: this.subDivisionDetails?.data.city, 
        street: this.subDivisionDetails?.data.street,
        mobile: this.subDivisionDetails?.data.mobile,
        phone: this.subDivisionDetails?.data.phone,
        pin: this.subDivisionDetails?.data.pin,
        contactPerson: this.subDivisionDetails?.data.contactPerson,
      })
    }else{
      
    }
  }
  onSubmit(){
    const formdata = this.branchForm.value
    formdata["category"]= this.subDivisionDetails?.role
    console.log("hh",formdata)
    if(this.subDivisionDetails?.action === "add"){
    this.adminService.addSubdivision(this.branchForm.value).subscribe(res=>{
      console.log("res", res)
      if(res.statusCode === 200){
        this.sweetAlert(res)
        
      }
    })
  }else{
    this.adminService.updateSubdivision(this.subDivisionDetails.data._id,formdata).subscribe(res=>{
      console.log("res",res)
      if(res.statusCode === 200){
        // alert(res.message)
        this.sweetAlert(res)
        
      }
    })
  }
  
  }

  sweetAlert(res){
    if(res?.statusCode === 200){
      Swal.fire({
        title:'WelCome!',
        text: `${res?.message}`,
        icon: 'success',
        confirmButtonText: 'ok'
       
  
      }).then(result=>{
        if(this.subDivisionDetails?.role === "branch"){
          this.router.navigateByUrl('/admin/branch')
        }else if(this.subDivisionDetails?.role === "hospital"){
          this.router.navigateByUrl("/admin/hospital")
        }else if(this.subDivisionDetails?.role === "location"){
          this.router.navigateByUrl("/admin/location")
        }else{
          this.router.navigateByUrl('/admin/laboratory')
        }
        localStorage.removeItem("subdivision")
      })
    }
  }

  clearForm(){
    this.branchForm.reset()
    this.loadbranchForm(),
    this.subDivisionDetails['action']= 'add'
    this.branchForm.patchValue({
      category: this.subDivisionDetails?.role,
    })
  }
}

