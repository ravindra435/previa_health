import { ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrinterService } from 'ngx-printer';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AdminService } from 'src/app/service/admin.service';
import { BroadcastService } from 'src/app/service/broadcast.service';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { InteractionMode } from 'igniteui-angular';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patientaccshow: string;
  testaccshow: string;
  pastaccshow: string;
  familyaccshow: string;
  questionnaireshow: string;
  data: boolean;
  testname: any;
  patientRegistrationForm: FormGroup;
  details: FormGroup
  patientdetailsdata: any;
  pid: any;
  value: any = '1234567'
  age: number;
  tests: any;
  showForm: boolean;
  barCodeValue: any;
  printId: string;
  showQuestioner: boolean = false;
  myForm: FormGroup;
  questionariesDetails: any;
  showqrcode: boolean;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  createdAt: any;
  pdfSrc = './assets/PreviaLogo.png';
  doctorReviewshow: string;
  showUploadFiles: boolean = false;
  uploadFilesData: any = [];
  uploadFilesDetails: any;
  file: any;
  image = 'http://139.59.16.224:3001/'
  imageView: any;
  removeTestFormFlag: boolean;
  testArray = [];
  sampleTestArray = [];
  defaultTestPackages: any;
  updateTestsForm: FormGroup;
  testsDetails: any;
  testId: any;
  resMessage: any;
  submitted: boolean = false;
  currentItem: any;
  templateViewContent: any;
  public Editor = ClassicEditor;
  closeResult = '';
  productSub: any;
  showQuestionnaireView: boolean = false
  disbalePIDInput: boolean = true
  isDefaultTestPackage: boolean = false
  hideScannerbutton: boolean = false
  @ViewChild('search') searchElement: ElementRef;
  public mode: InteractionMode = InteractionMode.DropDown;
  public format: string = "hh:mm tt";
  constructor(private fb: FormBuilder, private healthService: HealthService,
    private cdr: ChangeDetectorRef, private ngZone: NgZone, private printerService: NgxPrinterService,
    private broadcastServicde: BroadcastService, private sanitizer: DomSanitizer,
    private adminService: AdminService, private dialog: MatDialog, private modalService: NgbModal) {
    // { value: this.patientdetailsdata?.pid, disabled: true }
    this.patientRegistrationForm = this.fb.group({
      PID: [""],
      name: ["", Validators.required],
      DOB: [""],
      gender: ["", Validators.required],
      mobileNumber: [""],
      emailAddress: [""],
      aadhaar: [""],
      address: [""],
      city: [""],
      state: [""],
      referredByType: [""],
      referredByCode: [""],
      referredByName: [""],
      habits: [""],
      economicStatus: [""],
      lifeStyle: [""],
      occupation: [""],
      proofType:[""],
      proofValue:[""],


      details: this.fb.group({
        height: [""],
        weight: [""],
        BMI: [""],
        BP: [""],
        acuityOfVision: [""],
        bloodGroup: [""],
        temperature: [""],
        comment: [""]
      }),
      tests: this.fb.array([]),
      // this.testDetailsForm()
      medicalHistory: this.fb.array([this.medicalHistoryDetailsForm()]),
      familyHistory: this.fb.array([this.familyHistoryDetailsForm()]),
      doctorReview: this.fb.array([this.doctorReviewForm()]),
    })
    this.updateTestsForm = this.fb.group({
      test: [''],
      value: [null],
      comment: [null],
      id: [""]
    })
  }
  myControl = new FormControl();
  testControl = '';
  options = [];
  //  options: Observable<string[]>
  filteredOptions: Observable<any>;
  get f() { return this.patientRegistrationForm.controls }
  getpatients(event) {
    let value = (<HTMLInputElement>event.target).value;
    console.log("value", value)
    if (value) {
      this.healthService.getPatientsDataBySearch(value).subscribe(res => {
        this.options = res.data.patients
      }
      )
    } else {
      this.options = []
    }

  }

  //  private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option?.name.toLowerCase().indexOf(filterValue) === 0);
  // }
  myFormtest: FormGroup;



  ngOnInit(): void {
    // this.getTests()
    this.getQuestionaries()
    this.getDefaultTestPackages()
    this.getTestDetails()
    // this.loadForm()
    // this.testcreateform('')
    // this.createform()
    // this.getGeneratePid()
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // )
    const pid = localStorage.getItem('pid')
    if (pid) {
      this.hideScannerbutton = true
      this.onFileChange(pid)
      localStorage.removeItem('pid')
    }


  }
  getPlaceholder(item){
    if(item === 'క్లస్టర్ / సెంటర్ / గ్రామ పేరు - Cluster / Center / Village Name'){
      return "Select Village Name"
    }else if(item === 'ఇంటర్వ్యూ భాష / Interview language'){
      return 'Select Language'
    }else{
      return 'select'
    }

  }
  getTests(event) {
    let value = (<HTMLInputElement>event.target).value;
    console.log("value", value)
    if (value) {
      this.healthService.getSearchTestsPackages(value).subscribe(res => {
        console.log("tests", res)
        this.tests = res.data
      })
    } else {
      this.options = []
    }

  }

  open(content, item) {
    this.currentItem = item;
    console.log("this.currentItem", this.currentItem);
    if (this.currentItem?.value != null || this.currentItem?.value != undefined) {
      console.log("if caseeeeeee")
      this.templateViewContent = this.currentItem?.value;
    } else {
      console.log("else caseeeeeee")
      this.templateViewContent = this.currentItem?.testResult?.template
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  toggleDisabled() {
    // this.isDisabled = !this.isDisabled
  }

  public isDisabled = true;

  getDefaultTestPackages() {
    this.healthService.getDefaultTestPackages().subscribe(res => {
      console.log("default", res)
      this.defaultTestPackages = res.data.tests
    })
  }
  selectDefaultTestPackages(event) {
    console.log("package", event.checked, event.value)
    if (event.checked === true) {
      for (let i = 0; i < this.defaultTestPackages?.length; i++) {
        const element = this.defaultTestPackages[i];
        console.log("element", element)

        const array = element
        array["defaultPackage"] = true
        if (array?.subTests?.length === 0) {
          const filterTest = this.sampleTestArray.filter(res => {
            return res._id === array._id
          })
          if (filterTest.length === 0) {
            this.sampleTestArray.push(array)
          } else {
            // alert(array.name)
          }
        }

        if (array?.subTests?.length > 0) {
          for (let i = 0; i < array?.subTests?.length; i++) {
            if (array?.subTests[i].subTests?.length === 0) {
              const filterSubTest = this.sampleTestArray.filter(res => {
                return res._id === array?.subTests[i]._id
              })
              if (filterSubTest.length === 0) {
                const subTest = array?.subTests[i]
                subTest["defaultPackage"] = true
                this.sampleTestArray.push(subTest)
              } else {
                // alert(array?.subTests[i])
              }
            } else {
              for (let j = 0; j < array?.subTests[i].subTests.length; j++) {
                const filterSubTest = this.sampleTestArray.filter(res => {
                  return res._id === array?.subTests[i].subTests[j]._id
                })
                if (filterSubTest.length === 0) {
                  const subTestSubTest = array?.subTests[i].subTests[j]
                  subTestSubTest["defaultPackage"] = true
                  this.sampleTestArray.push(subTestSubTest)
                } else {
                  // alert(array?.subTests[i].subTests[j])
                }

              }
            }


          }
          console.log("arra", this.sampleTestArray)
        }
      }
      this.isDefaultTestPackage = true
    } else {
      this.isDefaultTestPackage = false
      this.sampleTestArray = this.sampleTestArray.filter(res => { return res.defaultPackage !== true })
    }
    this.sampleTestArray = this.sampleTestArray.filter(res => {
      return res.isTest === true
    })
    console.log("arra", this.sampleTestArray)
  }
  onChangeTestValue(event) {
    console.log("suresh")
    if (event.type === 'package') {
      this.adminService.gettestpackagesByid(event._id).subscribe(res => {
        console.log("ressuresh", res)
        this.filterPackages(res.data)
      })
    } else {
      this.healthService.getTestsById(event._id).subscribe(res => {
        console.log("ressuresh", res);
        this.filterTests(res.data)

      })
    }

    this.testControl = null
    this.tests = []

  }
  filterPackages(res) {
    const packages = res.tests
    for (let i = 0; i < packages?.length; i++) {
      const element = packages[i];
      this.filterTests(element)

    }
  }

  filterTests(res) {
    const array = res
    if (array?.subTests?.length === 0) {
      this.isDefaultTestPackage = false
      const filterTest = this.sampleTestArray.filter(res => {
        return res._id === array._id
      })
      if (filterTest.length === 0) {
        this.sampleTestArray.push(array)
      } else {
        alert(`${array.name} Already Added`)
      }
    }


    // this.sampleTestArray.push(array)
    if (array?.subTests?.length > 0) {
      this.isDefaultTestPackage = true
      for (let i = 0; i < array?.subTests?.length; i++) {
        if (array?.subTests[i].subTests?.length === 0) {
          const filterSubTest = this.sampleTestArray.filter(res => {
            return res._id === array?.subTests[i]._id
          })
          if (filterSubTest.length === 0) {
            this.sampleTestArray.push(array?.subTests[i])
          } else {
            alert(` ${array?.subTests[i].name} already added`)
          }
        } else if (array?.subTests[i].subTests?.length > 0) {
          for (let j = 0; j < array?.subTests[i].subTests.length; j++) {
            const filterSubTest = this.sampleTestArray.filter(res => {
              return res._id === array?.subTests[i].subTests[j]._id
            })
            if (filterSubTest.length === 0) {
              this.sampleTestArray.push(array?.subTests[i].subTests[j])
            } else {
              alert(`${array?.subTests[i].subTests[j].name} already added`)
            }

          }
        }


      }
      console.log("arra", this.sampleTestArray)
    }
    this.sampleTestArray = this.sampleTestArray.filter(res => {
      return res.isTest === true
    })
  }

  deleteTestsFromSelectionList(item) {
    this.sampleTestArray = this.sampleTestArray.filter(res => { return res !== item })
  }



  onFileChange(event) {
    this.pid = event
    this.value = event
    this.age = 0
    this.healthService.getPatientsbyPId(event).subscribe(res => {
      this.patientdetailsdata = res.data
      this.getQuestionaries()
      this.addFormFields()
      this.hideScannerbutton = true
      this.patientRegistrationForm.patchValue({
        PID: this.patientdetailsdata?.pid,
        name: this.patientdetailsdata?.name,
        DOB: this.patientdetailsdata?.DOB,
        gender: this.patientdetailsdata?.gender,
        mobileNumber: this.patientdetailsdata?.mobileNumber,
        emailAddress: this.patientdetailsdata?.emailAddress,
        aadhaar: this.patientdetailsdata?.aadhaar,
        address: this.patientdetailsdata?.address,
        city: this.patientdetailsdata?.city,
        state: this.patientdetailsdata?.state,
        habits: this.patientdetailsdata?.habits,
        economicStatus: this.patientdetailsdata?.economicStatus,
        lifeStyle: this.patientdetailsdata?.lifeStyle,
        occupation: this.patientdetailsdata?.occupation,
        proofType: this.patientdetailsdata?.proofType,
        ProofValue: this.patientdetailsdata?.proofValue,

      })


      console.log("form", this.patientRegistrationForm.value)
      this.getUploadFile()
      if (this.patientdetailsdata.DOB !== null) {
        this.onDateChange(this.patientdetailsdata?.DOB)
        console.log("res", res)
      }

      // this.addFormFields();
    })
  }

  getUploadFile() {
    this.healthService.getPatientDocuments(this.patientdetailsdata._id).subscribe(res => {
      this.uploadFilesDetails = res.data.attachments
      console.log("upload", res)
    })
  }

  // testDetailsForm(): FormGroup {
  //   return this.fb.group({
  //     test: [""],
  //     value: [null],
  //     comment: [null]
  //   });
  // }
  medicalHistoryDetailsForm(): FormGroup {
    return this.fb.group({
      medicine: [""],
      frequency: [""],
      noOfDays: [""],
      comment: [""]
    });
  }

  familyHistoryDetailsForm(): FormGroup {
    return this.fb.group({
      decease: [""],
      relation: [""],
      fromYears: [""],
      comment: [""]
    });
  }
  doctorReviewForm(): FormGroup {
    return this.fb.group({
      review: [""]
    });
  }

  // addDetailsItem(): void {
  //   console.log("testname",this.patientDetailsForm().value); 
  //     (<FormArray>this.patientRegistrationForm.get('details')).push(this.patientDetailsForm());


  //   //  this.details = this.patientRegistrationForm.get('tests') as FormArray;
  //   // this.details.push(this.testDetailsForm());
  //   // this.BonblocType.reset()
  // }
  // addTestsItem(): void { 
  //   (<FormArray>this.patientRegistrationForm.get('tests')).push(this.testDetailsForm());
  // }
  public editTests(test, templateref: TemplateRef<any>): void {
    this.testId = test.test._id
    console.log("test", test)
    this.updateTestsForm.patchValue({
      test: test.test._id,
      value: test.value,
      comment: test.comment,
      id: test._id
    })
    this.dialog.open(templateref)
  }

  public updateTestsDetails() {
    const formData = {
      test: this.updateTestsForm.value.test,
      value: this.updateTestsForm.value.value,
      comment: this.updateTestsForm.value.comment,
    }
    console.log("form", formData, this.updateTestsForm.value.id)
    // this.healthService.updatePatientTestByid(this.updateTestsForm.value.id,formData).subscribe(res=>{
    //   console.log("res",res)
    //   this.onFileChange(this.pid)
    //   this.dialog.closeAll()
    // })
  }

  public removePatientmedicalHistory(index): void {
    (<FormArray>this.patientRegistrationForm.get('medicalHistory')).removeAt(index);
  }
  public removePatientfamilyHistory(index): void {
    (<FormArray>this.patientRegistrationForm.get('familyHistory')).removeAt(index);
  }

  public removePatientdoctorReview(index): void {
    (<FormArray>this.patientRegistrationForm.get('doctorReview')).removeAt(index);
  }




  addmedicalHistoryItem(): void {
    (<FormArray>this.patientRegistrationForm.get('medicalHistory')).push(this.medicalHistoryDetailsForm());
  }

  addfamilyHistoryItem(): void {
    (<FormArray>this.patientRegistrationForm.get('familyHistory')).push(this.familyHistoryDetailsForm());
  }
  addDoctorReviewItem(): void {
    (<FormArray>this.patientRegistrationForm.get('doctorReview')).push(this.doctorReviewForm());
  }


  accordian(data) {
    if (data == "patient") {
      this.patientaccshow = this.patientaccshow === 'patient' ? "patienone" : "patient"
    } else if (data === "test") {
      this.testaccshow = this.testaccshow === 'test' ? "testnone" : "test"
    } else if (data === "past") {
      this.pastaccshow = this.pastaccshow === 'past' ? "pastnone" : "past"
    } else if (data === "family") {
      this.familyaccshow = this.familyaccshow === 'family' ? "familynone" : "family"
    } else if (data === "doctorReview") {
      this.doctorReviewshow = this.doctorReviewshow === 'doctorReview' ? "doctorReviewnone" : "doctorReview"
    }
    else if (data === "questionnaireView") {
      this.questionnaireshow = this.questionnaireshow === 'questionnaireReview' ? "questionnaireReviewnone" : "questionnaireReview"
    }

  }

  getTestDetails() {
    const data = {}
    this.healthService.getTest(data).subscribe(res => {
      console.log("tests", res)
      this.testsDetails = res.data.tests
    })
  }




  onSelectTest(event, i) {
    console.log("evet", event, i)
    if (event.target.value === 'others') {
      this.testname = { name: event.target.value, index: i }
    }
  }
  onSubmit() {
    this.submitted = true;
    this.patientDynamicFormValidation();
    if (this.patientRegistrationForm.invalid) {
      alert('Please Enter Vaild  Details')
      return
    }


    let testsArray = []
    for (let i = 0; i < this.sampleTestArray?.length; i++) {
      const testData = {}
      testData['test'] = this.sampleTestArray[i]._id,
        testData['value'] = null,
        testData['comment'] = null
      testsArray.push(testData)

    }
    if (this.patientdetailsdata?.pid) {
      const formdata = {
        patientId: this.patientdetailsdata?._id,
      }
      if (this.patientRegistrationForm.value.name !== null && this.patientRegistrationForm.value.name !== "") {
        formdata["name"] = this.patientRegistrationForm.value.name
      }
      if (this.patientRegistrationForm.value.DOB !== null && this.patientRegistrationForm.value.DOB !== "") {
        formdata["DOB"] = this.patientRegistrationForm.value.DOB
      }
      if (this.patientRegistrationForm.value.gender !== null && this.patientRegistrationForm.value.gender !== "") {
        formdata["gender"] = this.patientRegistrationForm.value.gender
      }
      if (this.patientRegistrationForm.value.mobileNumber !== null && this.patientRegistrationForm.value.mobileNumber !== "") {
        formdata["mobileNumber"] = this.patientRegistrationForm.value.mobileNumber.toString()
      }
      if (this.patientRegistrationForm.value.emailAddress !== null && this.patientRegistrationForm.value.emailAddress !== "") {
        formdata["emailAddress"] = this.patientRegistrationForm.value.emailAddress
      }
      if (this.patientRegistrationForm.value.aadhaar !== null && this.patientRegistrationForm.value.aadhaar !== "") {
        formdata["aadhaar"] = this.patientRegistrationForm.value.aadhaar
      }
      if (this.patientRegistrationForm.value.address !== null && this.patientRegistrationForm.value.address !== "") {
        formdata["address"] = this.patientRegistrationForm.value.address
      }
      if (this.patientRegistrationForm.value.city !== null && this.patientRegistrationForm.value.city !== "") {
        formdata["city"] = this.patientRegistrationForm.value.city
      }
      if (this.patientRegistrationForm.value.state !== null && this.patientRegistrationForm.value.state !== "") {
        formdata["state"] = this.patientRegistrationForm.value.state
      }
      if (this.patientRegistrationForm.value.referredByType !== null && this.patientRegistrationForm.value.referredByType !== "") {
        formdata["referredByType"] = this.patientRegistrationForm.value.referredByType
      }
      if (this.patientRegistrationForm.value.referredByCode !== null && this.patientRegistrationForm.value.referredByCode !== "") {
        formdata["referredByCode"] = this.patientRegistrationForm.value.referredByCode
      }
      if (this.patientRegistrationForm.value.referredByName !== null && this.patientRegistrationForm.value.referredByName !== "") {
        formdata["referredByName"] = this.patientRegistrationForm.value.referredByName
      }

      if (this.patientRegistrationForm.value.habits !== null && this.patientRegistrationForm.value.habits !== "") {
        formdata["habits"] = this.patientRegistrationForm.value.habits
      }
      if (this.patientRegistrationForm.value.economicStatus !== null && this.patientRegistrationForm.value.economicStatus !== "") {
        formdata["economicStatus"] = this.patientRegistrationForm.value.economicStatus
      }
      if (this.patientRegistrationForm.value.lifeStyle !== null && this.patientRegistrationForm.value.lifeStyle !== "") {
        formdata["lifeStyle"] = this.patientRegistrationForm.value.lifeStyle
      }
      if (this.patientRegistrationForm.value.occupation !== null && this.patientRegistrationForm.value.occupation !== "") {
        formdata["occupation"] = this.patientRegistrationForm.value.occupation
      }
      if (this.patientRegistrationForm.value.proofType !== null && this.patientRegistrationForm.value.proofType !== "") {
        formdata["proofType"] = this.patientRegistrationForm.value.proofType
      }
      if (this.patientRegistrationForm.value.proofValue !== null && this.patientRegistrationForm.value.proofValue !== "") {
        formdata["proofValue"] = this.patientRegistrationForm.value.proofValue
      }
      this.healthService.addPatients(formdata).subscribe(res => {

        this.resMessage = res
        this.cdr.detectChanges()
        if (this.resMessage?.statusCode === 200) {
          Swal.fire({
            title: 'WelCome!',
            text: `${this.patientRegistrationForm.value.name ?? this.patientdetailsdata.name} Has Been updated Successfully`,
            icon: 'success',
            confirmButtonText: 'ok',
            allowEscapeKey:false,
            allowOutsideClick:false
          }).then(result => {
            // this.patientRegistrationForm.reset()
            this.patientRegistrationForm.reset()
            this.onFileChange(this.patientdetailsdata.pid)
            this.cdr.detectChanges()
            this.resMessage = ''
            this.sampleTestArray = []
          })
          // setTimeout(() => {

          // }, 50);


        }

      })


      // const tests = this.patientRegistrationForm.value.tests.filter(res => res.test !== "" && res.test !== null)
      const medicalHistory = this.patientRegistrationForm.value.medicalHistory.filter(res => res.medicine !== "" && res.medicine !== null)
      const familyHistory = this.patientRegistrationForm.value.familyHistory.filter(res => res.decease !== "" && res.decease !== null)
      const doctorReview = this.patientRegistrationForm.value.doctorReview.filter(res => res.review !== "" && res.review !== null)
      console.log("...", testsArray, medicalHistory, familyHistory)
      const form = this.patientRegistrationForm.value.details
      if (form.height !== null && form.height !== "" || form.weight !== null && form.weight !== "" || form.BMI !== null && form.BMI !== "" || form.BP !== null && form.BP !== "" || form.acuityOfVision !== null && form.acuityOfVision !== "" || form.bloodGroup !== null && form.bloodGroup !== "" || form.temperature !== null && form.temperature !== "") {
        this.healthService.addpatientsdetilsBypid(this.patientdetailsdata._id, this.patientRegistrationForm.value.details).subscribe(res => {
          console.log("details", res)

        })

      }
      if (testsArray.length > 0) {
        const formdata = {}
        formdata["tests"] = testsArray,

          this.healthService.addpatientsTestsBypid(this.patientdetailsdata._id, formdata).subscribe(res => {
            console.log("res", res)
          })
      }
      if (medicalHistory.length > 0) {
        const formdata = {}
        formdata["medicalHistory"] = medicalHistory,

          this.healthService.addpatientsMedicalHistoryBypid(this.patientdetailsdata._id, formdata).subscribe(res => {
            console.log("res", res)
          })
      }
      if (familyHistory.length > 0) {
        const formdata = {}
        formdata["familyHistory"] = familyHistory,

          this.healthService.addpatientsFamilyHistoryBypid(this.patientdetailsdata._id, formdata).subscribe(res => {
            console.log("res", res)
          })
      }
      if (doctorReview.length > 0) {
        const formdata = {}
        formdata["doctorReviews"] = doctorReview,

          this.healthService.addpatientsDoctorReviewsBypid(this.patientdetailsdata._id, formdata).subscribe(res => {
            console.log("res", res)
          })
      }
      // this.patientRegistrationForm.reset()
      // this.healthService.getPatientsbyPId(this.patientdetailsdata.pid).subscribe(res => {
      //   this.options = res.data.patients
      // }
      // )



    } else {
      // const details = this.patientRegistrationForm.value.details.filter(res=>res.test !== "")
      // const tests = this.patientRegistrationForm.value.tests.filter(res => res.test !== "" && res.test !== null)
      const medicalHistory = this.patientRegistrationForm.value.medicalHistory.filter(res => res.medicine !== "" && res.medicine !== null)
      const familyHistory = this.patientRegistrationForm.value.familyHistory.filter(res => res.decease !== "" && res.decease !== null)
      const doctorReview = this.patientRegistrationForm.value.doctorReview.filter(res => res.review !== "" && res.review !== null)
      console.log("array", testsArray, medicalHistory, familyHistory)
      const formdata = {
        // patientId:this.patientRegistrationForm.value.PID,

        // name: this.patientRegistrationForm.value.name,
        // DOB: this.patientRegistrationForm.value.DOB,
        // gender: this.patientRegistrationForm.value.gender,
        // mobileNumber: this.patientRegistrationForm.value.mobileNumber,
        // emailAddress: this.patientRegistrationForm.value.emailAddress,
        // aadhaar: this.patientRegistrationForm.value.aadhaar,
        // address: this.patientRegistrationForm.value.address,
        // city: this.patientRegistrationForm.value.city,
        // state: this.patientRegistrationForm.value.state,
        // referredByType: this.patientRegistrationForm.value.referredByType,
        // referredByCode: this.patientRegistrationForm.value.referredByCode,
        // referredByName: this.patientRegistrationForm.value.referredByName,
        // habits: this.patientRegistrationForm.value.habits,
        // economicStatus: this.patientRegistrationForm.value.economicStatus,
        // lifeStyle: this.patientRegistrationForm.value.lifeStyle,
        // occupation: this.patientRegistrationForm.value.occupation,
      }
      if (this.patientRegistrationForm.value.name !== null && this.patientRegistrationForm.value.name !== "") {
        formdata["name"] = this.patientRegistrationForm.value.name
      }
      if (this.patientRegistrationForm.value.DOB !== null && this.patientRegistrationForm.value.DOB !== "") {
        formdata["DOB"] = this.patientRegistrationForm.value.DOB
      }
      if (this.patientRegistrationForm.value.gender !== null && this.patientRegistrationForm.value.gender !== "") {
        formdata["gender"] = this.patientRegistrationForm.value.gender
      }
      if (this.patientRegistrationForm.value.mobileNumber !== null && this.patientRegistrationForm.value.mobileNumber !== "") {
        formdata["mobileNumber"] = this.patientRegistrationForm.value.mobileNumber.toString()
      }
      if (this.patientRegistrationForm.value.emailAddress !== null && this.patientRegistrationForm.value.emailAddress !== "") {
        formdata["emailAddress"] = this.patientRegistrationForm.value.emailAddress
      }
      if (this.patientRegistrationForm.value.aadhaar !== null && this.patientRegistrationForm.value.aadhaar !== "") {
        formdata["aadhaar"] = this.patientRegistrationForm.value.aadhaar
      }
      if (this.patientRegistrationForm.value.address !== null && this.patientRegistrationForm.value.address !== "") {
        formdata["address"] = this.patientRegistrationForm.value.address
      }
      if (this.patientRegistrationForm.value.city !== null && this.patientRegistrationForm.value.city !== "") {
        formdata["city"] = this.patientRegistrationForm.value.city
      }
      if (this.patientRegistrationForm.value.state !== null && this.patientRegistrationForm.value.state !== "") {
        formdata["state"] = this.patientRegistrationForm.value.state
      }
      if (this.patientRegistrationForm.value.referredByType !== null && this.patientRegistrationForm.value.referredByType !== "") {
        formdata["referredByType"] = this.patientRegistrationForm.value.referredByType
      }
      if (this.patientRegistrationForm.value.referredByCode !== null && this.patientRegistrationForm.value.referredByCode !== "") {
        formdata["referredByCode"] = this.patientRegistrationForm.value.referredByCode
      }
      if (this.patientRegistrationForm.value.referredByName !== null && this.patientRegistrationForm.value.referredByName !== "") {
        formdata["referredByName"] = this.patientRegistrationForm.value.referredByName
      }

      if (this.patientRegistrationForm.value.habits !== null && this.patientRegistrationForm.value.habits !== "") {
        formdata["habits"] = this.patientRegistrationForm.value.habits
      }
      if (this.patientRegistrationForm.value.economicStatus !== null && this.patientRegistrationForm.value.economicStatus !== "") {
        formdata["economicStatus"] = this.patientRegistrationForm.value.economicStatus
      }
      if (this.patientRegistrationForm.value.lifeStyle !== null && this.patientRegistrationForm.value.lifeStyle !== "") {
        formdata["lifeStyle"] = this.patientRegistrationForm.value.lifeStyle
      }
      if (this.patientRegistrationForm.value.occupation !== null && this.patientRegistrationForm.value.occupation !== "") {
        formdata["occupation"] = this.patientRegistrationForm.value.occupation
      }
      if (this.patientRegistrationForm.value.proofType !== null && this.patientRegistrationForm.value.proofType !== "") {
        formdata["proofType"] = this.patientRegistrationForm.value.proofType
      }
      if (this.patientRegistrationForm.value.proofValue !== null && this.patientRegistrationForm.value.proofValue !== "") {
        formdata["proofValue"] = this.patientRegistrationForm.value.proofValue
      }


      const form = this.patientRegistrationForm.value.details
      if (form.height !== null && form.height !== "" || form.weight !== null && form.weight !== "" || form.BMI !== null && form.BMI !== "" || form.BP !== null && form.BP !== "" || form.acuityOfVision !== null && form.acuityOfVision !== "" || form.bloodGroup !== null && form.bloodGroup !== "" || form.temperature !== null && form.temperature !== "") {
        formdata["details"] = this.patientRegistrationForm.value.details
      }

      formdata["tests"] = testsArray,
        formdata["medicalHistory"] = medicalHistory,
        formdata["familyHistory"] = familyHistory
      formdata["doctorReviews"] = doctorReview

      this.healthService.addPatients(formdata).subscribe(res => {
        if (res.statusCode === 200) {
          this.patientRegistrationForm.reset();
          this.submitted = false

          this.patientDynamicFormValidation();
          this.clearForm()
          this.sampleTestArray = []
          this.age = null
          Swal.fire({
            title: 'WelCome!',
            text: `${res?.message}`,
            icon: 'success',
            confirmButtonText: 'ok',
            allowEscapeKey: false,
            allowOutsideClick: false,

          });
          this.testaccshow = ''
          this.patientaccshow = ''
          this.pastaccshow = ''
          this.familyaccshow = ''
          this.doctorReviewshow = ''
          this.questionnaireshow = ''
        }
      })
    }
    // this.sampleTestArray = []
  }
  patientDynamicFormValidation() {
    const pForm = this.patientRegistrationForm
    console.log(pForm.value.mobileNumber)
    const tempArray = ["", null, undefined]
    tempArray.includes(pForm.value.mobileNumber) ? (pForm.get('mobileNumber').clearValidators(), pForm.get('mobileNumber').updateValueAndValidity()) : (pForm.get('mobileNumber').setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]), pForm.get('mobileNumber').updateValueAndValidity());
    tempArray.includes(pForm.value.aadhaar) ? (pForm.get('aadhaar').clearValidators(), pForm.get('aadhaar').updateValueAndValidity()) : (pForm.get('aadhaar').setValidators([Validators.required, Validators.minLength(12), Validators.maxLength(12)]), pForm.get('aadhaar').updateValueAndValidity());
    tempArray.includes(pForm.value.emailAddress) ? (pForm.get('emailAddress').clearValidators(), pForm.get('emailAddress').updateValueAndValidity()) : (pForm.get('emailAddress').setValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]), pForm.get('emailAddress').updateValueAndValidity());
  }
  onDateChange(event) {
    console.log("dob", this.patientRegistrationForm.value.DOB !== '' && this.patientRegistrationForm.value.DOB !== null || this.patientdetailsdata.DOB)
    if (this.patientRegistrationForm.value.DOB !== '' && this.patientRegistrationForm.value.DOB !== null) {
      var timeDiff = Math.abs(Date.now() - new Date(this.patientRegistrationForm.value.DOB).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log("date", event, this.age)
    } else {
      this.age = 0
    }

  }

  clearForm() {
    this.patientRegistrationForm.reset()
    this.patientRegistrationForm.get('mobileNumber').clearValidators(), this.patientRegistrationForm.get('mobileNumber').updateValueAndValidity();
    this.patientRegistrationForm.get('gender').clearValidators(), this.patientRegistrationForm.get('gender').updateValueAndValidity();
    this.patientRegistrationForm.get('name').clearValidators(), this.patientRegistrationForm.get('name').updateValueAndValidity();
    this.patientRegistrationForm.get('emailAddress').clearValidators(), this.patientRegistrationForm.get('emailAddress').updateValueAndValidity();


    this.patientdetailsdata = {}
    this.age = null
    this.value = "1234567"
    this.defaultTestPackages = []
    this.hideScannerbutton = false
    this.disbalePIDInput = true
    this.isDefaultTestPackage = false
  }

  getGeneratePid() {
    this.healthService.getgeneratePid().subscribe(res => {
      this.barCodeValue = res.data.pid
    })

  }
  printForm(printform: string) {

    this.broadcastServicde.closeSidebar.emit(true);
    if (printform === 'printform') {
      const PID = this.patientRegistrationForm.value.PID
      this.barCodeValue = PID
      this.pid = PID
      this.value = PID
      this.healthService.getPatientsbyPId(PID).subscribe(res => {
        this.patientdetailsdata = res.data
        console.log("pid", res)
        this.getQuestionaries()
        this.showQuestionnaireView = true
        this.disbalePIDInput = true
        this.addFormFields()
        this.patientRegistrationForm.patchValue({
          PID: this.patientdetailsdata?.pid,
          name: this.patientdetailsdata?.name,
          DOB: this.patientdetailsdata?.DOB,
          gender: this.patientdetailsdata?.gender,
          mobileNumber: this.patientdetailsdata?.mobileNumber,
          emailAddress: this.patientdetailsdata?.emailAddress,
          aadhaar: this.patientdetailsdata?.aadhaar,
          address: this.patientdetailsdata?.address,
          city: this.patientdetailsdata?.city,
          state: this.patientdetailsdata?.state,
          habits: this.patientdetailsdata?.habits,
          economicStatus: this.patientdetailsdata?.economicStatus,
          lifeStyle: this.patientdetailsdata?.lifeStyle,
          occupation: this.patientdetailsdata?.occupation,
          proofType: this.patientdetailsdata?.proofType,
          proofValue: this.patientdetailsdata?.proofValue,

        })

        this.cdr.detectChanges()
        this.getUploadFile()
        if (this.patientdetailsdata.DOB !== null) {
          this.onDateChange(this.patientdetailsdata?.DOB)
          // console.log("res", res)
        }
      })


    } else if (printform === 'reprintform') {
      this.barCodeValue = this.patientdetailsdata.pid
      this.createdAt = this.patientdetailsdata.createdAt
      this.showqrcode = false
      this.cdr.detectChanges()
      setTimeout(() => {

        // this.printerService.printCurrentWindow()
        // window.print()
      })
    }

  }

  print(printform: string) {
    console.log(printform)
    if (printform == 'print')
      this.healthService.getgeneratePid().subscribe(res => {
        if (res.statusCode === 200) {
          this.barCodeValue = res.data.pid
          this.createdAt = res.data.createdAt
          this.showqrcode = true
          this.getQuestionaries()

          this.cdr.detectChanges()
          setTimeout(() => {
            this.printerService.printByClassName('printident')
            // this.printerService.printCurrentWindow()
            // window.print()
          }, 250);
        }

      })

  }
  sacnEanble() {
    this.pid = '';
    this.barCodeValue = '';
    this.value = '1234567'
    this.patientRegistrationForm.reset();
    this.disbalePIDInput = null
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
      this.patientdetailsdata ? (this.patientdetailsdata['createdAt'] = '') : {}
      this.age = 0
      this.showQuestionnaireView = false
      this.patientdetailsdata['pid'] = null
      this.details.reset()
      this.patientdetailsdata['details'] = []
      this.sampleTestArray = []
      this.patientdetailsdata['tests'] = []
      this.patientdetailsdata['medicalHistory'] = []
      this.patientdetailsdata['familyHistory'] = []
      this.patientdetailsdata['doctorReviews'] = []

    }, 0);

  }
  onChangeForm(data) {
    if (data == 'Questionnaire') {
      this.showQuestioner = this.showQuestioner == true ? false : true
      this.showUploadFiles = false
    } else if (data == 'Upload Tests') {
      this.showQuestioner = false
      this.showUploadFiles = this.showUploadFiles === true ? false : true
    }

    this.testaccshow = ''
    this.patientaccshow = ''
    this.pastaccshow = ''
    this.familyaccshow = ''
    this.doctorReviewshow = ''
    this.questionnaireshow = ''
    if (this.showQuestioner === false) {
      this.getQuestionaries();
      if (this.patientdetailsdata) {
        this.addFormFields();
      }
    }
  }

  //  questionnaireDetails = [
  //   {questionnaire:"Amount of oil Consumption per Month?",type:1},
  //   {questionnaire:"Rice Consumption per Month",type:1},
  //   {questionnaire:"Sugar Consumption per Month",type:1},
  //   {questionnaire:"Are you doing any physical exercise?",type:2},
  //   {questionnaire:"Milk Consumption per Month",type:1},
  //   {questionnaire:"How many days per week do you eat fruit?",type:1},
  //  ]
  createform() {
    let arr = [];
    for (let i = 0; i < this.questionariesDetails?.length; i++) {
      arr.push(this.BuildFormDynamic(this.questionariesDetails[i]))
      // this.intakedetails =  this.selectedUniversity[i].intake   

    }
    this.myForm = this.fb.group({
      ClassDetails: this.fb.array(arr)
    })

  }
  BuildFormDynamic(product): FormArray {
    let dynamicFormArray: FormArray = new FormArray([]);
    // console.log('pr',product)
    product.questions.forEach(element => {
      if (element.type === 'checkbox') {
        dynamicFormArray.push(
          this.fb.group({
            question: [element.question],
            id: [element._id],
            answer: this.addCheckboxes(element),
            // form:this.rulesFormArray(element?.possibleAnswers),
            code: [element.code],
            type: [element.type],
            units: [element.units],
            possibleAnswers: [element?.possibleAnswers],
            subquestions: this.buildSubquestionForm(element)
          }))
        // this.addCheckboxes(element);
      } else {
        dynamicFormArray.push(
          this.fb.group({
            question: [element.question],
            id: [element._id],
            answer: [null],
            code: [element.code],
            type: [element.type],
            units: [element.units],
            possibleAnswers: [element?.possibleAnswers],
            subquestions: this.buildSubquestionForm(element)
          }))
      }


    });
    return dynamicFormArray;
  }

  private addCheckboxes(element) {
    let dynamicansFormArray: FormArray = new FormArray([]);
    element?.possibleAnswers.forEach((elemen) => dynamicansFormArray.push(new FormControl(false))
    )

    return dynamicansFormArray
  }
  buildSubquestionForm(product): any {
    let dynamicsubFormArray: FormArray = new FormArray([]);
    product.subQuestions.forEach(element => {
      if (element.type === 'checkbox') {
        dynamicsubFormArray.push(this.fb.group({
          question: [element.question],
          id: [element._id],
          answer: this.addCheckboxesSub(element),
          code: [element.code],
          type: [element.type],
          units: [element.units],
          possibleAnswers: [element?.possibleAnswers],
        }))
      } else {
        dynamicsubFormArray.push(this.fb.group({
          question: [element.question],
          id: [element._id],
          answer: [null],
          code: [element.code],
          type: [element.type],
          units: [element.units],
          possibleAnswers: [element?.possibleAnswers],
        }))
      }
    });
    console.log('dynamicFormArray', dynamicsubFormArray.value)
    return dynamicsubFormArray;


  }

  private addCheckboxesSub(element) {
    let dynamicAnsSubFormArray: FormArray = new FormArray([]);
    element?.possibleAnswers.forEach((elemen) => dynamicAnsSubFormArray.push(new FormControl(false))
    )

    return dynamicAnsSubFormArray
  }

  questionnaireForm() {

    console.log("========================>>??Q", this.questionForm.value)
    let obj = {};
    let qarray = [];


    this.questionForm.value.forEach(element => {
      element.questions.forEach(quest => {
        let { id, answer } = quest;
        qarray.push({ question: id, answer, patient: this.patientdetailsdata._id });
        quest.subquestions.forEach(subquest => {
          let { id, answer } = subquest;
          qarray.push({ question: id, answer, patient: this.patientdetailsdata._id });
        });
      });
    });

    console.log("====================>>>>payload", qarray)
    let answrd = qarray.filter(element => {
      return element.answer != null;
    });
    let array = []
    for (let i = 0; i < answrd.length; i++) {

      // const element = array[i];.toString()
      array.push({ question: answrd[i].question, answer: answrd[i].answer.toString(), patient: answrd[i].patient })
    }
    console.log("====================>>>>payload", array, answrd, this.questionForm.value)

    this.healthService.adduserQuestionnaire({ questions: array }).subscribe(res => {
      Swal.fire({
        title: 'WelCome!',
        text: res.message,
        icon: 'success',
        confirmButtonText: 'ok',
        allowEscapeKey: false,
        allowOutsideClick: false
      })
    })
  }

  addFormFields() {
    // console.log("=============form fields", this.myForm, this.questionariesDetails)
    this.healthService.getQuestionarieByPid(this.patientdetailsdata._id).subscribe(res => {
      // console.log("questionarie by pid", res);
      let fields = res.data.filter(el => el.questions);
      fields.forEach(element => {
        this.questionForm.value.forEach((que, formIndex) => {
          if (element.name == que.name) {
            element.questions.forEach((arr, answerInd) => {
              console.log("patching", arr, answerInd)
              que.questions.forEach((quearr, index) => {
                if (arr.question == quearr.question) {
                  let formarr = this.questionForm.controls[formIndex].get('questions') as FormArray;

                  if (element.questions[answerInd].answer != null) {
                    if (arr.type === 'checkbox') {
                      const optionsanswer = element.questions[answerInd].answer?.answer
                      const array = []
                      var str = optionsanswer
                      var arrSplit = str.split(",");
                      let answerform = formarr.controls[index].get('answer') as FormArray;
                      for (let i = 0; i < arrSplit.length; i++) {
                        array.push(Boolean(JSON.parse(arrSplit[i])));
                        console.log('add', array)
                      }
                      let answersValues = array;

                      answersValues.forEach((anselement, ansValIndex) => {

                        console.log("========================>>>>???", anselement)
                        answerform.controls[ansValIndex].setValue(anselement);
                      });
                    } else {
                      formarr.controls[index].get('answer').setValue(element.questions[answerInd].answer?.answer);

                    }
                  }
                  let subQuestions = formarr.controls[index].get('subquestions') as FormArray;
                  let subquestionValues = element.questions[answerInd].subQuestions;
                  subquestionValues.forEach((subelement, subIndex) => {
                    subQuestions.value.forEach((subVal, subValIndex) => {
                      if (subelement.question == subVal.question) {
                        // console.log("========================>>>>???",subelement)
                        if (subelement.answer != null) {
                          if (subelement?.type === 'checkbox') {
                            const subOptionsanswer = subelement?.answer?.answer
                            const array = []
                            var str = subOptionsanswer
                            var subArrSplit = str.split(",");
                            let subAnswerform = subQuestions.controls[subValIndex].get('answer') as FormArray;
                            for (let i = 0; i < subArrSplit.length; i++) {
                              array.push(Boolean(JSON.parse(subArrSplit[i])));
                              console.log('add', array)
                            }
                            let subAnswersValues = array;

                            subAnswersValues.forEach((anselement, ansValIndex) => {

                              console.log("========================>>>>???", anselement)
                              subAnswerform.controls[ansValIndex].setValue(anselement);
                            });
                          } else {
                            // console.log("========================>>>>???",subQuestions.controls[subValIndex])
                            subQuestions.controls[subValIndex].get('answer').setValue(subelement.answer.answer);
                          }
                        }
                      }
                    });
                  });

                }
              });
            });
          }

        });
      });
    })
  }
  questionForm: FormArray;
  getQuestionaries() {
    this.questionForm = new FormArray([]);
    this.healthService.getQuestionary().subscribe(res => {
      console.log("====================questionaries data", res.data);
      this.questionariesDetails = res.data
      let questions = res.data;
      let questionsData = questions.filter(el => el.questions && el.questions.length > 0);
      if (questionsData.length != this.questionForm.controls.length) {
        questionsData.forEach(element => {
          let grp: FormGroup = new FormGroup({
            name: new FormControl(element.name),
            questions: this.BuildFormDynamic(element)
          });
          this.questionForm.push(grp);
        });
      }
      console.log("================questions data ====>", questionsData);
      console.log("===============>>>>final form", this.questionForm)
    })
  }

  // clearFields(){
  //   this.questionForm.value.forEach((element,index) => {
  //     element.questions.forEach(question => {
  //       if(question.answer != null){
  //         let parent = this.questionForm.controls[index].get('questions') as FormArray;

  //       }
  //     });
  //   });
  // }

  UploadFiles(event) {
    console.log("", event, event.target?.files)
    for (let i = 0; i < event.target?.files.length; i++) {
      this.uploadFilesData.push(event.target.files[i])

    }
    //  this.uploadFilesData = event.target.files
    console.log("", this.uploadFilesData)

  }
  submitUploadFiles() {
    const formData = new FormData();
    this.uploadFilesData.forEach(element => {
      formData.append("files", element)
    });
    console.log("fo", formData)
    this.healthService.addpatientsDocumentsBypid(this.patientdetailsdata._id, formData).subscribe(res => {
      console.log("res", res)
      this.file = null
      this.uploadFilesData = []
      this.getUploadFile()
    })
  }
  viewImage(item) {
    this.imageView = item.attachment
  }
  checkedData = []
  onchangeCheckBox(event, inf) {
    if (event?.checked == true) {
      // this.checkedData.push(event.source?.value)

      // (<FormArray>this.questionForm.get('answer')).push( this.rulesFormArray(event.source?.value));
    } else {
      (<FormArray>this.questionForm.get('answer')).removeAt(inf);
      // this.checkedData = this.checkedData.filter(res=>res !== event.source?.value)
    }
  }

  checkIfNumber(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/) || this.patientRegistrationForm.value.mobileNumber.length == 10)
      e.preventDefault();
  }
  printBarCodeLabel() {
    var printContents = document.getElementById('print-barcode').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
}
