import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpLoginService } from 'src/app/http/http-login.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  validateForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private httpLoginService: HttpLoginService,
    private nzMessageService: NzMessageService,
  ) {
    /**
     * 表单控制器初始化
     */
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }


  /**
   * 表单提交
   */
  submitForm(): void {
    if (this.validateForm.valid) {
      let formData = new FormData()
      formData.append('loginBody', this.validateForm.value)
      console.log('submit', this.validateForm.value);
      this.httpLoginService.login(this.validateForm.value).subscribe(res => {
        if (res.status === 200) {
          sessionStorage.setItem('token',res.data.token)
          // document.cookie = 'access_token' + '=' + (res.data.token || '');
          // 登录成功
          this.nzMessageService.success(res.message)
        } else {
          // 登陆失败
          this.nzMessageService.error(res.message)
        }

      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
