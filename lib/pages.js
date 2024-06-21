import graphqlRequest from "./graphqlRequest";

export async function getPageslugs() {
  const query = {
    query: `query getpageslug {
  pages {
    nodes {
      slug
    }
  }
}`,
  };
  const resjson = await graphqlRequest(query);
  const slugs = resjson.data.pages.nodes;
  return slugs;
}

export async function getSinglepage(slug) {
  console.log('slug', slug)
  const query = {
    query: `query getSinglepage {
        pages(where: {name: "${slug}"}) {
          nodes {
            content(format: RENDERED)
            date
            modified
            slug
            title(format: RENDERED)
          }
        }
      }`,
  };
  const resjson = await graphqlRequest(query);
  const pageslugs = await resjson.data.pages.nodes[0];
  return pageslugs;
}
