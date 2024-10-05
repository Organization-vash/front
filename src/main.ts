import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {

  providers: [provideHttpClient(),provideRouter(routes)]
}).catch(err => console.error(err));
  providers: [
    provideHttpClient(),
    ...appConfig.providers
  ]
})
  .catch((err) => console.error(err));
