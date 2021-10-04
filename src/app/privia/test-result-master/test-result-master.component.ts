import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { HealthService } from './../../service/health.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdminService } from 'src/app/service/admin.service';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
@Component({
  selector: 'app-test-result-master',
  templateUrl: './test-result-master.component.html',
  styleUrls: ['./test-result-master.component.scss']
})
export class TestResultMasterComponent implements OnInit {

  options: any;
  showUploadBtnFlag: boolean = false;
  resultTypes = [
    { name: "numeric", id: 1 },
    { name: "calculated", id: 2 },
    { name: "pick-list", id: 3 },
    { name: "culture", id: 4 },
    { name: "template", id: 5 },
    { name: "heading", id: 6 },
  ]

  public Editor = ClassicEditor;
  testResultMasterForm: FormGroup;
  possibleTestResultUpdateForm: FormGroup;
  testResultRefRangesEditForm: FormGroup;
  testDetails: any;
  templateContent: void;
  showUpdateBtn: boolean = false;
  closeResult = '';
  editPossibleTestResultItem: any;
  editTestResultRefRangeItem: any;
  departments: any;


  constructor(private health: HealthService,
    private adminService: AdminService,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.getpatients();
    this.loadTestResultMasterForm()
    this.getDepartments();
  }

  getDepartments() {
    this.health.getDepartments().subscribe(res => {
      this.departments = res.data.departments
      console.log("departments", this.departments)
    })
  }

  loadTestResultMasterForm() {
    this.testResultMasterForm = this.fb.group({
      templateContent: [null],
      test: [null],
      subTest: [null],
      resultType: [null],
      resultUnit: [null],
      noOfDecimals: [null],
      panicLaw: [null],
      panicHigh: [null],
      noResult: [false],
      attachImage: [false],
      editReferenceRange: [false],
      printBlankPage: [false],
      separate: [false],
      referenceRange: [null],
      notes: [null],
      possibleTestResults: this.fb.array([this.loadPossibleTestResults()]),
      testResultReferenceRanges: this.fb.array([this.loadTestResultRefRanges()]),
      testResultTemplates: this.fb.array([this.loadTestResultTemplates()]),
    })
  }

  loadPossibleTestResults(): FormGroup {
    return this.fb.group({
      result: [null],
      comments: [null],
      isAbnormal: [false],
      isDefault: [false],
    })
  }

  loadTestResultRefRanges(): FormGroup {
    return this.fb.group({
      gender: ['both'],
      fromAge: [null],
      fromAgeUnit: [null],
      toAge: [null],
      toAgeUnit: [null],
      fromValue: [null],
      toValue: [null],
      refRange: [null],
      panicLow: [null],
      panicHigh: [null],
    })
  }

  loadTestResultTemplates(): FormGroup {
    return this.fb.group({
      template: [null]
    })
  }

  getActualTests(event) {
    // this.loadTestResultMasterForm()
    let value = (<HTMLInputElement>event.target).value;
    console.log("value", value)
    if (value) {
      this.health.getActualTests(value).subscribe(res => {
        this.options = res.data.tests;
        console.log("tests", res)
      });
    } else {
      this.options = [];
    }
  }

  removePossibleTestResult(index) {
    console.log("removePossibleTestResult index", index);
    (<FormArray>this.testResultMasterForm.get('possibleTestResults')).removeAt(index);
  }

  removeTestResultRefRange(index) {
    (<FormArray>this.testResultMasterForm.get('testResultReferenceRanges')).removeAt(index);
  }

