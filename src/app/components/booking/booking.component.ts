import { Component, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import FullCalendarModule
import { HttpClient } from '@angular/common/http';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core'; 


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  @ViewChild('calendar') calendar: any;



  events: any[] = [];


  calendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    events: this.events, 
    editable: true,
    droppable: true,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    
  };


  isBookingModalOpen: boolean = false;
  selectedTime: string = ''; 
  selectedDate: string = ''; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get<any[]>('http://localhost:5000/api/appointments') 
      .subscribe((data) => {
        this.events = data.map(event => ({
          title: event.title,
          start: event.start,
          end: event.end,
          id: event.id,
          allDay: event.allDay || false,
        }));
      }, (error) => {
        console.error('Error fetching events:', error);
      });
  }

  handleDateSelect(selectInfo: any) {
    const selectedDate = selectInfo.startStr;
    this.selectedDate = selectedDate; 
    this.isBookingModalOpen = true; 
  }

  handleEventClick(clickInfo: any) {
    const updatedTime = prompt('Update your appointment time (e.g., 12:00 PM):');
    
    if (updatedTime) {
      const updatedEvent = {
        ...clickInfo.event,
        start: `${clickInfo.event.startStr.split('T')[0]}T${updatedTime}:00`,
        end: `${clickInfo.event.startStr.split('T')[0]}T${updatedTime}:59`
      };

      this.http.put('http://localhost:5000/api/appointments/' + clickInfo.event.id, updatedEvent)
        .subscribe(response => {
          alert('Your appointment has been updated!');
        }, error => {
          alert('There was an error updating your appointment.');
        });

      clickInfo.event.setStart(updatedEvent.start);
      clickInfo.event.setEnd(updatedEvent.end);
    }
  }


  bookAppointment() {
    const newEvent = {
      title: 'Booked Appointment',
      start: `${this.selectedDate}T${this.selectedTime}:00`,
      end: `${this.selectedDate}T${this.selectedTime}:59`,
      allDay: false
    };

   
    this.http.post('http://localhost:5000/api/appointments', newEvent)
      .subscribe(response => {
        alert('Your appointment has been booked!');
        this.events.push(newEvent); 
        this.isBookingModalOpen = false; 
      }, error => {
        alert('There was an error booking your appointment.');
      });
  }


  closeBookingModal() {
    this.isBookingModalOpen = false; 
  }
}
  

