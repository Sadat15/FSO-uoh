import Part from './Part.jsx';

function Content({parts, exercises}) {
  return(
  <>
    <Part part={parts[0].part} exercise={exercises[0].exercise}/>
    <Part part={parts[1].part} exercise={exercises[1].exercise}/>
    <Part part={parts[2].part} exercise={exercises[2].exercise}/>
  </>)
  
}

export default Content;