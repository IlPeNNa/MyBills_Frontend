import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Bolletta, StatisticheCliente, TipoBolletta } from '../dto/bolletta.model';

@Injectable({
  providedIn: 'root'
})
export class BollettaService {
  private apiUrl = '/api/bollette';

  constructor(private http: HttpClient) {}

  // Per ora uso dati mock, poi collegherai al backend
  getAll(): Observable<Bolletta[]> {
    const mockData: Bolletta[] = [
      {
        id: '1',
        tipo: TipoBolletta.GAS,
        fornitore: 'Gas Hero',
        importo: 40,
        scadenza: new Date('2025-05-02'),
        pagato: true,
        dataPagamento: new Date('2025-04-28')
      },
      {
        id: '2',
        tipo: TipoBolletta.WIFI,
        fornitore: 'WiFi FastWeb',
        importo: 30,
        scadenza: new Date('2025-04-30'),
        pagato: false
      },
      {
        id: '3',
        tipo: TipoBolletta.LUCE,
        fornitore: 'Luce Enel',
        importo: 50,
        scadenza: new Date('2025-04-20'),
        pagato: false
      }
    ];
    return of(mockData);
  }

  getStatistiche(): Observable<StatisticheCliente> {
    const stats: StatisticheCliente = {
      gas: 40,
      luce: 35,
      wifi: 25
    };
    return of(stats);
  }

  create(bolletta: Bolletta): Observable<Bolletta> {
    return this.http.post<Bolletta>(this.apiUrl, bolletta);
  }

  update(id: string, bolletta: Bolletta): Observable<Bolletta> {
    return this.http.put<Bolletta>(`${this.apiUrl}/${id}`, bolletta);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  marcaComePageto(id: string): Observable<Bolletta> {
    return this.http.patch<Bolletta>(`${this.apiUrl}/${id}/pagato`, {});
  }
}
