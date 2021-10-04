import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { BroadcastService } from 'src/app/service/broadcast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  toggle:Boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  constructor(private router:Router,private broadcastservice:BroadcastService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user_details'))
    // console.log("header",this.user)
    this.broadcastservice.closeSidebar.subscribe(res=>{
      if(this.toggle === true)
      this.clearToggle()
    })
  }
  logOut(){
    localStorage.removeItem('user_token')
    this.broadcastservice.loginData.emit(false)
    this.router.navigateByUrl('/session/signIn')
    localStorage.removeItem('user_details')
  }

  menuToggle(){
    this.toggle = true;
    this.messageEvent.emit();
  }

  clearToggle(){
    this.toggle = false;
    this.messageEvent.emit();
  }

}
