import { ErrorHandler,
         Injectable, } from '@angular/core';


@Injectable()
export class ErrorService implements ErrorHandler {
  handleError(error) {
    // do something with the exception
  }
}
