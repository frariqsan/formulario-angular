import { UserInterface } from './../../models/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { comparePassword } from 'src/app/validators/passwordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;
  public submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["",[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      rePassword: ["",[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    },{
      validator: comparePassword('password', 'rePassword')
    })
   }

  ngOnInit(): void {
  }

  public onSubmit(){
    this.submitted = true;
    if (this.userForm.valid){
      const user: UserInterface = {
        username: this.userForm.get('username')?.value,
        password: this.userForm.get('password')?.value,
        rePassword: this.userForm.get('rePassword')?.value,
        
      }
      alert(JSON.stringify(user))
      this.userForm.reset();
      this.submitted = false
    }
  }
}
