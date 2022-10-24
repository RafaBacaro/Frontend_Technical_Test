import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/service/weather.service';
import { EmergencyDialogComponent } from '../emergency-dialog/emergency-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public temperature: number = 0;
  public humidity: number = 0;
  public type: string = '';
  public subType: string = '';
  public cityName: string = 'MADRID';
  public cities: Array<{ id: number, name: string }> = [];
  public lastCalledCityId: number = 0;

  public interval: any;
  public susbcription: Subscription | undefined;
  public conditionIcon: string = '';

  constructor(
    private weatherService: WeatherService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initiliazeCities();
    this.callToGetWeather('Madrid');
    this.callInterval();
  }

  initiliazeCities() {
    this.cities = [
      { id: 0, name: 'Madrid' },
      { id: 1, name: 'Sevilla' },
      { id: 2, name: 'Valencia' },
      { id: 3, name: 'Barcelona' },
      { id: 4, name: 'Alicante' },
      { id: 5, name: 'Galicia' },
      { id: 6, name: 'Toledo' },
      { id: 7, name: 'Granada' },
      { id: 8, name: 'Caceres' },
      { id: 9, name: 'Vigo' },
      { id: 10, name: 'Moscow' }
    ];
  }

  randomizeCities() {
    let randomNumber = Math.floor(Math.random() * 10);
    let choosedCity = this.cities.find(city => city.id === randomNumber);
    choosedCity = choosedCity != undefined ? choosedCity : { id: 0, name: '' };
    let isTheSameCity = true;
    while (isTheSameCity) {
      if (this.lastCalledCityId !== choosedCity.id) {
        isTheSameCity = false;
      } else {
        randomNumber = Math.floor(Math.random() * 10);
      }
    }

    if (!isTheSameCity) {
      this.lastCalledCityId = choosedCity.id;
      this.callToGetWeather(choosedCity?.name);
    }

    this.cityName = choosedCity?.name.toUpperCase();
  }

  callToGetWeather(cityName: string) {
    this.susbcription = this.weatherService.getWeather(cityName).subscribe({
      error: (e) => {
        console.log('e', e);
      },
      next: (response) => {
        this.temperature = response?.main?.temp;
        this.humidity = response?.main?.humidity;
        this.type = response?.weather[0]?.main;
        this.subType = response?.weather[0]?.description;
        this.checkEmergencyWeather();
        this.getConditionIcon(this.type);
      }
    });
  }

  checkEmergencyWeather() {
    if ((this.temperature >= 9 || this.temperature <= 27) && this.humidity > 70) {
      clearInterval(this.interval);
      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(EmergencyDialogComponent, {
      data: {
        cityName: this.cityName,
        temperature: this.temperature,
        humidity: this.humidity
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.callInterval();
    });
  }

  callInterval() {
    this.interval = setInterval(() => {
      this.randomizeCities();
    }, 15000);
  }

  getConditionIcon(type: string) {
    switch (type.toLowerCase()) {
      case 'thunderstorm':
        this.conditionIcon = 'thunderstorm';
        break;
      case 'drizzle':
        this.conditionIcon = 'water_drop';
        break;
      case 'foggy':
        this.conditionIcon = 'foggy';
        break;
      default:
        this.conditionIcon = 'cloud';
        break;

    }
  }

}
