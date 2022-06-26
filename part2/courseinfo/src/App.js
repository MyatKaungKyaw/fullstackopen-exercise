const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const totalExercises = course.parts.reduce((pval, cval) =>  pval+cval.exercises ,0);

  return (
    <Course course={course} totalExercises={totalExercises}/>
  );
}

const Course = (props) =>{
  return(
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total exercises={props.totalExercises} />
    </>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(part => (
        <Part 
          key={part.id} 
          part={part.name} e
          xercises={part.exercises} />
      ))}
    </>
  );
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercises}
    </p>
  );
}

export default App;