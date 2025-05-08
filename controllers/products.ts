import { client, indexName } from "db/algolia";

export async function getProductById(objectID: string): Promise<any> {
  const response = await client.search({
    requests: [
      {
        indexName,
        query: "",
        filters: `objectID:${objectID}`,
      },
    ],
  });
  const results = response.results[0] as any;
  return results.hits;
}
