import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HealthService } from './../../service/health.service';
@Component({
  selector: 'app-test-master',
  templateUrl: './test-master.component.html',
  styleUrls: ['./test-master.component.scss']
})
export class TestMasterComponent implements OnInit {
  testMasterForm: FormGroup;
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  testTypes = [
    { name: 'Add Sub Test' },
    { name: 'Add Main Test' }
  ]
  options = [{ name: "noSale", value: "No Sale" }, { name: "accreditedTest", value: "Accredited Test" }, { name: "noHouseVisit", value: "No House Visit" }, { name: "outsourced", value: "OutSourced" }, { name: "inactive", value: "Inactive" }, { name: "preferDoctor", value: "Prefer Doctor" }, { name: "attachedServiceDoctors", value: "Atteched service Doctors" }, { name: "editBill", value: "Edit Bill" }, { name: "editQuantity", value: "Edit Quantity" }, { name: "noBarCode", value: "No Barcode" }, { name: "appointment", value: "Appoinments" }, { name: "noResult", value: "no Results" }, { name: "allowDiscount", value: "Allow Discount" }]
  checked: boolean = false;
  selected: any = 'Add Main Test';
  departments: any;
  testDetails: any;
  subTestDetails: any;
  subTestData: any;
  testItem: any;
  showParentTest: boolean = false;
  parentTestSelected: any;
  isShowSubParentTest: boolean = false;
  selectedSubParent: any;
  showUpdateBtns: boolean = false;
  localItem: any;
  constructor(private health: HealthService, private router: Router) { }

  ngOnInit(): void {
    this.loadForm();
    this.getDepartments()
    this.getTest();
    // this.testItem = JSON.parse(localStorage.getItem('TestItem'));
    let id;
    this.localItem = JSON.parse(localStorage.getItem('TestItem'));
    if (this.localItem != null || this.localItem != undefined) {
      id = this.localItem._id;
    }
    console.log("id", id);
    if (id != null || id != undefined) {
      this.health.getTestsById(id).subscribe((res) => {
        console.log("getTestsById123", res)
        if (res.statusCode == 200) {
          this.testItem = res.data;
          this.bindVlaues();
          this.showUpdateBtns = true;
        }
      })
    }
    // if (this.testItem == null || this.testItem == undefined) {

    // } else {

    // }
  }

  loadForm() {
    this.testMasterForm = new FormGroup({
      department: new FormControl(null),
      isSubTest: new FormControl(false),
      isTest: new FormControl(true),
      parentTest: new FormControl(null),
      subParentTest: new FormControl(null),
      code: new FormControl(null),
      name: new FormControl(null),
      displayName: new FormControl(null),
      container: new FormControl(null),
      interpretation: new FormControl(null),
      shortName: new FormControl(null),
      HIMSCode: new FormControl(null),
      specimen: new FormControl(null),
      internationalCode: new FormControl(null),
      method: new FormControl(null),
      instruction: new FormControl(null),
      // subTests: new FormArray([
      //   new FormGroup({
      //     name: new FormControl('')
      //   })
      // ]),
      settings: new FormGroup({
        unAcceptableConditions: new FormControl(null),
        cutOffTime: new FormControl(null),
        minProcessTime: new FormControl(null),
        emergencyProcessTime: new FormControl(null),
        expiryTime: new FormControl(null),
        applicableTo: new FormControl("both"),
        testDoneOn: new FormGroup({
          Sun: new FormControl(false),
          Mon: new FormControl(false),
          Tue: new FormControl(false),
          Wed: new FormControl(false),
          Thu: new FormControl(false),
          Fri: new FormControl(false),
          Sat: new FormControl(false),
        }),
        minSampleQuantity: new FormControl(null),
        testSuffix: new FormControl(null),
        suffixDesc: new FormControl(null),
        minProcessPeriod: new FormControl(null),
        emergencyProcessPeriod: new FormControl(null),
        expiryPeriod: new FormControl(null),
        reportingDays: new FormControl(null),
      }),
      options: new FormGroup({
        noSale: new FormControl(false),
        accreditedTest: new FormControl(false),
        noHouseVisit: new FormControl(false),
        outsourced: new FormControl(false),
        inactive: new FormControl(false),
        preferDoctor: new FormControl(false),
        attachedServiceDoctors: new FormControl(false),
        editBill: new FormControl(false),
        editQuantity: new FormControl(false),
        noBarCode: new FormControl(false),
        appointment: new FormControl(false),
        noResult: new FormControl(false),
        allowDiscount: new FormControl(false),
      })

    })
  }


