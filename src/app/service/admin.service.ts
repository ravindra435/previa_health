import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private http: HttpClient,private router: Router) { }
  private baseUrl: string = environment.url;
  /* add Company */
  createLabEmployees(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'user/createLabEmployees', data, { headers: headers })
        .pipe(catchError(this.handleError))
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }
  

  /* add user (frontOffice) */
  createUser(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'user/createUser', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* update user  (front office, lab , labincharge,lab-technician) */
  updateUser(id, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `user/updateUser/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  // /user/updateDoctor/{id}

  /* update updateDoctor */
  updateDoctor(id, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `user/updateDoctor/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  /* add subdivision  (branch location lab hospital) */
  addSubdivision(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'subdivision', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* get subdivision  (branch location lab hospital) */
  getSubdivision(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set('start', data.start)
    .set('limit', data.limit)
    if (data) {
      params = params.set('category', data.category)
    }
    if(data.sortBy){
      params = params.set('sortBy', data.sortBy)
      .set('sortOrder', data.sortOrder)
    }
    try {
      return this.http.get(this.baseUrl + `subdivision/${data.companyId}`, { headers: headers, params: params })
      .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };

  
  }
  /* update subdivision  (branch location lab hospital) */
  updateSubdivision(id, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `subdivision/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* delete subdivision  (branch location lab hospital) */
  deleteSubdivision(id): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `subdivision/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }


  /*   add DoctorMaster  */
  addDoctorMaster(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'user/createDoctor', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* get test packages By id(branch location lab hospital) */
  gettestpackagesByid(id): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `test-package/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  testResultMasterByID(id):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `test-result/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  testResultMasterByTestID(id):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `test-result/test/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  updateTestResultMaster(id,data):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `test-result/${id}`, data , { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  
  deleteTestResultMaster(id):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `test-result/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* Possible test results */

  createPossibleTestResult(testResultId,data):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `possible-test-result/${testResultId}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  updatePossibleTestResult(id,data):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `possible-test-result/${id}`, data , { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  
  deletePossibleTestResult(id):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.delete('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `possible-test-result/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* Test Result reference range */

  createTestResultReferenceRange(testResultId,data):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `test-result-reference-range/${testResultId}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  updateTestResultReferenceRange(id,data):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `test-result-reference-range/${id}`, data , { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  
  deleteTestResultReferenceRange(id):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.delete('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `test-result-reference-range/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* for Template */

  
  createTestResultTemplate(testResultId,data):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `test-result-templates/${testResultId}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  updateTestResultTemplate(id,data):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `test-result-templates/${id}`, data , { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  
  deleteTestResultTemplate(id):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.delete('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `test-result-templates/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
/*techinican create */
technicianData(data){
  let access_token = localStorage.getItem('user_token');
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', "Bearer " + access_token);
  try {
    return this.http.post(this.baseUrl + 'user/createTechincian',data,  { headers: headers })
      .pipe(catchError(this.handleError));
  } catch (error) {
    return error;
  };
}

/*techinican List */
technicianList(data): Observable<any> {
  let access_token = localStorage.getItem('user_token');
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', "Bearer " + access_token);
  let params = new HttpParams();
  params = params.set('role', data.role)
  
  try {
    return this.http.get(this.baseUrl + 'user', { headers: headers, params: params })
  } catch (error) {
    return error;
  };


}
 /* delete techinican   */
 deleteTechnician(id): Observable<any> {
  let access_token = localStorage.getItem('user_token');
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', "Bearer " + access_token);
  try {
    return this.http.delete(this.baseUrl + `user/${id}`, { headers: headers })
      .pipe(catchError(this.handleError));
  } catch (error) {
    return error;
  };
}

  /*  For Session Handling */

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.error.message}`;
    }
    Swal.fire({
      text: `${errorMessage}`,
      icon: 'warning',
      confirmButtonText: 'ok'
    }).then(result => {
      if (errorMessage === 'Unauthorized') {
        console.log("suresh")
        // localStorage.removeItem('user_token')
        this.router.navigateByUrl('/session/signIn')
        // localStorage.removeItem('user_details')
      }
    })
    return throwError(errorMessage);
  }

}

