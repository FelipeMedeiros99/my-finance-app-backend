interface UserPayload {
  username: string;
  id: number;
  iat?: number;
  exp?: number;
}

declare namespace Express {
  export interface Request {
    user?: UserPayload;
  }
}