  bindVlaues() {
    console.log("bindingsss")
    if (this.testItem.isSubTest === true) {
      this.showParentTest = true;
    }
    // this.parentTestSelected = this.testItem?.parentTest._id,
    // console.log("parentTestSelected",this.parentTestSelected)
    let parent, subParent;
    if (this.testItem?.parentTest?.parentTest != null || this.testItem?.parentTest?.parentTest != undefined) {
      this.isShowSubParentTest = true;
      // this.onChangeParentTest(this.testItem?.parentTest?._id);
      this.getSubSubTestsBySubPsrentID(this.testItem?.parentTest?.parentTest);
      // this.getTest();
      parent = this.testItem?.parentTest?.parentTest;
      this.selectedSubParent = this.testItem?.parentTest?._id;
      subParent = this.testItem?.parentTest?._id;
      console.log("this.selectedSubParent",this.selectedSubParent)
    } else {
      parent = this.testItem?.parentTest?._id;
    }
    this.selected = this.testItem?.isSubTest === true ? 'Add Sub Test' : 'Add Main Test';
    this.testMasterForm.patchValue({
      department: this.testItem?.department?._id,
      isSubTest: this.testItem?.isSubTest === true ? 'Add Sub Test' : 'Add Main Test',
      isTest: this.testItem?.isTest,
      parentTest: parent,
      subParentTest: subParent,
      code: this.testItem?.code,
      name: this.testItem?.name,
      displayName: this.testItem?.displayName,
      container: this.testItem?.container,
      interpretation: this.testItem?.interpretation,
      shortName: this.testItem?.shortName,
      HIMSCode: this.testItem?.HIMSCode,
      specimen: this.testItem?.specimen,
      internationalCode: this.testItem?.internationalCode,
      method: this.testItem?.method,
      instruction: this.testItem?.instruction,
      settings: {
        unAcceptableConditions: this.testItem?.settings?.unAcceptableConditions,
        cutOffTime: this.testItem?.settings?.cutOffTime,
        minProcessTime: this.testItem?.settings?.minProcessTime,
        emergencyProcessTime: this.testItem?.settings?.emergencyProcessTime,
        expiryTime: this.testItem?.settings?.expiryTime,
        applicableTo: this.testItem?.settings?.applicableTo,
        testDoneOn: {
          Sun: this.testItem?.settings?.testDoneOn?.Sun == true ? this.checked = true : this.checked = false,
          Mon: this.testItem?.settings?.testDoneOn?.Mon == true ? this.checked = true : this.checked = false,
          Tue: this.testItem?.settings?.testDoneOn?.Tue == true ? this.checked = true : this.checked = false,
          Wed: this.testItem?.settings?.testDoneOn?.Wed == true ? this.checked = true : this.checked = false,
          Thu: this.testItem?.settings?.testDoneOn?.Thu == true ? this.checked = true : this.checked = false,
          Fri: this.testItem?.settings?.testDoneOn?.Fri == true ? this.checked = true : this.checked = false,
          Sat: this.testItem?.settings?.testDoneOn?.Sat == true ? this.checked = true : this.checked = false,
        },
        minSampleQuantity: this.testItem?.settings?.minSampleQuantity,
        testSuffix: this.testItem?.settings?.testSuffix,
        suffixDesc: this.testItem?.settings?.suffixDesc,
        minProcessPeriod: this.testItem?.settings?.minProcessPeriod,
        emergencyProcessPeriod: this.testItem?.settings?.emergencyProcessPeriod,
        expiryPeriod: this.testItem?.settings?.expiryPeriod,
        reportingDays: this.testItem?.settings?.reportingDays,
      },
      options: {
        noSale: this.testItem?.options?.noSale == true ? this.checked = true : this.checked = false,
        accreditedTest: this.testItem?.options?.accreditedTest == true ? this.checked = true : this.checked = false,
        noHouseVisit: this.testItem?.options?.noHouseVisit == true ? this.checked = true : this.checked = false,
        outsourced: this.testItem?.options?.outsourced == true ? this.checked = true : this.checked = false,
        inactive: this.testItem?.options?.inactive == true ? this.checked = true : this.checked = false,
        preferDoctor: this.testItem?.options?.preferDoctor == true ? this.checked = true : this.checked = false,
        attachedServiceDoctors: this.testItem?.options?.attachedServiceDoctors == true ? this.checked = true : this.checked = false,
        editBill: this.testItem?.options?.editBill == true ? this.checked = true : this.checked = false,
        editQuantity: this.testItem?.options?.editQuantity == true ? this.checked = true : this.checked = false,
        noBarCode: this.testItem?.options?.noBarCode == true ? this.checked = true : this.checked = false,
        appointment: this.testItem?.options?.appointment == true ? this.checked = true : this.checked = false,
        noResult: this.testItem?.options?.noResult == true ? this.checked = true : this.checked = false,
        allowDiscount: this.testItem?.options?.allowDiscount == true ? this.checked = true : this.checked = false,
      }
    });
    localStorage.removeItem('TestItem');
  }

