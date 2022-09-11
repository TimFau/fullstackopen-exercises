const Header = ({ courseName }) => <h2>{courseName}</h2>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part part={part} key={part.id} />)}   
  </>

const Total = ({ parts }) => {
  const sum = parts.reduce( (a, b) => a + b.exercises, 0)
  return <strong>total of {sum} exercises</strong>
}

const Course = ({course}) => {
    return (
        <>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </>
    )
}

export default Course