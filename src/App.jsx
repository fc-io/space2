import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.css'
import fetchQL from './fetchQL'

function App() {
  const [name, setName] = useState('')
  const query = useQuery({
    queryKey: ['character', name],
    queryFn: (arg) => fetchQL(arg),
    keepPreviousData: true
  })

  if (query.isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  // console.log('imageUrl', query?.data?.imageUrl)
  return (
    <div className="App">
      <h1>Disney</h1>
      {
        query.data === null ?
          <div>Type in a valid disney character name</div> :
          <>
            <div>Name: {query.data.name}</div>
            <div>
              <img
                key={query.data.imageUrl}
                src={query.data.imageUrl}
                loading="eager"
              /></div>
            <div>Films: {query.data.films.map((film) => <div key={film}>{film}</div>)}</div>
          </>
      }
      <input type="text"  onChange={(event) => setName(event.target.value)}/>
    </div>
  )
}

export default App
