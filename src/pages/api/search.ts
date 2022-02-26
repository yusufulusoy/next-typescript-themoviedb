import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchMoviesResponse>
) {
  /**
   * @api {get} /api/search Search movies
   * @apiName SearchMovies
   * @apiGroup API - Search Movies API Endpoint (Search)
   * @apiDescription Search movies by keyword, year, language, etc.
   *                 See the [Search Movies API](https://developers.themoviedb.org/3/search/search-movies)
   *                 for more information.
   */
  res.setHeader("Allow", ["GET"]);

  if (req.method === "GET") {
    try {
      /**
       * @description Search movies
       * @tutorial https://developers.themoviedb.org/3/search/search-movies
       * @param {string} query - Search query
       * @param {number} page - Page number
       * @param {string} language - ISO 639-1 language code
       * @param {string} region - ISO 3166-1 alpha-2 country code
       * @param {boolean} include_adult - Include adult movies in the results
       * @param {number} year - Filter results by release year
       * @returns {SearchMoviesResponse}
       * @example /api/search?query=matrix&page=2&language=en-US&region=US&include_adult=false&year=2020
       */
      const {
        query,
        page,
        language,
        region,
        include_adult,
        year,
        primary_release_year,
      } = req.query;
      const url = new URL(`${process.env.TMDB_API_URL}/search/movie`);
      /**
       * @description TMDB API key
       * @type {string}
       */
      url.searchParams.set("api_key", `${process.env.TMDB_API_KEY}`);
      /**
       * @description The search query. Required.
       * @type {string}
       * @example "The Matrix"
       */
      query && url.searchParams.append("query", query.toString());
      /**
       * @description The page of results to return. Required.
       * @type {number}
       * @default 1
       * @minimum 1
       * @maximum 1000
       */
      page && url.searchParams.append("page", page.toString());
      /**
       * @description ISO 639-1 language code. Optional.
       * @type {string}
       * @default en-US
       * @pattern ^[a-z]{2}-[A-Z]{2}$
       * @example en-US
       * @example tr-TR
       */
      language && url.searchParams.append("language", language.toString());
      /**
       * @description ISO 3166-1 alpha-2 country code.
       * @type {string}
       * @default US
       * @pattern ^[A-Z]{2}$
       * @example US
       * @example TR
       */
      region && url.searchParams.append("region", region.toString());
      /**
       * @description Include adult movies in the results.
       * @type {boolean}
       * @default false
       * @example false
       * @example true
       */
      include_adult &&
        url.searchParams.append("include_adult", include_adult.toString());
      /**
       * @description Filter results by release year.
       * @type {number}
       * @default null
       */
      year && url.searchParams.append("year", year.toString());
      /**
       * @description Filter results by primary release year.
       * @type {number}
       * @default null
       */
      primary_release_year &&
        url.searchParams.append(
          "primary_release_year",
          primary_release_year.toString()
        );

      /**
       * @description Fetches data from the API
       */
      const data = await fetch(url.toString()).then((response) =>
        response.json()
      );

      /**
       * @description Response
       * @type {SearchMoviesResponse}
       */
      res.status(200).json(data);
    } catch (error) {
      /**
       * @description Response
       * @type {ResponseErrorType}
       */
      res.status(500).end(error);
    }
  } else {
    /**
     * @description Response
     * @type {ResponseErrorType}
     */
    res
      .status(405)
      .json({ status_code: 405, status_message: "Method Not Allowed" });
  }
}
