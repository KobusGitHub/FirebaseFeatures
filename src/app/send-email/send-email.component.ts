import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  sendTest() {

    console.log('sendTest');
    let url = `https://us-central1-kobusfirebasefeatures.cloudfunctions.net/helloWorld`;
    let params: URLSearchParams = new URLSearchParams();
    // let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let headers: Headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    let requestOptions: RequestOptionsArgs = {};

    requestOptions.headers = headers;


    return this.http.post(url, undefined, requestOptions)
                    .toPromise()
                    .then((res) => {
                      console.log('OK');
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });

  }

  sendEmail() {

    let url = `https://us-central1-kobusfirebasefeatures.cloudfunctions.net/httpEmail`;
    let params: URLSearchParams = new URLSearchParams();
    // let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    let headers: Headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');

    let requestOptions: RequestOptionsArgs = {};

    requestOptions.headers = headers;

    params.set('to', 'jacobusjonker@gmail.com');
    params.set('from', 'kobus.jonker@sgits.co.za');
    params.set('subject', 'test-email');
    params.set('content', 'Hello World');

    return this.http.post(url, params, requestOptions)
                    .toPromise()
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });

  }

}
