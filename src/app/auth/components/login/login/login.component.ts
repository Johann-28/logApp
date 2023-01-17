import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formularioLog : FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(8)]],
    pass: ['', [Validators.required, Validators.minLength(7)]]
  });

  constructor(private fb : FormBuilder,
              private router : Router,
              private authService: AuthService,
              private toastr: ToastrService)
  {

  }

  login()
  {
    if(this.formularioLog.valid)
    {
      
      const {id , pass} = this.formularioLog.value;
      this.authService.login(id,pass)
      .subscribe(res => {
        if(res === true){
          this.router.navigateByUrl('/dashboard');
          this.toastr.success(id, 'Ingreso exitoso');
        }
        else{
          console.log(res);
          this.toastr.error(res, 'Error',{
            progressBar : true,
            progressAnimation : 'increasing',
            closeButton : true,
            timeOut : 3000
          })
        }
      })
    }else{
      this.toastr.error('Asegurese de ingresar datos correctos', 'Error', {
        progressBar : true,
        progressAnimation : 'increasing',
        closeButton : true,
        timeOut : 3000

      });
    }
  }
}
