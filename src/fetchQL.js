function fetchQL({ queryKey }) {
  const newPage = queryKey[1]
  console.log('args', newPage)
  // debugger
  return fetch('https://api.disneyapi.dev/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          characters(page: ${newPage}) {
            items {
              _id
              name
              imageUrl
              films
              tvShows
            }
            paginationInfo {
              totalPages
            }
          }
        }
      `,
      variables: {},
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result.data.characters.items
    });
}

export default fetchQL
