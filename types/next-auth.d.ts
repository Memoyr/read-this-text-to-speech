import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    accessToken: string;
    status: "loading" | "authenticated" | "unauthenticated";
  }

}

/* // Example on how to extend the built-in types for JWT 
declare module "next-auth/jwt" {
  interface JWT {
    // This is an example. You can find me in types/next-auth.d.ts 
    bar: number
  }
}
 */