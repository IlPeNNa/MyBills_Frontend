import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BollettaService } from '../../service/bolletta.service';
import { AuthService } from '../../service/auth.service';
import { Bolletta, StatisticheCliente } from '../../dto/bolletta.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-bollette-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatTooltipModule
  ],
  templateUrl: './bollette-dashboard.component.html',
  styleUrl: './bollette-dashboard.component.scss'
})
export class BolletteDashboardComponent implements OnInit {
  bollette: Bolletta[] = [];
  statistiche: StatisticheCliente = { gas: 0, luce: 0, wifi: 0 };
  displayedColumns: string[] = ['tipo', 'fornitore', 'importo', 'scadenza', 'stato', 'azioni'];
  
  // Filtri
  filtroDataDa: Date | null = null;
  filtroDataA: Date | null = null;
  filtroTipo: string = '';
  filtroPagato: boolean | null = null;

  constructor(
    private bollettaService: BollettaService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.caricaBollette();
    await this.caricaStatistiche();
  }

  async caricaBollette(): Promise<void> {
    this.bollette = await lastValueFrom(this.bollettaService.getAll());
  }

  async caricaStatistiche(): Promise<void> {
    this.statistiche = await lastValueFrom(this.bollettaService.getStatistiche());
  }

  get bolletteFiltrate(): Bolletta[] {
    return this.bollette.filter(bolletta => {
      let passa = true;
      
      if (this.filtroTipo && bolletta.tipo !== this.filtroTipo) {
        passa = false;
      }
      
      if (this.filtroPagato !== null && bolletta.pagato !== this.filtroPagato) {
        passa = false;
      }
      
      if (this.filtroDataDa && bolletta.scadenza < this.filtroDataDa) {
        passa = false;
      }
      
      if (this.filtroDataA && bolletta.scadenza > this.filtroDataA) {
        passa = false;
      }
      
      return passa;
    });
  }

  async marcaComePageto(bolletta: Bolletta): Promise<void> {
    if (bolletta.id) {
      await lastValueFrom(this.bollettaService.marcaComePageto(bolletta.id));
      bolletta.pagato = true;
      bolletta.dataPagamento = new Date();
    }
  }

  isScaduta(bolletta: Bolletta): boolean {
    return !bolletta.pagato && bolletta.scadenza < new Date();
  }

  getTotalePagato(): number {
    return this.bollette
      .filter(b => b.pagato)
      .reduce((total, b) => total + b.importo, 0);
  }

  getTotaleDaPagare(): number {
    return this.bollette
      .filter(b => !b.pagato)
      .reduce((total, b) => total + b.importo, 0);
  }

  clearFiltri(): void {
    this.filtroDataDa = null;
    this.filtroDataA = null;
    this.filtroTipo = '';
    this.filtroPagato = null;
  }

  getTipoIcon(tipo: string): string {
    switch(tipo) {
      case 'Gas': return 'local_gas_station';
      case 'Luce': return 'lightbulb';
      case 'WiFi': return 'wifi';
      default: return 'receipt';
    }
  }

  getChartStyle(): string {
    const gasAngle = (this.statistiche.gas / 100) * 360;
    const luceAngle = ((this.statistiche.gas + this.statistiche.luce) / 100) * 360;
    
    return `conic-gradient(
      #ff6b35 0deg ${gasAngle}deg,
      #f7931e ${gasAngle}deg ${luceAngle}deg,
      #4caf50 ${luceAngle}deg 360deg
    )`;
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
