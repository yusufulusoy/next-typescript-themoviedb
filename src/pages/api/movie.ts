import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieDetailsResponse>
) {
  /**
   * @api {get} /api/movie Get movie details
   * @apiName GetMovieDetails
   * @apiGroup API - Movie Details API Endpoint (Movie)
   * @apiDescription Get the details of a movie.
   *                 See the [Get Movie Details](https://developers.themoviedb.org/3/movies/get-movie-details)
   *                 for more information.
   */
  res.setHeader("Allow", ["GET"]);

  if (req.method === "GET") {
    try {
      /**
       * @description Movie details
       * @tutorial https://developers.themoviedb.org/3/movies/get-movie-details
       * @param {number} id - Movie ID
       * @param {string} language - ISO 639-1 language code
       * @param {string} append_to_response - Append additional information to the response
       * @returns {MovieDetailsResponse}
       * @example /api/movie?id=299536&language=en-US&append_to_response=videos,credits,images,keywords,release_dates
       */
      const { id, language, append_to_response } = req.query;
      const url = new URL(`${process.env.TMDB_API_URL}/movie/${id}`);
      /**
       * @description TMDB API key
       * @type {string}
       */
      url.searchParams.set("api_key", `${process.env.TMDB_API_KEY}`);
      /**
       * @description ISO 639-1 language code.
       * @type {string}
       * @default en-US
       * @example en-US
       * @example en
       */
      language && url.searchParams.append("language", language.toString());
      /**
       * @description Append additional information to the response.
       * @type {string}
       * @default null
       * @example videos,credits,images,keywords,release_dates
       */
      append_to_response &&
        url.searchParams.append(
          "append_to_response",
          append_to_response.toString()
        );

      /**
       * @description Fetch movie details
       */
      const data = await fetch(url.toString()).then((response) =>
        response.json()
      );

      /**
       * @description Response
       * @type {MovieDetailsResponse}
       */
      res.status(200).json(data);
    } catch (error) {
      /**
       * @description Response
       * @type {ErrorResponse}
       */
      res.status(500).end(error);
    }
  } else {
    /**
     * @description Response
     * @type {ErrorResponse}
     */
    res
      .status(405)
      .json({ status_code: 405, status_message: "Method Not Allowed" });
  }
}
