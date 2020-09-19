import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AponMartFormService } from 'src/app/services/apon-mart-form.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartDetailsComponent } from '../cart-details/cart-details.component';
import { AponMartValidators } from 'src/app/validators/apon-mart-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: Number = 0;
  totalQuantity: Number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries:Country[]=[];
  

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];



  constructor(private formBuilder: FormBuilder,
              private aponMartFormService:AponMartFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('' ,[Validators.required, Validators.minLength(2), AponMartValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('' ,[Validators.required, Validators.minLength(2),AponMartValidators.notOnlyWhiteSpace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')] )
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('' ,[Validators.required, Validators.minLength(2), AponMartValidators.notOnlyWhiteSpace]),
        city: new FormControl('' ,[Validators.required, Validators.minLength(2), AponMartValidators.notOnlyWhiteSpace]),
        state: new FormControl('' ,[Validators.required]),
        country: new FormControl('' ,[Validators.required]),
        zipCode: new FormControl('' ,[Validators.required, Validators.minLength(2), AponMartValidators.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('' ,[Validators.required, Validators.minLength(2), AponMartValidators.notOnlyWhiteSpace]),
        city: new FormControl('' ,[Validators.required, Validators.minLength(2), AponMartValidators.notOnlyWhiteSpace]),
        state: new FormControl('' ,[Validators.required]),
        country: new FormControl('' ,[Validators.required]),
        zipCode: new FormControl('' ,[Validators.required, Validators.minLength(2), AponMartValidators.notOnlyWhiteSpace])
     }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('' ,[Validators.required]),
        nameOnCard: new FormControl('' ,[Validators.required, Validators.minLength(2), AponMartValidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl('' ,[Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('' ,[Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: new FormControl('' ,[Validators.required]),
        expirationYear: new FormControl('' ,[Validators.required])
      })
    });

// populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    this.aponMartFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
    
    // populate credit card years

    this.aponMartFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    ),

    this.aponMartFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.countries = data;
      }
    );

    

  }


  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}
  get shippingAddressZipcode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}
  get billingAddressZipcode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}

  get craditCardType(){return this.checkoutFormGroup.get('creditCard.cardType');}
  get craditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get craditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get craditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode');}
  get craditCardExpirationMonth(){return this.checkoutFormGroup.get('creditCard.expirationMonth');}
  get craditCardExpirationYear(){return this.checkoutFormGroup.get('creditCard.expirationYear');}

  copyShippingAddressToBillingAddress(event) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
            .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
            this.billingAddressStates=this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates=[];
    }
    
  }
  handleMonthsAndYears()
  {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }
    this.aponMartFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  onSubmit(){
    
    if(this.checkoutFormGroup.invalid)
    {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }




  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.aponMartFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data; 
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }
}
