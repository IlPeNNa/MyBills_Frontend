export class Bolletta {
  id?: string;
  tipo!: string; // Gas, Luce, WiFi
  fornitore!: string;
  importo!: number;
  scadenza!: Date;
  pagato!: boolean;
  dataPagamento?: Date;
}

export enum TipoBolletta {
  GAS = 'Gas',
  LUCE = 'Luce',
  WIFI = 'WiFi'
}

export interface StatisticheCliente {
  gas: number;
  luce: number;
  wifi: number;
}
