const GRAPHQL_API = "https://sly.usemy.app/graphql";

const fetchQuery = async (query, variables = {}) => {
  const req = await fetch(GRAPHQL_API, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await req.json();
  return data.data;
};

export const search = async (keyword) => {
  const query = `
    query Query($keyword: String!) {
      search(str: $keyword) {
        name
      }
    }
    `;
  const result = await fetchQuery(query, { keyword });
  return result.search;
};

export const login = async (pokemon) => {
  const query = `
    mutation Mutation($pokemon: String!) {
      login(pokemon: $pokemon) {
        name
        image
        lessons {
          slug
        }
      }
    }
    `;
  const result = await fetchQuery(query, { pokemon });
  return result.login;
};

export const enroll = async (slug) => {
  const query = `
    mutation Mutation($pokemon: String!) {
      enroll(slug: $slug) {
        name
        image
        lessons {
          slug
        }
      }
    }
    `;
  const result = await fetchQuery(query, { slug });
  return result.enroll;
};

export const unenroll = async (slug) => {
  const query = `
    mutation Mutation($slug: String!) {
      unenroll(slug: $slug) {
        name
        image
        lessons {
          slug
        }
      }
    }
    `;
  const result = await fetchQuery(query, { slug });
  return result.unenroll;
};

export const getLessons = async () => {
  const query = `
    query Lessons {
      lessons {
        slug
      }
    }
  `;
  const result = await fetchQuery(query);
  return result.lessons;
};

export const getUser = async () => {
  const query = `
    query User {
      user {
        name
        image
        lessons {
          title
          slug
        }
      }
    }
  `;
  const result = await fetchQuery(query);
  return result.user;
};

export const getPokemon = async (pokemon) => {
  const query = `
    query Query($pokemon: String!) {
      getPokemon(str: $pokemon) {
        name,
        image
      }
    }
    `;
  const result = await fetchQuery(query, { pokemon });
  return result.getPokemon;
};
