function fetchQL({ queryKey }) {
  const name = queryKey[1]
  return fetch('https://api.disneyapi.dev/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          characterByName(name: "${name}"){
            _id
            name
            films
            imageUrl
          }
        }
      `,
      variables: {},
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result.data.characterByName
    });
}

export default fetchQL
