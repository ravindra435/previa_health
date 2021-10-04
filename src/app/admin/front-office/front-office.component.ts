import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { HealthService } from 'src/app/service/health.service';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
import { AddFrontOfficeComponent } from '../dailog-componrnts/add-front-office/add-front-office.component';

@Component({
  selector: 'app-front-office',
  templateUrl: './front-office.component.html',
  styleUrls: ['./front-office.component.scss']
})
export class FrontOfficeComponent implements OnInit {

  selectedFrontOffice: any;
  action: string;
  user: any;
  userrole: string;
  frontOfficeDetails:any;

    //pagination and api integration starts from here
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 50, 100];
    pageEvent: PageEvent;
    isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
    //pagination code ends here
 
    
  

  constructor(private dialog: MatDialog,private healthservice:HealthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user_details"))
    this.getFrontOffice()
  }

  //Api Integration Starts from here
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getFrontOffice()
    console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
  }

  getFrontOffice(){
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData['role'] = "front-office"
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.GetFrontOffice(formData)
  
  }

  GetFrontOffice(formData){
    this.healthservice.getAdmin(formData).subscribe((res)=>{
      console.log("frontOfficeDetails",res)
      this.frontOfficeDetails = res.data.users
      this.length = res.data.total_count
    })
  }




  public editFrontOffice(FrontOffice): void {
    this.selectedFrontOffice = FrontOffice;
    this.action="update";
    this.userrole = "front-office"
    this.addUpdateFrontOffice();
  }

  public addFrontOffice():void{
    this.action="add";
    this.userrole = "front-office"
    this.addUpdateFrontOffice();
  }
  /* Add Country */
  public addUpdateFrontOffice(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.width = "450px"),
      (dialogConfig.data = {
        action: this.action,
        role:this.userrole,
        data: this.selectedFrontOffice,
      });
    const dialogRef = this.dialog.open(
      AddFrontOfficeComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      this.getFrontOffice()
      // if (data.action === "add") {
      //   if (data.data != null) {
      //   }
      // } else {
      // }
    });
  }

  deleteFrontOffice(item){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.healthservice.deleteUser(item._id).subscribe((res)=>{
          console.log("deleteadmin",res)
          // alert("Branch Has Been Deleted successfully")
          this.getFrontOffice()
          Swal.fire(
            'Deleted!',
            'Front office Has Been Deleted successfully.',
            'success'
          )
        })
      }})

  }

  public  sortEvent(event): void{
    console.log("event",event,this.sortDirection)
   
    if(this.sortvalue === event){
      this.sortDirection = this.sortDirection === 'ASC' ? 'DASC' : 'ASC';
    }else{
      this.sortDirection = 'ASC'
    }
    console.log("sirtdirction",this.sortDirection)
    this.sortvalue = event
     
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData["sortBy"] = this.sortvalue
    formData["sortOrder"] = this.sortDirection
    formData['role'] = "front-office"
    this.GetFrontOffice(formData)
    // this.getAgentCounselors(formData)
  }


}

