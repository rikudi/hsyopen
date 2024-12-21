const Numbers = ({ persons, handleDelete }) => {
    // person are mapped and indetified by their id
  return (
    <ul>
      {persons.map(person => 
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
      )}
    </ul>
  )
}

export default Numbers