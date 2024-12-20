const Form = ({ newName, newNum, handleSubmit, handleNameChange, handleNumChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input placeholder="syötä nimi" onChange={handleNameChange} value={newName} />
        <br />
        number: <input placeholder="syötä numero" onChange={handleNumChange} value={newNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default Form