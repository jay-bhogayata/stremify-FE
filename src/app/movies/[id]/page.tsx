import api from "@/utils/api";
import Image from "next/image";

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
  const movie = response.data;

  return (
    <>
      <Details movie={movie} />
    </>
  );
}

const Details = ({ movie }: { movie: any }) => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <div className="absolute inset-0">
        <Image
          src={
            movie.images.find(
              (image: { image_type: string }) => image.image_type === "backdrop"
            )?.image_url || ""
          }
          alt={`${movie.title} backdrop`}
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Poster Image */}
          <div className="md:w-1/3 mb-8 md:mb-0">
            <Image
              src={
                movie.images.find(
                  (image: { image_type: string }) =>
                    image.image_type === "poster"
                )?.image_url || ""
              }
              alt={`${movie.title} poster`}
              width={300}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
          {/* Movie Details */}
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
              {movie.title}
            </h1>
            <p className="text-lg mb-4 drop-shadow-lg">{movie.synopsis}</p>
            <p className="mb-4 drop-shadow-lg">
              <span className="font-bold">Release Year:</span>{" "}
              {movie.release_year}
            </p>
            <p className="mb-4 drop-shadow-lg">
              <span className="font-bold">Duration:</span> {movie.duration}{" "}
              minutes
            </p>
            <p className="mb-4 drop-shadow-lg">
              <span className="font-bold">Age Rating:</span> {movie.age_rating}
            </p>
            {/* Genres */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Genres</h2>
              <div className="flex flex-wrap">
                {movie.genres.map(
                  (genre: {
                    genre_id: React.Key;
                    genre_name: React.ReactNode;
                  }) => (
                    <span
                      key={genre.genre_id}
                      className="bg-gray-800 text-sm px-2 py-1 rounded mr-2 mb-2 drop-shadow-lg"
                    >
                      {genre.genre_name}
                    </span>
                  )
                )}
              </div>
            </div>
            {/* Actors */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Actors</h2>
              <div className="flex flex-wrap">
                {movie.actors.map(
                  (actor: {
                    actor_id: React.Key;
                    actor_name: React.ReactNode;
                  }) => (
                    <span
                      key={actor.actor_id}
                      className="bg-gray-800 text-sm px-2 py-1 rounded mr-2 mb-2 drop-shadow-lg"
                    >
                      {actor.actor_name}
                    </span>
                  )
                )}
              </div>
            </div>
            {/* Content Warnings */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Content Warnings</h2>
              <div className="flex flex-wrap">
                {movie.warnings.map(
                  (warning: {
                    content_warning_id: React.Key;
                    warning_type: React.ReactNode;
                  }) => (
                    <span
                      key={warning.content_warning_id}
                      className="bg-red-700 text-sm px-2 py-1 rounded mr-2 mb-2 drop-shadow-lg"
                    >
                      {warning.warning_type}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
