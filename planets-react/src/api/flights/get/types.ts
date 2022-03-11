export interface Flight {
  origin: string;
  destination: string;
  price: number;
  availability: number;
  date: string;
  id: string;
}

export type Response = {
  origin: string;
  destination: string;
  price: number;
  availability: number;
  data: string;
}[];

export type Result = Flight[];
