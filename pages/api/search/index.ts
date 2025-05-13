import getOffsetAndLimitFromReq from "lib/request";
import { client, indexName } from "db/algolia";
import type { NextApiRequest, NextApiResponse } from "next";
import { corsMiddleware } from "lib/cors";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const ended = corsMiddleware(req, res);
  if (ended) return;

  const { offset, limit } = getOffsetAndLimitFromReq(req);
  const query = req.query.q as string;
  const response = await client.search({
    requests: [
      {
        indexName,
        page: offset > 1 ? Math.floor(offset / limit) : 0,
        query,
        hitsPerPage: limit,
      },
    ],
  });
  const results = response.results[0] as any;
  res.send({
    results: results.hits,
    pagination: {
      offset,
      limit,
      total: results.nbHits,
    },
  });
}
