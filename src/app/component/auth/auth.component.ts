import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  // Campi per il login
  email: string = '';
  password: string = '';
  
  // Campi aggiuntivi per la registrazione
  nome: string = '';
  cognome: string = '';
  
  isLoginMode: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    // Marca il form come submitted per attivare la validazione visiva
    if (this.isLoginMode) {
      if (this.isLoginFormValid()) {
        this.login();
      }
    } else {
      if (this.isRegisterFormValid()) {
        this.register();
      }
    }
  }

  private isLoginFormValid(): boolean {
    return this.email.trim() !== '' && this.password.trim() !== '';
  }

  private isRegisterFormValid(): boolean {
    return this.nome.trim() !== '' && 
           this.cognome.trim() !== '' && 
           this.email.trim() !== '' && 
           this.password.trim() !== '';
  }

  login(): void {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/bollette']);
    } else {
      alert('Inserisci email e password');
    }
  }

  register(): void {
    // Validazione completa per la registrazione
    if (this.nome && this.cognome && this.email && this.password) {
      // Simulazione registrazione - in produzione salveresti nel backend
      alert(`Registrazione completata per ${this.nome} ${this.cognome}! Effettua il login.`);
      this.isLoginMode = true;
      this.clearForm();
    } else {
      alert('Compila tutti i campi: nome, cognome, email e password');
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.clearForm();
  }

  private clearForm(): void {
    this.email = '';
    this.password = '';
    this.nome = '';
    this.cognome = '';
  }
}
