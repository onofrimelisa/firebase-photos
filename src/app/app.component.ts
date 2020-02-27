import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){
    Swal.fire({
       title: 'Hey there!',
       text: 'This app has only ilustrative proposes, to show the usage of different technologies.',
       icon: 'info',
       confirmButtonText: 'Ok, lets see!'
    });
  }

}
