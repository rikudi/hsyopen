export const Total = ({ parts }) => {
    /* 
    If parts = [
        { name: "Part 1", exercises: 10 },
        { name: "Part 2", exercises: 7 },
        { name: "Part 3", exercises: 14 }
    ]

    reduce works like this:
    1st iteration: s = 0, p.exercises = 10 → 0 + 10 = 10
    2nd iteration: s = 10, p.exercises = 7 → 10 + 7 = 17
    3rd iteration: s = 17, p.exercises = 14 → 17 + 14 = 31
    */
    const sum = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <p>Number of exercises {sum}</p>
    )
}