import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HealthService } from 'src/app/service/health.service';

@Component({
  selector: 'app-technician-assign',
  templateUrl: './technician-assign.component.html',
  styleUrls: ['./technician-assign.component.scss']
})
export class TechnicianAssignComponent implements OnInit {
  technician: any;
  constructor(private healthService:HealthService) { }
  
  testControl = '';
  options = [];
  ngOnInit(): void {
  }
 
  // getTests(event) {
  //   let value = (<HTMLInputElement>event.target).value;
  //   console.log("value", value)
  //   if (value) {
  //     this.healthService.getSearchTechnicianPackages(value).subscribe(res => {
  //       console.log("tests", res)
  //       this.technician = res.data
  //     })
  //   } else {
  //     this.options = []
  //   }

  // }
  // onChangeTestValue(event) {
  //   console.log("suresh")
  //   if (event.type === 'package') {
  //     this.adminService.gettestpackagesByid(event._id).subscribe(res => {
  //       console.log("ressuresh", res)
  //       this.filterPackages(res.data)
  //     })
  //   } else {
  //     this.healthService.getTestsById(event._id).subscribe(res => {
  //       console.log("ressuresh", res);
  //       this.filterTests(res.data)

  //     })
  //   }

  //   this.testControl = null
  //   this.tests = []

  // }

}
