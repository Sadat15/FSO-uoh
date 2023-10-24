const Search = ({setSearch}) => {

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  }

  return <div>find countries <input onChange={handleChange}/></div>
}

export default Search;