import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  bro = true;
  constructor(
    private registerForm: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
  }

  validateEmail(controls) {
    var regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null; //Returns as valid
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  validateUsername(controls) {
    var regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null; //Returns as valid
    } else {
      return { 'validateUser': true } // Return as invalid User
    }
  }

  validatePassword(controls) {
    // Makes sure that there is a Uppercase, Lowercase, Number, and Special Character
    var regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null; //Returns as valid
    } else {
      return { 'validatePassword': true } // Return as invalid Password
    }
  }

  createForm() {
    this.form = this.registerForm.group({
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(6), // Minimum length is 6 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmail // Custom validation
      ])],
      username: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validateUsername // Custom validation
      ])],
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(20), // Maximum length is 20 characters
        this.validatePassword // Custom validation
      ])]
    });

  }
  onSubmit() {
    // const user = {
    //   email: this.form.get('email').value,
    //   username: this.form.get('username').value,
    //   password: this.form.get('password').value
    // }
    // this.authService.registerUser(user).subscribe(data => {
    //   console.log(data);
    // });
    console.log(this.form.controls.username.errors);
  }
}
