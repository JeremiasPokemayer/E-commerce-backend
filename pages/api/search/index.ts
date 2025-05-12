import getOffsetAndLimitFromReq from "lib/request";
import { client, indexName } from "db/algolia";
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import initMiddleware from "lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
    origin: "*",
  })
);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
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
