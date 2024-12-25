import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes = [ 
  { path: '', component: MainPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'booking', component: BookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
