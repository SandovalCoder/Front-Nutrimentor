export interface User {
    id: number;
    username: string;
    password: string;
    active: boolean;
    clientId?: number;
    healthProfessionalId?: number;
    authorities: string;
}

