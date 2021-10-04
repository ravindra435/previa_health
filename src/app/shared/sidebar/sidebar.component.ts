import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  urls =[
    
  ]

  constructor(private router:Router) { }

  ngOnInit(): void {
   const user = JSON.parse(localStorage.getItem("user_details"))
   console.log("user",user)
   if(user.role === "super-admin"){
     this.urls.push(
       {name:"super-admin/company",value:"company",icon:"fa fa-list"},
       {name:"super-admin/admin",value:"Admin",icon:"fa fa-list"},
     )
   }else if(user.role === "labl"){
     this.urls.push(
    {name:"privia/dashboard",value:"Dasboard",icon:"fa fa-th-large"},
    {name:"privia/appoinments",value:"Appoinments",icon:"fa fa-th-list"},
    {name:"privia/departments",value:"Departments",icon:"fa fa-list"},
    {name:"privia/patients",value:"Patients",icon:"fa fa-male"},
    {name:"privia/payments",value:"Payments",icon:"fa fa-cc-mastercard"},
    {name:"privia/branch",value:"branch",icon:"fa fa-bandcamp"},
    // {name:"privia/testMaster",value:"test Master",icon:"fa fa-list"},
    // {name:"privia/testresultMaster",value:"test result master",icon:"fa fa-list"},
    {name:"privia/schemeMaster",value:"scheme Master",icon:"fa fa-superpowers"},
    {name:"privia/price",value:"price",icon:"fa fa-money"},
    // {name:"privia/test-result",value:"Test Result",icon:"fa fa-list"},
    {name:"privia/pehle-botomy",value:"Pehle Botomy",icon:"fa fa-list"},
    {name:"privia/reciept",value:"Reciept",icon:"fa fa-sticky-note-o"},
    // {name:"privia/depart-master",value:"Depart master",icon:"fa fa-list"},
     )
   }else if(user.role === "admin"){
     this.urls.push(
      {name:"admin/hospital",value:"Hospital",icon:"fa fa-hospital-o"},
      {name:"admin/location",value:"Location",icon:"fa fa-location-arrow"},
      {name:"admin/branch",value:"Branch",icon:"fa fa-bandcamp"},
      {name:"admin/laboratory",value:"Laboratory",icon:"fa fa-flask"},
      {name:"admin/frontOffice",value:"Front Office",icon:"fa fa-briefcase"},
      {name:"admin/lab",value:"Lab",icon:"fa fa-flask"},
      {name:"admin/labIncharge",value:"Lab Incharge",icon:"fa fa-flask"},
      {name:"admin/labTechnician",value:"Lab Technician",icon:"fa fa-flask"},
      {name:"admin/doctors",value:"Doctor",icon:"fa fa-user-md"},
      {name:"admin/doctor-master",value:"Doctor-Master",icon:"fa fa-asterisk"},
      {name:"admin/management",value:"Management",icon:"fa fa-users"},
      {name:"admin/manager",value:"Manager",icon:"fa fa-id-badge"},
      {name:"admin/patient",value:"Patient",icon:"fa fa-male"},
      {name:"admin/patientList",value:"Patient List",icon:"fa fa-list"},
      {name:"admin/question",value:"Question",icon:"fa fa-question"},
      {name:"admin/test-result",value:"Test Result",icon:"fa fa-list"},
      {name:"admin/testMaster",value:"test Master",icon:"fa fa-superpowers"},
      {name:"admin/testMasterList",value:"Test Master List",icon:"fa fa-users"},
      {name:"admin/testResultMaster",value:"test result master",icon:"fa fa-asterisk"},
      {name:"admin/testPackages",value:"Test Packages",icon:"fa fa-asterisk"},
      {name:"privia/depart-master",value:"Depart master",icon:"fa fa-asterisk"},
      {name:"admin/collection",value:"Collection",icon:"fa fa-asterisk"},
      {name:"admin/technician",value:"Technician",icon:"fa fa-asterisk"},
      {name:"admin/technicianList",value:"Technician List",icon:"fa fa-asterisk"},
     )
   }else if(user.role === "front-office"){
    this.urls.push(
      {name:"admin/patient",value:"Patient Regi",icon:"fa fa-th-large"},
      {name:"privia/patients",value:"Patients List",icon:"fa fa-list"},
      {name:"privia/technicianAssign",value:"Technician Assign",icon:"fa fa-list"},

      // {name:"admin/test-result",value:"Test Result",icon:"fa fa-list"},
      
      // {name:"admin/question",value:"Question",icon:"fa fa-th-large"},
    )}else if(user.role === "lab" || user.role === "lab-incharge" || user.role === "lab-technician" ){
      this.urls.push(
        {name:"admin/test-result",value:"Test Result",icon:"fa fa-list"},
        {name:"admin/collection",value:"Collection",icon:"fa fa-list"},
      )}


  }
  navigateRoute(routeName){
  
      this.router.navigateByUrl(`/${routeName}`)

  }

}
