import {Injectable} from "@angular/core";
import {FormControl} from "@angular/forms";

function isInteger(value: any) {
  return (parseFloat(value) == parseInt(value)) && !isNaN(value)
}

@Injectable()
export class ValidatorsService {

  public isInteger = (control: FormControl) => isInteger(control.value) ? null : {notNumeric: true}
}