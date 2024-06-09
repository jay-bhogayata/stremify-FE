import api from "@/utils/api";
import { cookies } from "next/headers";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
} | null;

export default async function fetchUser(): Promise<User> {
  const session = cookies().get("sessionId");
  let user = null as User;

  try {
    const response = await api.get("/auth/me", {
      headers: {
        Cookie: `sessionId=${session?.value}`,
      },
    });
    user = response.data.user;
  } catch (error) {
    user = null;
    console.error("An error occurred while fetching user data.");
  }

  return user;
}
