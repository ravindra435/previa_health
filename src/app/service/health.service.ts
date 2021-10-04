import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private baseUrl: string = environment.url;
  // baseUrl = environment.url

  constructor(private http: HttpClient, private router: Router) { }

  /* add Company */
  addCompany(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'company', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  /* get Company */
  getCompany(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set('start', data.start)
      .set('limit', data.limit)
    if (data.sortBy) {
      params = params.set('sortBy', data.sortBy)
        .set('sortOrder', data.sortOrder)
    }
    try {
      return this.http.get(this.baseUrl + 'company', { headers: headers,params:params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* update Company */

  updateCompany(id, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `company/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* Delete Company */
  deleteCompany(id): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `company/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  // /user/createAdmin

  /* add admin */
  addAdmin(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'user/createAdmin', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* get admin details */

  getAdmin(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set('start', data.start)
      .set('limit', data.limit)
      .set('role', data.role)
    if (data.id) {
      params = params.set('id', data.id)
    }
    if (data.sortBy) {
      params = params.set('sortBy', data.sortBy)
        .set('sortOrder', data.sortOrder)
    }
    try {
      return this.http.get(this.baseUrl + `user`, { headers: headers, params: params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
   /* update Company */

   updateAdmin(id, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `user/updateAdmin/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }


  /* Delete users */
  deleteUser(id): Observable<any> {
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

  // /patient/addPatients

  /* add Bulk Patients */
  addBulkPatients(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'patient/addPatients', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }


  /*   add patients  */
  addPatients(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'patient', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* get Company */
  getPatientsDataBySearch(search): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set('searchString', search)
    try {
      return this.http.get(this.baseUrl + 'patient', { headers: headers, params: params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* get Patient */
  getPatients(): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + 'patient', { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
    /* get patient list */
    getPatientsList(data): Observable<any> {
      let access_token = localStorage.getItem('user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', "Bearer " + access_token);
      let params= new HttpParams();
       params = params.set('start',data.start)
                   .set('limit',data.limit)
      if(data.sortBy){
        params = params.set('sortBy',data.sortBy)
                   .set('sortOrder',data.sortOrder)
      }
      try {
        return this.http.get(this.baseUrl + 'patient/active', { headers: headers, params:params })
          .pipe(catchError(this.handleError));
      } catch (error) {
        return error;
      };
    }


  /*  services for test result master */


  saveTestMaster(data: Object) {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'test-result', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /*  get patient By Pid */
  getPatientsbyPId(id): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `patient/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /*  add patient details By Pid */
  addpatientsdetilsBypid(patientId, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `patient-details/${patientId}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }


  /*  add patient tests By Pid */
  addpatientsTestsBypid(patientId, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `patient-tests/${patientId}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* patient test update */

  updatePatientTestByPid(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `patient-tests/tests`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /*  add patient MedicalHistory By Pid */
  addpatientsMedicalHistoryBypid(patientId, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `patient-medical-history/${patientId}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /*  add patient family-history By Pid */
  addpatientsFamilyHistoryBypid(patientId, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `patient-family-history/${patientId}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  /*  add patient doctor Reviews By Pid */
  addpatientsDoctorReviewsBypid(patientId, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `patient-reviews/${patientId}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* patient doctor reviews update */

  updatePatientDoctorReviewsByPid(id, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `patient-reviews/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  /*  add patient document By Pid */
  addpatientsDocumentsBypid(patientId, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `patient/documents/${patientId}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /*   get patient Documents  */
  getPatientDocuments(patientId) {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `patient/documents/${patientId}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
  // /test
  getTest(data) {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params = new HttpParams();
    if (data) {
      params = params.set('searchString', data)
    }

    try {
      return this.http.get(this.baseUrl + 'test', { headers: headers, params: params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* get test by id */
  getTestsById(id): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `test/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }
    /* Delete TestsById */
    deleteTestsById(id): Observable<any> {
      let access_token = localStorage.getItem('user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', "Bearer " + access_token);
      try {
        return this.http.delete(this.baseUrl + `test/${id}`, { headers: headers })
          .pipe(catchError(this.handleError));
      } catch (error) {
        return error;
      };
    }
    /*technician search */

    getSearchTechnicianPackages(search) {
      let access_token = localStorage.getItem('user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', "Bearer " + access_token);
      let params = new HttpParams();
      params = params.set('searchString', search)
      try {
        return this.http.get(this.baseUrl + 'user', { headers: headers, params: params })
          .pipe(catchError(this.handleError));
      } catch (error) {
        return error;
      };
    }
  // /test
  getSearchTestsPackages(search) {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params = new HttpParams();
    if (search) {
      params = params.set('searchString', search)
    }

    try {
      return this.http.get(this.baseUrl + 'test/searchTestsPackages', { headers: headers, params: params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  updateTestMaster(id,data):Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl +`test/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  // /* get Company */
  // getPatientsDataBySearch(search): Observable<any> {
  //   let access_token = localStorage.getItem('user_token');
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization', "Bearer " + access_token);
  //   let params = new HttpParams();
  //   params = params.set('searchString', search)
  //   try {
  //     return this.http.get(this.baseUrl + 'patient', { headers: headers, params: params })
  //       .pipe(map((resp) => resp));
  //   } catch (error) {
  //     return error;
  //   };
  // }

  // /test
  getTestAndSubTests() {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + 'test/testsStructure', { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /*  patient generate-pid   */
  getgeneratePid(): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + 'patient/generate-pid', { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  // ​/questionnaire-section

  /* add questionnaire-section */
  addquestionnaireSection(data: Object) {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'questionnaire-section', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* get questionary */
  getQuestionnaireSection(): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + 'questionnaire-section', { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* questionnaire-section update */

  updateQuestionnaireSectionid(id, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `questionnaire-section/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* Delete questionnaire-section */
  deleteQuestionarySectionid(id): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `questionnaire-section/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* add questionary */
  addQuestionary(data: Object) {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'questionnaire', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* get questionary */
  getQuestionary(): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + 'questionnaire', { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }


  /* Delete Questionary */
  deleteQuestionary(id): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `questionnaire/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* Update Questionary */
  updateQuestionary(id, data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `questionnaire/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /* department services */

  /* save department */
  saveDepart(data: Object) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'department', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* get departments */
  getDepartments() :Observable<any>{
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    
    try {
      return this.http.get(this.baseUrl + 'department', { headers: headers})
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get departments */
  getDepartmentsList(data) :Observable<any>{
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params= new HttpParams();
    params = params.set('start',data.start)
                   .set('limit',data.limit)
      if(data.sortBy){
        params = params.set('sortBy',data.sortBy)
                   .set('sortOrder',data.sortOrder)
      }
    try {
      return this.http.get(this.baseUrl + 'department', { headers: headers , params:params})
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update departments */
  updateDepartments(id, data) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `department/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* delete departments */
  deleteDepartments(id) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `department/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* test master services */

  /* save test service */
  saveTest(data: Object) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'test', data, { headers: headers })
        .pipe(catchError(this.handleError))
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }
  // /test/actualTests

  getActualTests(search): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set('searchString', search)
    try {
      return this.http.get(this.baseUrl + 'test/actualTests', { headers: headers, params: params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }


  /* save bulk test results */

  saveBulkResult(data: Object) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + 'patient/test-results', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /*   test-package  */

  /* add test-package*/
  addTestPackages(data: Object) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'test-package', data, { headers: headers })
        .pipe(catchError(this.handleError))
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  /* get test-package */
  getTestPackages(data) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params= new HttpParams();
    params = params.set('start',data.start)
                   .set('limit',data.limit)
      if(data.sortBy){
        params = params.set('sortBy',data.sortBy)
                   .set('sortOrder',data.sortOrder)
      }
    try {
      return this.http.get(this.baseUrl + 'test-package', { headers: headers , params:params})
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get test-package */
  getTestPackagesById(id) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `test-package/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update TestPackages */
  updateTestPackages(id, data) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `test-package/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* delete TestPackages */
  deleteTestPackages(id) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `test-package/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get default test-package */
  getDefaultTestPackages() {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `test-package/defaultPackage`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* add userQuestionnaire   */
  adduserQuestionnaire(data): Observable<any> {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + 'userQuestionnaire', data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  getQuestionarieByPid(id) {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `userQuestionnaire/${id}`, { headers: headers })
        // .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }


  /* get tests service */
  // getTest(){
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization',"Bearer " + this.access_token);
  //   try {
  //    return this.http.get(this.baseUrl + 'test' , {headers: headers})
  //   } catch (error) {
  //     return error;
  //   }
  // }

  public getCollections(data): Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params= new HttpParams();
    params = params.set('start',data.start)
                   .set('limit',data.limit)
      if(data.sortBy){
        params = params.set('sortBy',data.sortBy)
                   .set('sortOrder',data.sortOrder)
      }
    try {
      return this.http.get(this.baseUrl + `patient-tests/${data.status}`, { headers: headers ,params:params})
        .pipe(catchError(this.handleError));
    }
    catch (error) {
      return error;
    }
  }

  /* for samples collectd */

  public moveToSamplesCollectd(data): Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + "patient-tests/samplesCollected", data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* for samples received */
  public moveToSamplesReceived(data): Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + "patient-tests/samplesReceived", data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* For test master list */

  getTestMasterList(data) {
    let access_token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set('start', data.start)
    .set('limit', data.limit)
    
    if(data.sortBy){
      params = params.set('sortBy', data.sortBy)
      .set('sortOrder', data.sortOrder)
    }
    try {
      return this.http.get(this.baseUrl + 'test/testsStructure', { headers: headers ,params:params})
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    };
  }

  /*  update testResult settings */

  updateTestResultMaster(id, data): Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `test-result/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update possible test result */

  addNewPossibleTestResult(id,data):Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `possible-test-result/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  updatePossibleTestResults(id, data): Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `possible-test-result/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  deletePossibleTestResults(id): Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `possible-test-result/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update Test Result Reference ranges */

  addNewRefRange(id,data):Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.post(this.baseUrl + `test-result-reference-range/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  updateRefRanges(id, data): Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.put(this.baseUrl + `test-result-reference-range/${id}`, data, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  deleteRefRanges(id): Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.delete(this.baseUrl + `test-result-reference-range/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  getTestResultMasterDetailsByID(id):Observable<any> {
    let headers = new HttpHeaders();
    let access_token = localStorage.getItem('user_token');
    headers = headers.set('Authorization', "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `test-result/${id}`, { headers: headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
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
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
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
