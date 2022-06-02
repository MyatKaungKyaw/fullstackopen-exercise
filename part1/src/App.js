const App = () => {
  const course = 'Half Stack application development';
  const part = [
    'Fundamentals of React',
    'Using props to pass data',
    'State of a component',
  ];
  const exercises = [10,7,14];

  return (
    <div>
      <Header course={course}/>
      <Content part = {part} exercises={exercises}/>
      <Total exercises={exercises}/>
    </div>
  );
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Content = (props) => {
  return (
    <>
      <Part part = {props.part[0]} exercise = {props.exercises[0]}/>
      <Part part = {props.part[1]} exercise = {props.exercises[1]}/>
      <Part part = {props.part[2]} exercise = {props.exercises[2]}/>
    </>
  );
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}
    </p>
  );
}

export default App;