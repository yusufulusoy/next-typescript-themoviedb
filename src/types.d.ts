type GenreType = {
  id: number;
  name: string;
};

type ProductionCompanyType = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type ProductionCountryType = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguageType = {
  iso_639_1: string;
  name: string;
};

type MovieDetailType = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: object | null;
  budget: number;
  genres: GenreType[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanyType[];
  production_countries: ProductionCountryType[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguageType[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MovieSummaryType = Pick<
  MovieDetailType,
  | "poster_path"
  | "adult"
  | "overview"
  | "release_date"
  | "id"
  | "original_title"
  | "original_language"
  | "title"
  | "backdrop_path"
  | "popularity"
  | "vote_count"
  | "video"
  | "vote_average"
> & { genre_ids: number[] };

type ResponseErrorType = {
  status_message: string;
  status_code: number;
};

type ResponsePaginationType = {
  page: number;
  total_results: number;
  total_pages: number;
};

type SearchMoviesResponse =
  | (ResponsePaginationType & {
      results: MovieSummaryType[];
    })
  | ResponseErrorType;

type SimilarMoviesResponse =
  | (ResponsePaginationType & {
      results: MovieSummaryType[];
    })
  | ResponseErrorType;

type UpcomingMoviesResponse =
  | (ResponsePaginationType & {
      results: MovieSummaryType[];
    })
  | ResponseErrorType;
type MovieDetailsResponse = MovieDetailType | ResponseErrorType;
