import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { PaginationUtility } from 'src/app/shared/pagination/pagination-utility';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.scss']
})
export class TechnicianListComponent implements OnInit {
  technicianListData: any
  action: string;
  userrole: string;
  selectedTechnician:any
  //pagination and api integration starts from here
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageEvent: PageEvent;
  isDefault: boolean = true;
  sortDirection: string;
  sortvalue: any;
  //pagination code ends here
  constructor(private router: Router, private service:AdminService) { }




  

  public editTechnician(Technician): void {
    this.selectedTechnician = Technician;
    this.action="update";
    this.userrole = "dd-technician"
    this.addUpdateTechnician();
  }

  public addTechnician():void{
    this.action="add";
    this.userrole = "dd-technician"
    this.addUpdateTechnician();
  }
  /* Add Country */
  public addUpdateTechnician(): void {
    const data ={
      action: this.action,
        role:this.userrole,
        data: this.selectedTechnician,
    }
    console.log(data);
    
    localStorage.setItem("Technician",JSON.stringify(data))

    this.router.navigateByUrl('/admin/technician')
    
  }
  
  getTechnician(formData) {
    
    this.service.technicianList(formData).subscribe((resp) => {
      if (resp.statusCode == 200) {
        this.technicianListData = resp?.['data']?.['users'];
        this.length = resp.data.total_count
        console.log(this.technicianListData, 'technicianListData');
      }
    })
  }
  ngOnInit(): void {
    this. getTech();
   
  }
  onPageEvent(event) {
    this.isDefault = false;
    this.pageEvent = event;
    this.getTech()
    console.log("page",this.pageEvent?.pageIndex,this.pageEvent?.pageSize)
  }
 
  getTech(){
 
    
    let formData = PaginationUtility.getGridFilters(this.isDefault, this.pageEvent)
    
    formData['role'] = "dd-technician"
    if(this.sortvalue){
      formData["sortBy"] = this.sortvalue
      formData["sortOrder"] = this.sortDirection
    }
    this.getTechnician(formData)
  
  }

  deleteLaboratory(item){

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
        this.service.deleteTechnician(item._id).subscribe((res)=>{
          this.getTech()
          Swal.fire(
            'Deleted!',
            'Technician Has Been Deleted successfully.',
            'success'
          )
        })
      }})

  }  


}
