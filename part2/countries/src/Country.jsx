import CountryView from './CountryView.jsx';

const Country = ({search, setSearch,countries}) => {

  const searchContent = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));

  let content = <></>;

  if(searchContent.length > 10) {
    content = "Too many matches, specify another filter";
  } else {
      const handleClick = (country) => {
        setSearch(country);
      }
      content = searchContent.map(country => <div key={country.name.common}>{country.name.common}<button onClick={() => handleClick(country.name.common)}>show</button></div>)
  }

  if(searchContent.length === 1) {
    const countryObject = searchContent[0];
    content = <CountryView countryObject={countryObject}/>;
  }

  return (
    <div>
      {search && content}
    </div>
  )
}

export default Country;
