import { useState, useEffect } from 'react';
import './App.css';

function App() {

  let [questions, setquestion] = useState([]);
  let [CurrentQues , setCurrentQues] = useState(0)

  useEffect(function () {
    getdataApi()
  }, [])

  function getdataApi() {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => setquestion(res))
  }
  if(!questions.length){
    return <h1>loading...</h1>
  }

  function nextQuestion(){
    setCurrentQues(CurrentQues + 1)
  }


  return (
    <div className="App">

      <h1>Quiz App</h1>
      
      <h4>{questions[CurrentQues].question.text}</h4>
      <button onClick={nextQuestion}>Next</button>
      <button style={{display: "none"}}>Restart</button>


    </div>
  );
}

export default App;