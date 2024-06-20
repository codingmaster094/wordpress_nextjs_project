import graphqlRequest from "./graphqlRequest";

export async function getPostList(endCursor = null, taxonomy = null) {
  let condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}}`;
  
  // Adjust the filter condition based on the taxonomy key and value
  if (taxonomy && taxonomy.key === "categoryName") {
    condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}, categoryName: "${taxonomy.value}"}`;
  } else if (taxonomy && taxonomy.key === "categoryId") {
    condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}, categoryId: "${taxonomy.value}"}`;
  }

  const query = {
    query: `query {
      posts(${condition}) {
        nodes {
          date
          slug
          title
          excerpt(format: RENDERED)
          featuredImage {
            node {
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                }
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }`,
  };

  try {
    const resJson = await graphqlRequest(query);

    if (!resJson || !resJson.data || !resJson.data.posts) {
      throw new Error("Invalid GraphQL response: missing 'posts' data.");
    }

    return resJson.data.posts;
  } catch (error) {
    throw new Error("Failed to fetch posts.");
  }
}

export async function getSinglepost(slug) {
  const query = {
    query: `query getSinglePost {
  post(id: "${slug}", idType: SLUG) {
    content(format: RENDERED)
    date
    excerpt(format: RENDERED)
    modified
    slug
    title(format: RENDERED)
    databaseId
    featuredImage {
      node {
        mediaDetails {
          sizes {
            sourceUrl
            width
            height
          }
        }
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
  }
}`,
  };
  const resjson = await graphqlRequest(query);
  const singlePost = resjson.data.post;
  return singlePost;
}

export async function getpostSlug() {
  const query = {
    query: `query getpostSlug {
  posts {
    nodes {
      slug
    }
  }
}`,
  };
  const resjson = await graphqlRequest(query);
  const slugs = resjson.data.posts.nodes;
  return slugs;
}

export async function getCategoryslug() {
  const query = {
    query: `query CategorySlug {
  categories {
    nodes {
      slug
    }
  }
}`,
  };
  const resjson = await graphqlRequest(query);
  const categories = resjson.data.categories.nodes;
  return categories
}

export async function getCategoryDetails(categoryName) {
  const query = {
    query: `query {
      category(id: "${categoryName}", idType: SLUG) {
        count
        name
        slug
      }
    }`,
  };

  try {
    const resJson = await graphqlRequest(query);
    if (!resJson || !resJson.data || !resJson.data.category) {
      throw new Error("Invalid GraphQL response: missing 'category' data.");
    }

    return resJson.data.category;
  } catch (error) {
    throw new Error("Failed to fetch category details.");
  }
}