  testResultMsterData(event) {
    console.log("event143", event)
    this.adminService.testResultMasterByTestID(event).subscribe(res => {
      console.log("testsMaster", res)
      if (res.data?._id != null || res.data?._id != undefined) {
        this.showUpdateBtn = true;
        console.log("if case")
      } else {
        console.log("else case")
        this.showUpdateBtn = false;
      }
      if (res?.data !== null) {

        this.testDetails = res?.data
        const data = res?.data
        // this.patchvalue(data)
        if (data.resultType === 'template') {
          this.showUploadBtnFlag = true;
        }
        this.patchFormValues();

        // this.testResultMasterForm.setControl('possibleTestResults', this.setPossibleTestResults(res?.data.possibleTestResults));
        // this.testResultMasterForm.setControl('testResultReferenceRanges', this.setTestResultRefRange(res?.data.testResultReferenceRanges));
        // this.testResultMasterForm.setControl('testResultTemplates', this.setTestResultTemplate(res?.data.testResultTemplates));
      } else {
        const testId = this.testResultMasterForm.value.test
        this.loadTestResultMasterForm()
        this.showUploadBtnFlag = false;
        this.testDetails = {}
        this.testResultMasterForm.patchValue({
          test: testId
        })
      }
    });
  }

  patchFormValues() {
    this.testResultMasterForm.patchValue({
      templateContent: this.testDetails.template,
      test: this.testDetails.test,
      subTest: this.testDetails.subTest,
      resultType: this.testDetails.resultType,
      resultUnit: this.testDetails.resultUnit,
      noOfDecimals: this.testDetails.noOfDecimals,
      panicLaw: this.testDetails.panicLaw,
      panicHigh: this.testDetails.panicHigh,
      noResult: this.testDetails.noResult,
      attachImage: this.testDetails.attachImage,
      editReferenceRange: this.testDetails.editReferenceRange,
      printBlankPage: this.testDetails.printBlankPage,
      separate: this.testDetails.separate,
      referenceRange: this.testDetails.referenceRange,
      notes: this.testDetails.notes,
    })
  }

  setPossibleTestResults(possibleTestResults): FormArray {
    console.log("setPossibleTestResults", possibleTestResults);
    const formArray = new FormArray([]);
    possibleTestResults.forEach(element => {
      formArray.push(this.fb.group({
        result: element.result,
        comments: element.comments,
        isAbnormal: element.isAbnormal,
        isDefault: element.isDefault,
      }))
    });
    return formArray;
  }

  setTestResultRefRange(testResultRefRanges): FormArray {
    const formArray = new FormArray([]);
    testResultRefRanges.forEach(element => {
      formArray.push(this.fb.group({
        gender: element.gender,
        fromAge: element.fromAge,
        fromAgeUnit: element.fromAgeUnit,
        toAge: element.toAge,
        toAgeUnit: element.toAgeUnit,
        fromValue: element.fromValue,
        toValue: element.toValue,
        refRange: element.refRange,
        panicLow: element.panicLow,
        panicHigh: element.panicHigh,
      }))
    });
    return formArray;
  }

  setTestResultTemplate(testResultTemplate): FormArray {
    const formArray = new FormArray([]);
    testResultTemplate.forEach(element => {
      formArray.push(this.fb.group({
        templateContent: element.template
      }))
    });
    return formArray;
  }

