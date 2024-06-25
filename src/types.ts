export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "guest" | "subscriber";
  verified: boolean;
}
