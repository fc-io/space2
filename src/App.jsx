import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.css'
import fetchQL from './fetchQL'

function App() {
  const [page, setPage] = useState(1)
  console.log('page: ', page)

  const query = useQuery({
    queryKey: ['page', page],
    queryFn: (arg) => fetchQL(page, arg),
    // keepPreviousData: true
  })

  if (query.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="App">
      <h1>Disney</h1>
      <button onClick={() => setPage(Math.max(1, page - 1))}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      {query.data.map(({ _id, name }) => <div key={_id} style={{marginTop: '1rem'}}>{name}</div>)}
    </div>
  )
}

export default App