  getSubSubTestsBySubPsrentID(id) {
    this.health.getTestsById(id).subscribe((resp) => {
      console.log("getSubSubTestsBySubParentID resp",resp);
      if( resp.statusCode == 200 ) {
    this.subTestData = resp.data.subTests.filter(res => { return res.isTest === false });
        console.log("this.subTestData123",this.subTestData);
      }
    })
  }

  checkedall(event) {
    console.log("event", event.toElement.children[0].checked, event)
    if (event.target.children[0].checked == false) {
      this.checked = true
    } else {
      this.checked = false
    }
  }

  getTest() {
    this.health.getTestAndSubTests().subscribe(res => {
      console.log('testDetails', res.data.tests)
      this.testDetails = res.data.tests;
      this.testDetails = this.testDetails?.filter(res => { return res.isTest === false })
    })
  }
  onChangeParentTest(id) {
    
    console.log('this.testDetails', this.testDetails)
    console.log("id123", id);
    this.subTestDetails = this.testDetails.find(res => {
      console.log("res._id", res._id)
      return res._id === id
    });
    this.subTestData = []
    this.testMasterForm.patchValue({
      subParentTest:null
    })

    this.subTestData = this.subTestDetails?.subTests.filter(res => { return res.isTest === false })
    // console.log("event", event.target.value)
    this.testMasterForm.patchValue({
      department: this.subTestDetails?.department?._id
    })
  }
  onChangeTestTrue(event) {
    console.log('event', event, event.target.value)
    if (event.target.value) {
      this.testMasterForm.patchValue({
        isTest: true
      })
    }
  }

  onChangeTestType(event) {
    console.log('event', event.target.value)

    if (this.testMasterForm.value.isSubTest === 'Add Main Test') {
      this.showParentTest = false;
      this.testMasterForm.patchValue({
        parentTest: null
      })
    } else {
      this.showParentTest = true;
    }
    console.log("form", event.target.value, this.testMasterForm.value.parentTest)

  }

  getDepartments() {
    this.health.getDepartments().subscribe(res => {
      this.departments = res.data.departments
      console.log("departments", this.departments)
    })
  }

  // addSubtest(){
  //   let subtest = this.testMasterForm.get('subTests') as FormArray;
  //   subtest.push( new FormGroup({
  //     name: new FormControl('')
  //   }));
  // }

  // getSubtest(){
  //   return (this.testMasterForm.get('subTests') as FormArray).controls;
  // }

  saveTest() {
    console.log("=====================>>>???", this.testMasterForm.value);
    if (this.testMasterForm.value.isSubTest == 'Add Sub Test') {
      this.testMasterForm.value.isSubTest = true;
    } else {
      this.testMasterForm.value.isSubTest = false;
    }
    if(this.testMasterForm.value.subParentTest != null || this.testMasterForm.value.subParentTest != undefined) {
      this.testMasterForm.value.parentTest = this.testMasterForm.value.subParentTest
    } else {
      this.testMasterForm.value.parentTest = this.testMasterForm.value.parentTest
    }
    console.log("this.testsubparentTet",this.testMasterForm.value.subParentTest)
    this.health.saveTest(this.testMasterForm.value).subscribe(res => {
      if (res.statusCode === 200) {
        this.getTest()
        Swal.fire({
          title: 'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
        }).then(result => {
          this.clearTest();
          // this.loadForm();
        })
      }
    })
  }

  updateTestMaster() {

    if(this.testMasterForm.value.subParentTest == null || this.testMasterForm.value.subParentTest == undefined ) {
      this.testMasterForm.value.parentTest = this.testMasterForm.value.parentTest;
    } else {
      this.testMasterForm.value.parentTest = this.testMasterForm.value.subParentTest;
      this.testMasterForm.value.subParentTest = null;
    }
    let id = this.localItem._id;
    if (this.testMasterForm.value.isSubTest == 'Add Sub Test') {
      this.testMasterForm.value.isSubTest = true;
    } else {
      this.testMasterForm.value.isSubTest = false;
    }
    let req = this.testMasterForm.value;
    console.log("req 12345",req)
    this.health.updateTestMaster(id , req).subscribe((resp) => {
      console.log("updateTestMaster resp",resp);
      if(resp.statusCode == 200 ) {
        Swal.fire({
          icon: 'success',
          title: `${resp.message}`
        }).then((res) => {
          if(res.isConfirmed) {
            this.router.navigateByUrl('admin/testMasterList');
          }
        })
      }
    })
  }

  clearTest() {
    this.testMasterForm.reset();
    this.loadForm();
    this.showParentTest = false
    this.showParentTest = false
  }

}
