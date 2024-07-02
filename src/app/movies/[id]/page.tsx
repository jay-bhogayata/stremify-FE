import { Suspense } from "react";
import api from "@/utils/api";
import { MovieContent } from "@/components/MovieContent";
import { Movie } from "@/types";

export async function generateStaticParams() {
  const response = await api.get("content/movies/all");
  const movies = response.data;
  return movies.map((movie: { movie_id: any }) => ({
    id: movie.movie_id.toString(),
  }));
}

export default async function MoviePage({
  params,
}: {
  params: { id: number };
}) {
  const response = await api.get(`content/movies/${params.id}`);
  const movie: Movie = response.data;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MovieContent movie={movie} />
    </Suspense>
  );
}
