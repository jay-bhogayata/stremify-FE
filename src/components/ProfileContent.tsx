"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/components/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileContent() {
  const router = useRouter();
  const { user, isLoggedIn, fetchAuth } = useAuthStore((state) => ({
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    fetchAuth: state.fetchAuth,
  }));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoggedIn) {
        await fetchAuth();
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [isLoggedIn, fetchAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center my-auto px-3 ">
      <h1 className="text-2xl font-semibold my-5 ">Profile</h1>
      <div>
        <h2>Id: {user.id}</h2>
        <h2>Name: {user.name}</h2>
        <h2>Email: {user.email}</h2>
        <h2>Role: {user.role}</h2>
        <h2>Verified: {user.verified ? "Yes" : "No"}</h2>
        {user.role === "admin" && (
          <Link href="/admin">
            <Button>Admin Dashboard</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
// "use client";
// import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/stores/authStore";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ProfileContent() {
//   const router = useRouter();
//   const { user, isLoggedIn, fetchAuth } = useAuthStore();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (!isLoggedIn) {
//         await fetchAuth();
//       }
//       setIsLoading(false);
//     };

//     checkAuth();
//   }, [isLoggedIn, fetchAuth]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     router.push("/signin");
//     return null;
//   }

//   return (
//     <div className="flex flex-col justify-center items-center my-auto px-3 ">
//       <h1 className="text-2xl font-semibold my-5 ">Profile</h1>
//       <div>
//         <h2>Id: {user.id}</h2>
//         <h2>Name: {user.name}</h2>
//         <h2>Email: {user.email}</h2>
//         <h2>Role: {user.role}</h2>
//         <h2>Verified: {user.verified ? "Yes" : "No"}</h2>
//         {user.role === "admin" && (
//           <Link href="/admin">
//             <Button>Admin Dashboard</Button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }
