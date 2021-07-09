import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GeolocationInfo } from './models/geolocation-info';
import { GeolocationMapService } from './services/geolocation-map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'geolocation-app';
  ipAddress: any;
  data!: GeolocationInfo;
  zoom: number = 2;
  formIp!: FormGroup;
  loading = [false, false, false, false]

  constructor(
    private geolocationMapService: GeolocationMapService,
    private fb: FormBuilder,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.formIp = this.fb.group({
      ip: ["", [Validators.required, this.customValidator()]]
    });
    this.getIpAddress();
  }

  searchIpInfo() {
    const formValue = this.formIp.value;
    if (formValue.ip){
      console.log(formValue.ip);
      this.getGEOLocation(formValue.ip);
    }
  }

  customValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  
      if (regex.test(control.value)) {
        return null;
      }
  
      return { ipError: true };
    };
  }

  getIpAddress() {
    this.geolocationMapService.getIpAddress().subscribe((data: any) => {
      this.ipAddress = data.ip;
      console.log(this.ipAddress);
      this.getGEOLocation(this.ipAddress);
    });
  }

  getGEOLocation(ip: string) {
    this.geolocationMapService.getGEOLocation(ip).subscribe((data: GeolocationInfo) => {
      this.data = data;
      this.data.screen = 'ip: ' + data.ip + '\n' + 'country: ' + 
          data.country_name + '\n' + 'capital: ' + data.country_capital + '\n' + 'zipcode: ' + data.zipcode
      this.data.position = {
        lat: Number.parseFloat(data.latitude),
        lng: Number.parseFloat(data.longitude),
      }
      console.log(this.data);
    });
  }

  load(index:any) {
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 1000);
  }

}
