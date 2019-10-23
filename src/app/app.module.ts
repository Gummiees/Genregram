import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatProgressBarModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, MatButtonModule, MatProgressBarModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
