const Persons = ({filtering, persons}) => {
  return (!filtering 
    ? persons.map((person) => <div key={person.id}>{person.name} {person.number}</div>)
    : persons.filter((person) => person.name.toLowerCase().includes(filtering.toLowerCase())).map((person) => <div key={person.id}>{person.name} {person.number}</div>)
  )
}

export default Persons;