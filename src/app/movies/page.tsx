import api from "@/utils/api";
import React from "react";
import Movie from "./Movie";

export default async function Page() {
  const response = await api.get("content/movies/all");
  const movies = response.data;
  return (
    <>
      <div className=" px-10 mt-10 flex w-full  items-center justify-center">
        <h1 className="text-3xl font-semibold text-purple-500">
          Explore the latest movies on Stremify
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center   px-3">
        <div className="mt-10 px-10 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie: any) => (
              <Movie key={movie.movie_id} data={movie} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
