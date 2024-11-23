export interface Question {
  id: number;
  query: string;
  response: string | null;
  queryDate: Date;
  responseDate: Date | null;
  clientId?: number;
  healthProfessionalId?: number;
  state: string;
}
