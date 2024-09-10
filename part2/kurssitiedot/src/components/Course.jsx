import Content from './Content'
import Total from './Total'
import Title from './Title'

const Course = ({ course }) => {
  const { name, parts } = course
  const totalExercises = parts.reduce(
    (sum, { exercises }) => sum + exercises,
    0
  )

  return (
    <div>
      <Title text={name} />
      <Content parts={parts} />
      <Total total={totalExercises} />
    </div>
  )
}

export default Course
