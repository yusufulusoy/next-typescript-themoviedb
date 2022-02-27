import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SimilarMoviesResponse>
) {
  /**
   * @api {get} /api/similar Get similar movies by movie ID
   * @apiName GetSimilarMovies
   * @apiGroup API - Similar Movies API Endpoint (Similar)
   * @apiDescription Get the list of similar movies for a movie.
   *                 See the [Get Similar Movies](https://developers.themoviedb.org/3/movies/get-similar-movies)
   *                 for more information.
   */
  res.setHeader("Allow", ["GET"]);

  if (req.method === "GET") {
    try {
      /**
       * @description Get the list of similar movies for a movie by movie ID.
       * @tutorial https://developers.themoviedb.org/3/movies/get-similar-movies
       * @param {number} id - Movie ID
       * @param {string} language - ISO 639-1 language code
       * @param {number} page - Results page number
       * @returns {SimilarMoviesResponse}
       * @example /api/similar?id=299536&language=en-US&page=1
       */
      const { id, language, page } = req.query;
      const url = new URL(`${process.env.TMDB_API_URL}/movie/${id}/similar`);
      /**
       * @description TMDB API key
       * @type {string}
       */
      url.searchParams.set("api_key", `${process.env.TMDB_API_KEY}`);
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
       * @description The page of results to return. Required.
       * @type {number}
       * @default 1
       * @minimum 1
       * @maximum 1000
       */
      page && url.searchParams.append("page", page.toString());

      /**
       * @description Fetches data from the API
       */
      const data = await fetch(url.toString()).then((response) =>
        response.json()
      );

      /**
       * @description Response
       * @type {SimilarMoviesResponse}
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
