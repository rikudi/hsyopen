const Numbers = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person => 
        <div key={person._id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person._id)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Numbers