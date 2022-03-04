import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpcomingMoviesResponse>
) {
  /**
   * @api {get} /api/upcoming Get upcoming movies
   * @apiName GetUpcomingMovies
   * @apiGroup API - Upcoming Movies API Endpoint (Upcoming)
   * @apiDescription Get upcoming movies by country, language, etc.
   *                 See the [Upcoming Movies API](https://developers.themoviedb.org/3/movies/get-upcoming)
   *                 for more information.
   */
  res.setHeader("Allow", ["GET"]);

  if (req.method === "GET") {
    try {
      /**
       * @description Get upcoming movies
       * @tutorial https://developers.themoviedb.org/3/movies/get-upcoming
       * @param {string} region - ISO 3166-1 alpha-2 country code
       * @param {string} language - ISO 639-1 language code
       * @param {number} page - Page number
       * @returns {UpcomingMoviesResponse}
       * @example /api/upcoming?region=US&language=en-US&page=2
       */
      const { page, language, region } = req.query;
      const url = new URL(`${process.env.TMDB_API_URL}/movie/upcoming`);
      /**
       * @description TMDB API key
       * @type {string}
       */
      url.searchParams.set("api_key", `${process.env.TMDB_API_KEY}`);
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
       * @description Fetches data from the API
       */
      const data = await fetch(url.toString()).then((response) =>
        response.json()
      );

      /**
       * @description Response
       * @type {UpcomingMoviesResponse}
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
