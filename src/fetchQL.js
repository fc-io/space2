function fetchQL(args, { queryKey }) {
  const key = queryKey[1]
  const newPage = args
  // console.log('args', newPage, key)
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
      console.log('results')
      return result.data
    });
}

export default fetchQL
