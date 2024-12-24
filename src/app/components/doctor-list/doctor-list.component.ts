import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];  // Declare doctors as an array of Doctor objects

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getDoctors();  // Call the function to fetch doctors when the component initializes
  }

  getDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (data) => {
        console.log('Doctors fetched:', data);  // Log the data to see if it's coming through
        this.doctors = data;  // Assign the data to the doctors array
      },
      (error) => {
        console.error('Error fetching doctors:', error);  // Log any error that occurs
      }
    );
  }
}
