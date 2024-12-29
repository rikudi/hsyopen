import React from 'react'

const Numbers = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default Numbers