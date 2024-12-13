export const Total = ({ parts }) => {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)
    return (
        <p>Number of exercises {total}</p>
    )
}