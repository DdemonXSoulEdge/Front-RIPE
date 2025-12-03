import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  temperature: number = 0;
  humidity: number = 0;
  timestamp: string = '--';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLatestTelemetry();

    setInterval(() => {
      this.getLatestTelemetry();
    }, 5000);
  }

  getLatestTelemetry(): void {
    this.http.get<any[]>('https://damn-back.onrender.com/api/telemetry')
      .subscribe({
        next: (data) => {
          if (data.length > 0) {
            const last = data[0];
            this.temperature = last.temperature;
            this.humidity = last.humidity;
            this.timestamp = last.timestamp;
          }
        },
        error: (err) => {
          console.error('Error obteniendo datos:', err);
        }
      });
  }
}
