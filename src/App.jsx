import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.css'

// const fetchFromApi = () => {
//   return
// }

function App() {
  // const [count, setCount] = useState(0)
  const query = useQuery({
    queryKey: ['page'],
    queryFn: () => {
      return fetch('https://api.spaceflightnewsapi.net/v3/articles')
        .then((response) => response.json())
        .then((data) => {
          return data
        })
    }
  })
  // console.log(query)

  if (query.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="App">
      <h1>Space News</h1>
      {query.data.map(({ id, title }) => <div key={id} style={{marginTop: '1rem'}}>{title}</div>)}
    </div>
  )
}

export default App
