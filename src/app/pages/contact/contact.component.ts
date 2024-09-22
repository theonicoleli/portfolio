import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Renderer2, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      from_name: '',
      to_name: 'Théo Nicoleli',
      from_email: '',
      message: ''
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.removeAOSOnMobile();
    }
  }

  removeAOSOnMobile() {
    const updateAOSAttribute = () => {
      if (window.innerWidth < 769) {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
          this.renderer.removeAttribute(element, 'data-aos');
        });
      }
    };

    updateAOSAttribute();
    window.addEventListener('resize', updateAOSAttribute);
  }

  async send() {
    const emailControl = this.form.get('from_email');
  
    if (emailControl?.invalid && emailControl?.touched) {
      this.errorMessage = 'Por favor, insira um email válido.';
      return;
    }

    if (this.form.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.isLoading = true;
    
    try {
      emailjs.init('0lmgAq2lmLv_Bf1mG');
      const response = await emailjs.send("service_60fy6wb", "template_5647cnt", {
        from_name: this.form.get('from_name')?.value || '',
        to_name: 'Théo Nicoleli',
        from_email: this.form.get('from_email')?.value || '',
        subject: '',
        message: this.form.get('message')?.value || ''
      });
      this.successMessage = 'Email enviado com sucesso!';
      this.errorMessage = null;
      this.form.reset();
    } catch (error) {
      this.errorMessage = 'Falha ao enviar o email. Porfavor tente novamente mais tarde.';
      this.successMessage = null;
    } finally {
      this.isLoading = false;
    }
  }

}
