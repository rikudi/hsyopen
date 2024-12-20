// Header component displays the course name as h1
const Header = ({ name }) => <h1>{name}</h1>

// Part component renders a single course part with its name and number of exercises
const Part = ({ name, exercises }) => 
  <p>{name} {exercises}</p>

// Content component maps through all parts and renders them using Part component
const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </>

// Total component calculates and displays the sum of all exercises
const Total = ({ parts }) => {
      // Calculate total using reduce method:
  // - parts.reduce takes two arguments: callback function and initial value (0)
  // - For each iteration:
  //   * sum: accumulated value from previous iterations
  //   * part: current part object being processed
  //   * part.exercises: number of exercises in current part
  //   * The arrow function adds current part's exercises to accumulator (sum)
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>total of {total} exercises</strong></p>
}

// Main Course component that combines all other components
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
