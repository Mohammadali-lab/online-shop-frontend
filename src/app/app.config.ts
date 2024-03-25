import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule, NgbModule, FormsModule, ReactiveFormsModule),
    provideRouter(routes)]
};
