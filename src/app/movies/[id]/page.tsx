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
  const movie: Movie = response.data;

  return (
    <>
      <Details movie={movie} />
    </>
  );
}

interface Movie {
  title: string;
  synopsis: string;
  release_year: number;
  duration: number;
  age_rating: string;
  genres: Array<{ genre_id: number; genre_name: string }>;
  actors: Array<{ actor_id: number; actor_name: string }>;
  images: Array<{ image_type: string; image_url: string }>;
  additional_info: {
    origin_country: string;
    original_title: string;
    origin_country_certification: string;
    production_companies: Array<string>;
    director: string;
  };
}

const Details = ({ movie }: { movie: Movie }) => {
  const backdropImage =
    movie.images.find((image) => image.image_type === "backdrop")?.image_url ||
    "";
  const posterImage =
    movie.images.find((image) => image.image_type === "poster")?.image_url ||
    "";

  return (
    <div className="relative mt-4 min-h-screen flex flex-col text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={backdropImage}
          alt={`${movie.title} backdrop`}
          layout="fill"
          objectFit="cover"
          className="opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-90"></div>
      </div>

      <div className="relative z-10 flex-grow container mx-auto px-4 py-16 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-start">
          <MoviePoster title={movie.title} posterUrl={posterImage} />
          <MovieDetails movie={movie} />
        </div>
      </div>

      <JoinNowSection />

      <AdditionalInfo movie={movie} />
    </div>
  );
};

const MoviePoster = ({
  title,
  posterUrl,
}: {
  title: string;
  posterUrl: string;
}) => (
  <div className="md:w-1/3 mb-8 md:mb-0">
    <Image
      src={posterUrl}
      alt={`${title} poster`}
      width={300}
      height={450}
      className="rounded-lg shadow-lg"
    />
  </div>
);

const MovieDetails = ({ movie }: { movie: Movie }) => (
  <div className="md:w-2/3 md:pl-8">
    <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{movie.title}</h1>
    <div className="flex items-center mb-4">
      <span className="bg-yellow-500 text-black font-bold px-2 py-1 rounded mr-2">
        {movie.age_rating}
      </span>
      <span>{movie.release_year}</span>
      <span className="mx-2">•</span>
      <span>{`${movie.duration} minutes`}</span>
    </div>
    <p className="text-xl mb-6 leading-relaxed">{movie.synopsis}</p>
    <GenresList genres={movie.genres} />
    <ActorsList actors={movie.actors} />
  </div>
);

const GenresList = ({ genres }: { genres: Movie["genres"] }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold mb-2">Genres</h2>
    <div className="flex flex-wrap">
      {genres.map((genre) => (
        <span
          key={genre.genre_id}
          className="bg-gray-800 text-sm px-3 py-1 rounded-full mr-2 mb-2 drop-shadow-lg"
        >
          {genre.genre_name}
        </span>
      ))}
    </div>
  </div>
);

const ActorsList = ({ actors }: { actors: Movie["actors"] }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold mb-2">Starring</h2>
    <div className="flex flex-wrap">
      {actors.map((actor) => (
        <span
          key={actor.actor_id}
          className="bg-gray-800 text-sm px-3 py-1 rounded-full mr-2 mb-2 drop-shadow-lg"
        >
          {actor.actor_name}
        </span>
      ))}
    </div>
  </div>
);

const JoinNowSection = () => {
  return (
    <div className="relative z-20 py-12 mb-12">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg overflow-hidden">
          <div className="max-w-4xl mx-auto px-8 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-4xl font-bold">Ready to watch?</h2>
                <p className="text-xl mt-2">
                  Join now to start streaming this movie and more.
                </p>
              </div>
              <button
                className="bg-white text-red-600 hover:bg-gray-200 font-bold py-3 px-8 rounded-md text-xl transition duration-300"
                aria-label="Join Now"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdditionalInfo = ({ movie }: { movie: Movie }) => (
  <div className="relative z-10 py-12 bg-black bg-opacity-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">More Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <InfoItem label="Director" value={movie.additional_info.director} />
        <InfoItem
          label="Original Title"
          value={movie.additional_info.original_title}
        />
        <InfoItem
          label="Origin Country"
          value={movie.additional_info.origin_country}
        />
        <InfoItem
          label="Country Certification"
          value={movie.additional_info.origin_country_certification}
        />
        <InfoItem
          label="Production Companies"
          value={movie.additional_info.production_companies.join(", ")}
        />
      </div>
    </div>
  </div>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h3 className="text-lg font-semibold mb-1">{label}</h3>
    <p className="text-gray-300">{value}</p>
  </div>
);
