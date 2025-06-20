import { Component } from '@angular/core';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckoutFormService } from '../../services/checkout-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private checkoutFormService: CheckoutFormService
  ) { }


  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.getMonths();
    this.getYears();
    this.getCountries();

  }

  onSubmit() {
    console.log('Handling purchase submit button')
    console.log("Customer:" + this.checkoutFormGroup.get('customer')!.value);
    console.log("Shipping Address:");
    console.log(this.checkoutFormGroup.get('shippingAddress')!.value.country.name);
    console.log(this.checkoutFormGroup.get('shippingAddress')!.value.state.name);
    console.log("Billing Address:");
    console.log(this.checkoutFormGroup.get('billingAddress')!.value.country.name);
    console.log(this.checkoutFormGroup.get('billingAddress')!.value.state.name);

  }

  copyShippingAddressToBillingAddress(event) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  getMonths() {

    const startMonth: number = new Date().getMonth() + 1;

    this.checkoutFormService.getCreditCardMonths(startMonth).subscribe(
      data => { this.creditCardMonths = data }
    );
  }

  getYears() {

    this.checkoutFormService.getCreditCardYears().subscribe(
      data => { this.creditCardYears = data }
    );
  }

  getCountries() {

    this.checkoutFormService.getCountries().subscribe(
      data => { this.countries = data }
    );
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    this.checkoutFormService.getStates(countryCode).subscribe(
      data => {
        console.log(`${formGroupName} country code: ${countryCode}, data size: ${data.length}`);
        console.log();
        formGroupName === 'shippingAddress' ? this.shippingAddressStates = data : this.billingAddressStates = data;

        /* --- REFACTORED ABOVE ---
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
          */

        formGroup.get('state').setValue(data[0]);
      }
    );
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number = currentYear === selectedYear ? new Date().getMonth() + 1 : 1;

    /* --- REFACTORED ABOVE ---
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    */

    this.checkoutFormService.getCreditCardMonths(startMonth).subscribe(
      data => { this.creditCardMonths = data }
    );

  }
}
