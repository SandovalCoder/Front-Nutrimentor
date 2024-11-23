export interface Token {
    jwtToken: string;
    userId: number;
    authorities: string;
}