  showUpload(e) {
    console.log("event123", e.value)
    if (e.value == 'template') {
      this.showUploadBtnFlag = true;
    } else {
      this.showUploadBtnFlag = false;
    }
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      const fileName = event.target.files[i].name.split('.')
      let check = fileName.filter(item => {
        return item.toUpperCase() === 'DOCX' || item.toUpperCase() === 'DOC';
      })
      if (check.length == 0) {
        Swal.fire({
          icon: 'warning',
          title: "File Should be in DOCX or DOC format",
        })
      } else {

      }
    }
  }

  possibleTestResult() {
    let testResult = this.testResultMasterForm.get('possibleTestResults') as FormArray;
    testResult.push(new FormGroup({
      result: new FormControl(null),
      comments: new FormControl(null),
      isAbnormal: new FormControl(false),
      isDefault: new FormControl(false)
    }))
  }

  getPossibleFormArray() {
    return (this.testResultMasterForm.get('possibleTestResults') as FormArray).controls;
  }

  referenceRange() {
    let refRange = this.testResultMasterForm.get('testResultReferenceRanges') as FormArray;
    refRange.push(new FormGroup({
      gender: new FormControl('both'),
      fromAge: new FormControl(null),
      fromAgeUnit: new FormControl(null),
      toAge: new FormControl(null),
      toAgeUnit: new FormControl(null),
      fromValue: new FormControl(null),
      toValue: new FormControl(null),
      refRange: new FormControl(null),
      panicLow: new FormControl(null),
      panicHigh: new FormControl(null)
    }))
  }

  getRefRange() {
    return (this.testResultMasterForm.get('testResultReferenceRanges') as FormArray).controls;
  }

  resultTemplate() {
    let resTemplate = this.testResultMasterForm.get('testResultTemplates') as FormArray;
    resTemplate.push(new FormGroup({
      template: new FormControl(null)
    }))
  }

  getRefTemplate() {
    return (this.testResultMasterForm.get('testResultTemplates') as FormArray).controls;
  }

  submit() {
    console.log("templateContent", this.testResultMasterForm.value);
    console.log("getPossibleFormArray", this.getPossibleFormArray());
    let l1 = this.testDetails?.possibleTestResults.length;
    let l2 = this.testResultMasterForm.value.possibleTestResults.length;
    const diff = Math.abs(l1 - l2);
    const lastPossibleTestResults = this.testResultMasterForm.value.possibleTestResults.slice(Math.max(l2 - diff, 0));
    let l3 = this.testDetails?.testResultReferenceRanges.length;
    let l4 = this.testResultMasterForm.value.testResultReferenceRanges.length;
    const diff1 = Math.abs(l3 - l4);
    const lastTestResultRefRanges = this.testResultMasterForm.value.testResultReferenceRanges.slice(Math.max(l4 - diff1, 0));
    let formData = {
      // test: this.testResultMasterForm.value.test,
      test: this.testResultMasterForm.value.test,
      subTest: this.testResultMasterForm.value.subTest,
      resultType: this.testResultMasterForm.value.resultType,
      resultUnit: this.testResultMasterForm.value.resultUnit,
      noOfDecimals: this.testResultMasterForm.value.noOfDecimals,
      panicLaw: this.testResultMasterForm.value.panicLaw,
      panicHigh: this.testResultMasterForm.value.panicHigh,
      noResult: this.testResultMasterForm.value.noResult,
      attachImage: this.testResultMasterForm.value.attachImage,
      editReferenceRange: this.testResultMasterForm.value.editReferenceRange,
      printBlankPage: this.testResultMasterForm.value.printBlankPage,
      separate: this.testResultMasterForm.value.separate,
      referenceRange: this.testResultMasterForm.value.referenceRange,
      notes: this.testResultMasterForm.value.notes,
      possibleTestResults: lastPossibleTestResults,
      testResultReferenceRanges: lastTestResultRefRanges,
      testResultTemplates: this.testResultMasterForm.value.testResultTemplates,
    }
    if (this.testResultMasterForm.value.resultType === 'templete') {
      formData['template'] = this.testResultMasterForm.value.templateContent
    }
    console.log("req123", formData);
    // this.testResultMasterForm.reset()
    // this.loadTestResultMasterForm()
    console.log("..", this.testResultMasterForm.value)
    this.health.saveTestMaster(formData).subscribe(res => {
      console.log("=================>>??", res);
      if (res.statusCode === 200) {
        Swal.fire({
          title: 'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
        }).then(result => {
        })
      }
    })
  }

  changeEditorContent({ editor }: ChangeEvent) {
    const data = editor.getData();
    console.log("editor data", data)
  }

  updateTestResultSettings() {
    let id = this.testDetails._id;
    let req = {
      resultType: this.testResultMasterForm.value.resultType,
      template: this.testResultMasterForm.value.templateContent,
      resultUnit: this.testResultMasterForm.value.resultUnit,
      noOfDecimals: this.testResultMasterForm.value.noOfDecimals,
      panicLaw: this.testResultMasterForm.value.panicLaw,
      panicHigh: this.testResultMasterForm.value.panicHigh,
      noResult: this.testResultMasterForm.value.noResult,
      attachImage: this.testResultMasterForm.value.attachImage,
      editReferenceRange: this.testResultMasterForm.value.editReferenceRange,
      printBlankPage: this.testResultMasterForm.value.printBlankPage,
      separate: this.testResultMasterForm.value.separate,
      referenceRange: this.testResultMasterForm.value.referenceRange,
      notes: this.testResultMasterForm.value.notes,
      // possibleTestResults: this.testResultMasterForm.value.possibleTestResults,
      // testResultReferenceRanges: this.testResultMasterForm.value.testResultReferenceRanges,
      // testResultTemplates: this.testResultMasterForm.value.testResultTemplates
    }
    console.log("updateData req", req)
    this.health.updateTestResultMaster(id, req).subscribe((resp) => {
      console.log("updateTestResultMaster resp", resp);
      if (resp.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: `${resp.message}`
        }).then((result) => {
          if (result.isConfirmed) {
            this.getResultsByID();
          }
        })
      }
    })
  }

  editPossibleTestResult(content, item) {
    console.log("editPossibleTestResult item", item);
    this.editPossibleTestResultItem = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.loadPossibleTestResultEditForm(item);
  }

  loadPossibleTestResultEditForm(item) {
    this.possibleTestResultUpdateForm = this.fb.group({
      editPossibleTestResult: item.result,
      editComments: item.comments,
      editIsAbnormal: item.isAbnormal,
      editIsDefault: item.isDefault
    })
  }


  editTestResultRefRange(content1, item) {
    console.log("editTestResultRefRange item", item);
    this.editTestResultRefRangeItem = item;
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.loadRefRangesEditForm(item);
  }

  loadRefRangesEditForm(item) {
    console.log("testResultRefRangesEditForm", item)
    this.testResultRefRangesEditForm = this.fb.group({
      editGender: [null],
      editFromAge: [null],
      editFromAgeUnit: [null],
      editToAge: [null],
      editToAgeUnit: [null],
      editFromValue: [null],
      editToValue: [null],
      editRefRange: [null],
      editPanicLow: [null],
      editPanicHigh: [null],
    })
    if (item != null || item != undefined) {
      this.possiblePatchValues(item);
    }
  }

  possiblePatchValues(item) {
    this.testResultRefRangesEditForm.patchValue({
      editGender: item.gender,
      editFromAge: item.fromAge,
      editFromAgeUnit: item.fromAgeUnit,
      editToAge: item.toAge,
      editToAgeUnit: item.toAgeUnit,
      editFromValue: item.fromValue,
      editToValue: item.toValue,
      editRefRange: item.refRange,
      editPanicLow: item.panicLow,
      editPanicHigh: item.panicHigh,
    })
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

  addPossibleTestResults() {
    let id = this.testDetails._id;
    let req = {
      possibleTestResults: this.testResultMasterForm.value.possibleTestResults,
    }
    this.health.addNewPossibleTestResult(id, req).subscribe((resp) => {
      console.log("addNewPossibleTestResult resp", resp);
      if (resp.statusCode == 200) {
        Swal.fire({
          icon: 'success',
          title: `${resp.message}`
        }).then((res) => {
          if (res.isConfirmed) {
            const arr = <FormArray>this.testResultMasterForm.controls.possibleTestResults;
            arr.controls = [];
            this.possibleTestResult()
            
            this.getResultsByID();
          }
        })
      }
    })
  }

  addTestResultRefRanges() {
    let id = this.testDetails._id;
    let req = {
      testResultReferenceRange: this.testResultMasterForm.value.testResultReferenceRanges,
    }
    this.health.addNewRefRange(id, req).subscribe((resp) => {
      console.log("addNewPossibleTestResult resp", resp);
      if (resp.statusCode == 200) {
        Swal.fire({
          icon: 'success',
          title: `${resp.message}`
        }).then((res) => {
          if (res.isConfirmed) {
            const arr = <FormArray>this.testResultMasterForm.controls.testResultReferenceRanges;
            arr.controls = [];
            this.referenceRange()
            this.getResultsByID();
          }
        })
      }
    })
  }

  updatePossibleTestResults() {
    let id = this.editPossibleTestResultItem._id;
    console.log("123", this.editPossibleTestResultItem)
    let req = {
      // possibleTestResults: this.testResultMasterForm.value.possibleTestResults,
      result: this.possibleTestResultUpdateForm.value.editPossibleTestResult,
      comments: this.possibleTestResultUpdateForm.value.editComments,
      isAbnormal: this.possibleTestResultUpdateForm.value.editIsAbnormal,
      isDefault: this.possibleTestResultUpdateForm.value.editIsDefault
    }
    this.health.updatePossibleTestResults(id, req).subscribe((resp) => {
      console.log("updatePossibleTestResults resp", resp);
      Swal.fire({
        icon: "success",
        title: `${resp.message}`
      }).then((result) => {
        if (result.isConfirmed) {
          // this.getDismissReason('Cross click');
          this.modalService.dismissAll();
          this.getResultsByID();
        }
      })
    })
  }

  updateTestResultRefRanges() {
    let id = this.editTestResultRefRangeItem._id;
    let req = {
      // testResultReferenceRanges: this.testResultMasterForm.value.testResultReferenceRanges,
      gender: this.testResultRefRangesEditForm.value.editGender,
      fromAge: this.testResultRefRangesEditForm.value.editFromAge,
      fromAgeUnit: this.testResultRefRangesEditForm.value.editFromAgeUnit,
      toAge: this.testResultRefRangesEditForm.value.editToAge,
      toAgeUnit: this.testResultRefRangesEditForm.value.editToAgeUnit,
      fromValue: this.testResultRefRangesEditForm.value.editFromValue,
      toValue: this.testResultRefRangesEditForm.value.editToValue,
      refRange: this.testResultRefRangesEditForm.value.editRefRange,
      panicLow: this.testResultRefRangesEditForm.value.editPanicLow,
      panicHigh: this.testResultRefRangesEditForm.value.editPanicHigh,
    }
    this.health.updateRefRanges(id, req).subscribe((resp) => {
      console.log("updatePossibleTestResults resp", resp);
      Swal.fire({
        icon: "success",
        title: `${resp.message}`
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalService.dismissAll();
          this.getResultsByID();
        }
      })
    })
  }

  deletePossibleTestResult(item) {
    Swal.fire({
      icon: 'info',
      title: "Are you sure want to delete?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: 'Yes'
    }).then((res) => {
      if (res.isConfirmed) {
        this.health.deletePossibleTestResults(item._id).subscribe((resp) => {
          console.log("deletePossibleTestResults resp", resp);
          if (resp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              title: `${resp.message}`
            }).then((result) => {
              if (result.isConfirmed) {
                this.getResultsByID();
              }
            })
          }
        })
      }
    })
  }

  deleteTestResultRefRange(item) {
    Swal.fire({
      icon: 'info',
      title: "Are you sure want to delete?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: 'Yes'
    }).then((res) => {
      if (res.isConfirmed) {
        this.health.deleteRefRanges(item._id).subscribe((resp) => {
          console.log("deleteTestResultRefRange resp", resp);
          if (resp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              title: `${resp.message}`
            }).then((result) => {
              if (result.isConfirmed) {
                this.getResultsByID();
              }
            })
          }
        })
      }
    })
  }

  getResultsByID() {
    let id = this.testDetails._id;
    this.health.getTestResultMasterDetailsByID(id).subscribe((res) => {
      console.log("getTestResultMasterDetailsByID resp", res);
      this.testDetails = res.data;
      this.patchFormValues();
    })
  }
}
