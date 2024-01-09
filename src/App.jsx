import { useState, useEffect } from 'react';
import './App.css';

function App() {

  let [questions, setquestion] = useState([]);
  let [Options , setOptions] = useState([]);
  let [CurrentQues , setCurrentQues] = useState(0);

  useEffect(function () {
    getdataApi()
  }, [])

  function getdataApi() {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      // .then(res => setquestion(res))
      .then(res => {
        console.log(res)
        setquestion(res)
        let incorrectAnswers = res[CurrentQues].incorrectAnswers;
        let correctAnswer = res[CurrentQues].correctAnswer;
        incorrectAnswers.push(correctAnswer);
        Options.push(incorrectAnswers);
        console.log(Options);
      })

    
  }
  if(!questions.length){
    return <h1>loading...</h1>
  }

  function nextQuestion(){
    setCurrentQues(CurrentQues + 1)
    setOptions(Options + 1)
  }

  // Options.map((OptionsRender , index) =>{
  //   return <h4 key={index}>{OptionsRender}</h4>
  // })

  return (
    <div className="App">

      <h1>Quiz App</h1>
      
      <h4>{questions[CurrentQues].question.text}</h4>
      <button onClick={nextQuestion}>Next</button>
      <button style={{display: "none"}}>Restart</button>
    <ul>

    {
      <li>{Options}</li>
    }
    </ul>

    </div>
  );
}

export default App;
