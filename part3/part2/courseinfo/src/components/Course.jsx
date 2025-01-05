const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <p>Total of {total} exercises</p>
      </div>
    );
  };
  
  const Header = ({ name }) => <h1>{name}</h1>;
  
  const Content = ({ parts }) => (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
  
  const Part = ({ name, exercises }) => (
    <p>
      {name} {exercises}
    </p>
  );
  
  export default Course;
  