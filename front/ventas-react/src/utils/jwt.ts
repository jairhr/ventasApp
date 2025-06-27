import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
  authorities: string[]; // Esto depende de cómo se construya el JWT en el backend
}

export function decodeToken(token: string): JwtPayload {
  return jwtDecode<JwtPayload>(token);
}