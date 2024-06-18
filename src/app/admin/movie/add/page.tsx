"use client";
import { MovieForm, MovieFormData } from "@/components/AddMovieForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/Toast";
import { Toaster } from "@/components/ui/toaster";

export default function Page() {
  const router = useRouter();

  const onSubmit = async (data: MovieFormData) => {
    try {
      const response = await api.post("/content/movies", data);
      if (response.status === 201) {
        Toast({
          variant: "default",
          title: "Success",
          description: "Movie added successfully.",
        });
        router.push("/admin/movie");
      } else {
        throw new Error(response.data.message);
      }
      console.log(data);
    } catch (error: any) {
      console.error(error);
      Toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="px-10 py-5">
      <Toaster />
      <MovieCardComponent
        title="Add a Movie"
        description="Enter the details of the movie below to add it to the database."
      >
        <MovieForm onSubmit={onSubmit} />
      </MovieCardComponent>
    </div>
  );
}

type CardComponentProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function MovieCardComponent({
  title,
  description,
  children,
}: CardComponentProps) {
  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
