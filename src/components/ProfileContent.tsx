"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/components/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Mail, UserCheck, CheckCircle } from "lucide-react";

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
    return (
      <div className="flex justify-center items-center h-screen dark:text-gray-200">
        Loading...
      </div>
    );
  }

  if (!user) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="flex flex-col px-5 items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 max-w-md w-full transition-colors duration-200">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Profile
        </h1>
        <div className="space-y-6">
          <ProfileItem
            icon={<User className="text-blue-500 dark:text-blue-400" />}
            label="Name"
            value={user.name}
          />
          <ProfileItem
            icon={<Mail className="text-blue-500 dark:text-blue-400" />}
            label="Email"
            value={user.email}
          />
          <ProfileItem
            icon={<UserCheck className="text-blue-500 dark:text-blue-400" />}
            label="Role"
            value={user.role}
          />
          <ProfileItem
            icon={<CheckCircle className="text-blue-500 dark:text-blue-400" />}
            label="Verified"
            value={user.verified ? "Yes" : "No"}
          />
        </div>
        {user.role === "admin" && (
          <div className="mt-8">
            <Link href="/admin">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
  );
}
