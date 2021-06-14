import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  Locations:any =[];
  weather:any=[];
  public latitude: any;
  public longitude: any;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background = '';
  getLocationsFlag=false;
  
  
  constructor(
      private weatherService: WeatherService
  ) { }

  ngOnInit() {
      this.weatherService.getWeather().subscribe(
        (data: any) => {
          this.Locations.push({
            name:'Chicago',
            weather:data
          });
          this.Locations.push({
            name:'Cleveland',
            weather:data
          });
          this.Locations.push({
            name:'Atlanta',
            weather:data
          });
          console.log('weather value', data.data.timelines[0]);
        });
  }

  toggleBackground() {
    this.background = this.background ? '' : 'primary';
  }

  onSubmit() {
    this.weather = [];
    this.getLocationsFlag = true;
    if (this.latitude && this.longitude) {
        
        this.weatherService.getWeatherbyLatLong(this.latitude, this.longitude).subscribe((value) => {
          this.weather.push({
            weather:value
          });
          console.log('value', value)
        })
    }
  }

}