import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.css'
import fetchQL from './fetchQL'

function App() {
  const [page, setPage] = useState(146)

  const query = useQuery({
    queryKey: ['page', page],
    queryFn: (arg) => fetchQL(page, arg),
    keepPreviousData: true
  })

  if (query.isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  const characters = query?.data?.characters?.items
  const { totalPages } = query?.data?.characters?.paginationInfo

  const prevPrevPage = page - 2
  const prevPage = page - 1
  const nextPage = page + 1
  const nextNextPage = page + 2

  return (
    <div className="App">
      <h1>Disney {page}/{totalPages}</h1>
      {
        page > 2 ? (
          <button onClick={() => setPage((p) => Math.max(1, p - 2))}>
            {prevPrevPage}
          </button>
        ) : null
      }
      {
        page > 1 ? (
        <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          {prevPage}
        </button>
        ): null
      }
      <button disabled={true}>{page}</button>
      {
        page === totalPages ? null : (
          <button disabled={totalPages === page} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            {nextPage}
          </button>
        )
      }
      {
        page > totalPages - 2 ? null : (
          <button onClick={() => setPage((p) => Math.max(1, p + 2))}>
            {nextNextPage}
          </button>
        )
      }
      {characters.map(({ _id, name }) => <div key={_id} style={{marginTop: '1rem'}}>{name}</div>)}
    </div>
  )
}

export default App
