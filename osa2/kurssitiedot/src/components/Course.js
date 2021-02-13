import React from 'react'



const Course = (props) => {
    return (
      <div>
        <Header courseName={props.name} />
        <Content contents={props.parts} />
         <Total contents={props.parts}/>
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h2>{props.courseName}</h2>
      </div>
    )
  }
  
  const Content = ({contents}) => {
    return (
      <div>
        {contents.map(onePart => 
           <Part key={onePart.id} 
                 partName={onePart.name} 
                 partsExercises={onePart.exercises} /> )}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        {props.partName} {props.partsExercises}
      </div>
    )
  }
  
  const Total = ({contents}) => {
    const total = contents.reduce((total, add) => total + add.exercises, 0)
    return (
      <div>
        <strong>total of {total} exercises</strong>
      </div>
    )
  }

  export default Course