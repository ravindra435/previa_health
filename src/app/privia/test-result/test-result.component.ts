import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HealthService } from 'src/app/service/health.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTestResultComponent } from './add-test-result/add-test-result.component';
import { NgxPrinterService } from 'ngx-printer';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {
  displayedColumns: string[] = ['select', 'test', 'Result/Remarks', 'flag', 'unit', 'Reference Range', 'comments','Updated Time', 'option'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  obj: any = {};
  options: any;
  search = new FormControl('');
  patientDetailsData: any;
  testDetails: any;
  TestReportDetails: any;
  age: number;
  editTemplateFlag: boolean = false;
  public Editor = ClassicEditor;
  currentItem: any;
  templateViewContent: any;
  globalTemplate: string;
  ngAfterViewInit() {
  }
  p_id: any;
  closeResult = '';
  docViweEditorFlag: boolean = false;
  public isDisabled = true;
  doc = "https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc";
  constructor(public health: HealthService, public dialog: MatDialog,
    private printerService: NgxPrinterService, private cdf: ChangeDetectorRef, private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  open(content, item) {
    this.currentItem = item;
    this.editTemplateFlag = false;
    this.isDisabled = true;
    console.log("this.currentItem", this.currentItem);
    if (this.currentItem?.value != null || this.currentItem?.value != undefined) {
      // if (this.globalTemplate != null || this.globalTemplate != undefined) {
      //   this.templateViewContent = this.globalTemplate;
      // } else {
        this.templateViewContent = this.currentItem?.value;
      // }
    } else {
      // if (this.globalTemplate != null || this.globalTemplate != undefined) {
        // this.templateViewContent = this.globalTemplate;
      // } else {
        this.templateViewContent = this.currentItem?.testResult?.template
      // }
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  toggleDisabled() {
    this.editTemplateFlag = !this.editTemplateFlag;
    this.isDisabled = !this.isDisabled
    console.log("this.isDisabled",this.isDisabled)
    if(this.isDisabled === true) {
      this.globalTemplate = null;
    }
  }

  public changedTemplateContent({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.globalTemplate = data;
    console.log(data);
  }

  saveTemplateEditData(reason) {
    this.modalService.dismissAll();
    this.templateViewContent = this.globalTemplate;
    
    let req = {
      tests: [
        {
          test: this.currentItem._id,
          value: this.templateViewContent,
        }
      ]
    }
    this.health.updatePatientTestByPid(req).subscribe((res) => {
      console.log("test update resp",res);
      if (res.statusCode === 200) {
        Swal.fire({
          title: 'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
        }).then(result => {
          this.globalTemplate = null;
          this.health.getPatientsbyPId(this.search.value).subscribe(res => {
            if (res.statusCode === 200) {
              this.testDetails = res.data.tests.filter(res => { return res.status === 'received' || res.status === 'completed' })
              this.dataSource = new MatTableDataSource<any>(this.testDetails);
              this.dataSource.paginator = this.paginator;
            }
          })
        })
      }
    })
  }

  crossClick() {
    this.modalService.dismissAll();
    this.globalTemplate = null;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.globalTemplate = null;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.globalTemplate = null;
    console.log("backdrop")
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  editDocView() {
    this.docViweEditorFlag = true;
  }

  submit() {
    this.health.getPatientsbyPId(this.search.value).subscribe(res => {
      if (res.statusCode === 200) {
        Swal.fire({
          title: 'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
        }).then(result => {
          this.testDetails = res.data.tests.filter(res => { return res.status === 'received' || res.status === 'completed' })
          console.log("testdetails", this.testDetails)
          this.dataSource = new MatTableDataSource<any>(this.testDetails);
          this.dataSource.paginator = this.paginator;
        })

      }


    })
  }

  update(el: any) {
    console.log("element123", el)
    this.obj.test = el._id;
    if (this.globalTemplate != null || this.globalTemplate != undefined) {
      this.obj.value = this.globalTemplate;
    } else if (this.globalTemplate == null || this.globalTemplate == undefined) {
      this.obj.value = el.value;
    }

    this.obj.comment = el.comment;
    let req = {
      tests: [this.obj]
    }
    console.log("req", req)
    this.health.updatePatientTestByPid(req).subscribe(res => {
      console.log("==================>>>updated", res)
      if (res.statusCode === 200) {
        Swal.fire({
          title: 'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
        }).then(result => {
          this.globalTemplate = null;
          this.health.getPatientsbyPId(this.search.value).subscribe(res => {
            if (res.statusCode === 200) {
              this.testDetails = res.data.tests.filter(res => { return res.status === 'received' || res.status === 'completed' })
              this.dataSource = new MatTableDataSource<any>(this.testDetails);
              this.dataSource.paginator = this.paginator;
            }
          })
        })
      }
    })
  }

  getpatients(event) {
    let value = (<HTMLInputElement>event.target).value;
    console.log("value", value)
    if (value) {
      this.health.getPatientsDataBySearch(value).subscribe(res => {
        this.options = res.data.patients
      }
      )
    } else {
      this.options = []
    }

  }

  onFileChange(event) {
    this.health.getPatientsbyPId(event).subscribe(res => {
      this.patientDetailsData = res.data
      console.log("===============res", res);

    })

  }

  // addBulkPatients():void{
  //   console.log("======================")
  //   const dialogRef = this.dialog.open(AddTestResultComponent, {
  //     width: '250px',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  uploadResults() {
    console.log("================results")
    const dialogRef = this.dialog.open(AddTestResultComponent, {
      width: '30rem',
      data: {}
    });
  }
  printReport(testreport) {
    this.TestReportDetails = testreport;
    if (this.TestReportDetails?.value != null || this.TestReportDetails?.value != undefined) {
      console.log("if caseeeeeee")
      this.templateViewContent = this.TestReportDetails?.value;
    } else {
      console.log("else caseeeeeee")
      this.templateViewContent = this.TestReportDetails?.testResult?.template
    }
    this.cdf.detectChanges()
    console.log("..", this.TestReportDetails)
    this.printerService.printByClassName('printReport')
  }
  calculate(date) {

    var timeDiff = Math.abs(Date.now() - new Date(date).getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    // console.log("date", event, this.age)
    // return Math.abs(age.getUTCFullYear() - 1970);
    return age

  }


}




