export interface QuestionReport {
    id: number;
    query: string;
    response: string;
    queryDate: Date;
    responseDate: Date | null;
    clientName: string;
    clientId: number;
    healthProfessionalName: string;
    state: string;
}
