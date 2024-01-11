import { useState, useEffect } from 'react';
import './App.css';

function App() {

  let [questions, setquestion] = useState([]);
  let [CurrentQues, setCurrentQues] = useState(0);
  let Options = [];

  useEffect(function () {
    getdataApi()
  }, [])

  function getdataApi() {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => setquestion(res))
  }
  if (!questions.length) {
    return <h1>loading...</h1>
  }

  function nextQuestion() {
    setCurrentQues(CurrentQues + 1)
  }

  let incorrectAnswers = questions[CurrentQues].incorrectAnswers;
  Options.push(...incorrectAnswers);
  let correctAnswer = questions[CurrentQues].correctAnswer;
  Options.push(correctAnswer);

  return (
    <div className="App">
      <h1 id='quizhead'>.....Quiz App.....</h1>

      <div className='main'>

        <h4 id='ques'>{questions[CurrentQues].question.text}</h4>

        {
          Options.map((OptionsRender, index) => {
            return <button className='options' key={index}>{OptionsRender}</button>
          })
        }
        <br />
        <button onClick={nextQuestion}>Next</button>
        <button style={{ display: "none" }}>Restart</button>

      </div>


    </div>
  );
}

export default App;
