const Feedback = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
    </div>
  )
}

export default Feedback;
