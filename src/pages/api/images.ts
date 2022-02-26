import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * @api {get} /api/images Unofficial API endpoint for themoviedb.org images for proxy.
   * @apiName GetImages
   * @apiGroup API - Images API Endpoint (Images)
   * @apiDescription Get the images (posters and backdrops) for a movie.
   */
  res.setHeader("Allow", ["GET"]);

  if (req.method === "GET") {
    try {
      /**
       * @description Unofficial API endpoint for themoviedb.org images for proxy.
       * @param {string} path - The image source path.
       * @example /api/images?path=/5b3a8e8b0f8b81b8d038c4c8.jpg
       */
      const { path } = req.query;
      const url = new URL(`${process.env.TMDB_IMAGE_URL}/original${path}`);

      /**
       * @description Fetches the image from the API.
       */
      const response = await fetch(url.toString())
        .then((response) => response.blob())
        .then((blob) => blob.arrayBuffer())
        .then((buffer) => Buffer.from(buffer));

      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Content-Length", response.length);
      res.status(200).end(response);
    } catch (error) {
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
