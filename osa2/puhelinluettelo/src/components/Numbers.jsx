const Numbers = ({ persons }) => {

// The Numbers component is a simple component that renders a list of persons and their phone numbers.
  return (
    <ul>
      {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

export default Numbers