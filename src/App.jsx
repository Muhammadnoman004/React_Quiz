import { useState, useEffect } from 'react';
import './App.css';

function App() {
  let [questions, setquestion] = useState([]);
  let [CurrentQues, setCurrentQues] = useState(0);
  let [selectOption, setSelectOption] = useState(null);
  let [marks, setMarks] = useState(0);
  let Options = [];

  useEffect(function () {
    getdataApi()
  }, [])

  function getdataApi() {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => setquestion(res))
  }
  console.log(questions)
  if (!questions.length) {
    return <h1>loading...</h1>
  }

  function nextQuestion() {
    if (Options[selectOption] == questions[CurrentQues].correctAnswer) {
      console.log("sahi hai");
      setMarks(++marks);
    }
    console.log(marks);
    setCurrentQues(CurrentQues + 1)

  }
  function restartques() {
    setCurrentQues(0)
  }


  let incorrectAnswers = questions[CurrentQues].incorrectAnswers;
  Options.push(...incorrectAnswers);
  let correctAnswer = questions[CurrentQues].correctAnswer;
  Options.push(correctAnswer);
  Options = shuffle(Options)

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  // Used like so
  var arr = [2, 11, 37, 42];
  shuffle(arr);
  console.log(arr);

  return (
    <div className="App">
      <h1 id='quizhead'>.....Quiz App.....</h1>

      <div className='main'>

        <h4 id='ques'>{questions[CurrentQues].question.text}</h4>

        {
          Options.map((OptionsRender, index) => {
            return <button className='options' key={index} onClick={() => setSelectOption(index)}>{OptionsRender}</button>
          })
        }
        <br />
        {
          CurrentQues === questions.length - 1 ? (
            <button onClick={restartques}>Restart</button>) : (
            <button onClick={nextQuestion}>Next</button>)
        }

      </div>


    </div>
  );
}

export default App;
