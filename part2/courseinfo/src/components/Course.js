import React from 'react'

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
            exercises={part.exercises} />
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

export default Course