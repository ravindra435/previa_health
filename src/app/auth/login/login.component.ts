import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchAll } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { BroadcastService } from 'src/app/service/broadcast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  errorMsg = '';
  return: string;
  user: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private broadcastservice: BroadcastService
  ) {

    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    if (userDetails) {
      const ROLE = userDetails?.role
      const routingUrl = ROLE == 'admin' ? '/admin/hospital' : ROLE == 'super-admin' ? 'super-admin/company' : ROLE == 'labl' ? '/privia/dashboard' : ROLE == 'front-office' ? '/admin/patient' : ['lab', 'lab-incharge', 'lab-technician'].includes(ROLE) ? '/admin/test-result' : ''
      this.router.navigateByUrl(routingUrl)
    }

  }

  ngOnInit() {
    // this.authService.user.emit("user")
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(true)
    });

  }

  ngAfterViewInit() {
    // setTimeout(() => {
    // this.autoSignIn();
    // })
  }

  ngOnDestroy() {
    // this._unsubscribeAll.next();
    // this._unsubscribeAll.complete();
  }

  signin() {
    const signinData = this.signinForm.value
    const formData = {
      "emailAddress": this.signinForm.value.username,
      "password": this.signinForm.value.password
    }

    this.progressBar.mode = 'indeterminate';
    this.authService.signIn(formData).subscribe(res => {
      console.log("ressign", res)
      localStorage.setItem("user_token", res.data.access_token)
      localStorage.setItem("user_details", JSON.stringify(res.data.user))

      if (res.statusCode == 200) {
        if (res.data.user.role === 'admin') {

          this.router.navigateByUrl('/admin/hospital')
        } else if (res.data.user.role === 'super-admin') {
          this.router.navigateByUrl('/super-admin/company')
        } else if (res.data.user.role === 'labl') {
          this.router.navigateByUrl('/privia/dashboard')
        } else if (res.data.user.role === 'front-office') {
          this.router.navigateByUrl('/admin/patient')
        } else if (res.data.user.role === 'lab' || res.data.user.role === 'lab-incharge' || res.data.user.role === 'lab-technician') {
          this.router.navigateByUrl('/admin/test-result')
        }
        this.broadcastservice.loginData.emit(true)
      } else {
        alert("Mismatch Username And Password ")
      }

    })


    // else{

    //   this.submitButton.disabled = false;
    //   this.progressBar.mode = 'determinate';
    //   // this.errorMsg = err.message;
    //   // console.log(err);
    // }
  }

}
