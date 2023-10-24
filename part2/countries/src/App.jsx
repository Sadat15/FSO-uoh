import { useEffect, useState } from "react"
import Search from './Search.jsx';
import axios from "axios";
import Country from './Country.jsx';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data);
      })

  }, []);

  return (
    <div>
      <Search setSearch={setSearch}/>
      <Country search={search} setSearch={setSearch} countries={countries}/>
    </div>
  )
}

export default App;