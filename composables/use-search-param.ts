export function useSearchParam() {
  const search = useRouteQuery('search', '', {
    transform: String,
  })

  const setSearch = (value: string) => {
    search.value = value
  }

  return {
    search,
    setSearch,
  }
}
