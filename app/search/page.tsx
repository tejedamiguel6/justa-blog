import SearchBar from '../components/searchBar/SearchBar'
import SearchResults from '../components/searchBar/SearchResults'

export default function Search({
  searchParams,
}: {
  searchParams: {
    query: string
  }
}) {
  const searchQuery = searchParams?.query
  return (
    <div>
      <p>Search</p>
      <div className='m-auto p-4 my-7'>
        <SearchBar />
        <SearchResults searchQuery={searchQuery} />
      </div>
    </div>
  )
}
