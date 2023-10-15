const Filter = ({filtering, handleFilteringChange}) => {
  return (<div>
    filter shown with <input value={filtering} onChange={handleFilteringChange}/>
  </div>)
}

export default Filter;