import { algoliasearch } from "algoliasearch";

const client = algoliasearch("4704QIVSMF", "f3c979df2b174385c24731d78b6fafa6");
const indexName = "products";

export { client, indexName };
