import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  table: any = 'collection';


  pendingTests: any;
  collectedTests: any;
  receivedTests: any;
  checkedPendingIds = [];

  //pagination and api integration starts from here
  pendinglength = 100;
  collectedlength=100;
  receivedlength= 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  pendingpageEvent : PageEvent;
  collectedpageEvent : PageEvent;
  receivedpageEvent : PageEvent;
  pendingisDefault: boolean = true;
  collectedisDefault: boolean = true;
  receivedisDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  status: any;
  statusflag: boolean;
  //pagination code ends here

  constructor(private healthService: HealthService) { }

  ngOnInit(): void {
    this.getCollections('pending');
    this.getCollections('collected');
    this.getCollections('received');
  }

  tableType(type: String) {
    this.table = type;
  }



  //Api Integration Starts from here
  onPageEventPending(event,status) {
    this.pendingisDefault = false;
    this.pendingpageEvent = event;
    this.getCollections(status)
  }
  onPageEventCollected(event,status){
    this.collectedisDefault = false;
    this.collectedpageEvent = event;
    this.getCollections(status)
  }
  onPageEventReceived(event,status){
    this.receivedisDefault = false;
    this.receivedpageEvent = event;
    this.getCollections(status)

  }

  getCollections(status){
  if(status === 'pending'){
    var formData = PaginationUtility.getGridFilters(this.pendingisDefault, this.pendingpageEvent)
  }else if(status === 'collected'){
    var formData = PaginationUtility.getGridFilters(this.collectedisDefault, this.collectedpageEvent)
  }else if(status === 'received'){
    var formData = PaginationUtility.getGridFilters(this.receivedisDefault, this.receivedpageEvent)
  }
    
    formData['status'] = status
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getCollectionsDetails(formData)
  
  }

  getCollectionsDetails(formData){
    
    this.healthService.getCollections(formData).subscribe((res) => {
      console.log("get collections resp", res);
      if (res.statusCode == 200) {
        if (formData.status == 'pending') {
          this.pendingTests = res.data.patientTests;
          this.pendinglength = res.data.total_count
        } else if (formData.status == 'collected') {
          this.collectedTests = res.data.patientTests;
          this.collectedlength = res.data.total_count
        } else if (formData.status == 'received') {
          this.receivedTests = res.data.patientTests;
          this.receivedlength = res.data.total_count
        }
      }
      
    })
  }
  public  sortEvent(status,event): void{
    console.log("event",event,this.sortDirection)
    if(this.sortvalue === event || this.status === status){
      this.status = status
      this.sortDirection = this.sortDirection === 'ASC' ? 'DASC' : 'ASC';
    }else{
      this.status = status
      this.sortDirection = 'ASC'
    }
    console.log("sirtdirction",this.sortDirection)
    this.sortvalue = event
    if(status === 'pending'){
      var formData = PaginationUtility.getGridFilters(this.pendingisDefault, this.pendingpageEvent)
    }else if(status === 'collected'){
      var formData = PaginationUtility.getGridFilters(this.collectedisDefault, this.collectedpageEvent)
    }else if(status === 'received'){
      var formData = PaginationUtility.getGridFilters(this.receivedisDefault, this.receivedpageEvent)
    }
    formData["status"] = status

    formData["sortBy"] = this.sortvalue
    formData["sortOrder"] = this.sortDirection
    this.getCollectionsDetails(formData)
  }

  toggle(item, e) {
    let id = item._id;
    if (e.checked == true) {
      this.checkedPendingIds.push(id);
    } else if (e.checked == false) {
      this.checkedPendingIds = this.checkedPendingIds.filter((id) => {
        return id != item._id;
      })
    }
    console.log("this.checkedPendingIds", this.checkedPendingIds);
  }

  public pendingToCollected(): void {
    let req = {
      tests: this.checkedPendingIds
    }
    this.healthService.moveToSamplesCollectd(req).subscribe((resp) => {
      console.log("pendingToCollected resp", resp);
      if (resp.statusCode == 200) {
        Swal.fire({
          icon: 'success',
          title: `${resp.message}`
        }).then((res) => {
          if (res.isConfirmed) {
            this.getCollections('pending');
            this.getCollections('collected');
            this.getCollections('received');
            this.checkedPendingIds = [];
          }
        })
      }
    })
  }

  public collectedToReceived(): void {
    let req = {
      tests: this.checkedPendingIds
    }
    this.healthService.moveToSamplesReceived(req).subscribe((resp) => {
      console.log("pendingToCollected resp", resp);
      if (resp.statusCode == 200) {
        Swal.fire({
          icon: 'success',
          title: `${resp.message}`
        }).then((res) => {
          if (res.isConfirmed) {
            this.getCollections('received');
            this.getCollections('collected');
            this.getCollections('pending');
            this.checkedPendingIds = [];
          }
        })
      }
    })
  }

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
];