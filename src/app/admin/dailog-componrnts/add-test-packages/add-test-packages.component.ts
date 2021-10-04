import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { AdminService } from 'src/app/service/admin.service';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-test-packages',
  templateUrl: './add-test-packages.component.html',
  styleUrls: ['./add-test-packages.component.scss']
})
export class AddTestPackagesComponent implements OnInit {
  testPackagesFormGroup: FormGroup
  selectedtestPackages: any;
  companyDetails: any;
  allTests: any;

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
  packages: any;
  selectedTests: any;
  patchValues: any;

  /*  for filter with multi select  */
  
  constructor(private fb: FormBuilder,
    private readonly HealthService: HealthService,
    private readonly adminService: AdminService,
    private dialogRef: MatDialogRef<AddTestPackagesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.selectedtestPackages = data;
    this.testPackagesFormGroup = this.fb.group({
      name: [""],
      tests: [null]

    })
  }

  ngOnInit(): void {
    let search = "";
    this.getAllTests(search);
    // this.loadcompanyform();
  }

  changeHandler(event) {
    let value = (<HTMLInputElement>event.target).value;
    // let req = {
    //   search : value
    // }
    this.getAllTests(value);
  }

  public getAllTests(req): void {
    
    this.HealthService.getTest(req).subscribe((res) => { 
      console.log("get All Tests resp" , res);
      if ( res.statusCode == 200 ) {
        this.allTests = res.data.tests;
        this.loadcompanyform()
      } 
    })
  } 

  onFileChange(e) {
    console.log("selected option", e);
  } 
  loadcompanyform() {
    if (this.selectedtestPackages.action === "update") {
      let array =[]
      this.selectedtestPackages.data.tests.forEach(element => {
        array.push(element._id)
      });
      console.log("aaray",array)
      this.testPackagesFormGroup.patchValue({
        name: this.selectedtestPackages.data.name,
        tests: array
      });
    }

  }



  get o() { return this.testPackagesFormGroup.controls }

  addtestPackages() {
    console.log("form", this.testPackagesFormGroup.value)
    const formData = {
      "name": this.testPackagesFormGroup.value.name,
      "tests": this.testPackagesFormGroup.value.tests
    }
    this.HealthService.addTestPackages(formData).subscribe((res) => {
      console.log("testPackages", res)
      if (res.statusCode === 200) {
        
        Swal.fire({
          title: 'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
        }).then(result => {
          this.dialogRef.close()
        })
      }

    })

  }
  updatetestPackages() {
    const formData = {
      "name": this.testPackagesFormGroup.value.name,
      "tests": this.testPackagesFormGroup.value.tests
    }
    this.HealthService.updateTestPackages(this.selectedtestPackages.data._id, formData).subscribe((res) => {
      console.log("testPackages", res)
      if (res.statusCode === 200) {
        Swal.fire({
          title: 'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
        }).then(result => {
          this.dialogRef.close()
        })
      }

    })
    console.log(this.testPackagesFormGroup.value)

  }
  onClose() {
    this.dialogRef.close()
  }
}

