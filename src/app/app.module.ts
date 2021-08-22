import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home-component/home-component';
import { HomeComponentService } from './service/home-component.service';
import { FocusDirective } from './directives/auto-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    FocusDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,    
    MatCardModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [HomeComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
