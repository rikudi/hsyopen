import { useState } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto llas', number: '003456' },
    { name: 'Artllas', number: '0403456' },
    { name: 'Arts', number: '040-123456' },
    { name: 'jorgos Hellas', number: '040-123456' },
    { name: 'Arto Hells', number: '040-1234' },
    { name: 'pena Has', number: '040-6' },
    { name: 'Arto Hellas', number: '040-1456' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterText, setFilterText] = useState('')

  /* FORM HANDLER
  - Prevents the default action of submitting a form
  - Checks if the name is already in the phonebook
  - If the name is not in the phonebook, the person is added to the phonebook
  - The input fields are cleared
  - An alert is shown to the user
  */
  // some() method tests whether at least one element in the array passes the test implemented by the provided function
  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    } else {
      setPersons(persons.concat({ name: newName, number: newNum }))
      setNewName('')
      setNewNum('')
      alert(`Added ${newName} to phonebook`)
    }
  }
  
  /* EVENT HANDLERS FOR NAME AND NUMBER INPUTS */ 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }
// The personsToShow variable is used to filter the persons array based on the filterText state.
  const personsToShow = filterText
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filterText.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <Form 
        newName={newName}
        newNum={newNum}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Numbers persons={personsToShow} />
    </div>
  )

}

export default App