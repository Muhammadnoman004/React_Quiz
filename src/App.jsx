import { useState, useEffect } from 'react';
import './App.css';

function App() {
  let [questions, setquestion] = useState([]);
  let [CurrentQues, setCurrentQues] = useState(0);
  let [selectOption, setSelectOption] = useState(null);
  let [marks, setMarks] = useState(0);
  let [nextbtnClick, setnextbtnClick] = useState(false)
  let [result, setresult] = useState(false)
  let [sec, setsec] = useState(59);
  let [min, setmin] = useState(0);
  let Options = [];

  useEffect(function () {
    getdataApi()
    Timer()
  }, [])

  function getdataApi() {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => {
        setquestion(res)
        setmin(min = res.length - 1)
      })
  }
  console.log(questions)
  if (!questions.length) {
    return <img src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87_w200.webp" id='loader' alt="" />
  }

  function nextQuestion() {
    setnextbtnClick(false)
    if (Options[selectOption] == questions[CurrentQues].correctAnswer) {
      console.log("sahi hai");
      setMarks(++marks);
    }
    console.log(marks);
    setCurrentQues(CurrentQues + 1)

  }
  function submitbtn() {
    if (Options[selectOption] == questions[CurrentQues].correctAnswer) {
      console.log("sahi hai");
      setMarks(++marks);
      setresult(true)
    }
    else {
      setresult(true)
    }
    console.log(marks);

  }

  let incorrectAnswers = questions[CurrentQues].incorrectAnswers;
  Options.push(...incorrectAnswers);
  let correctAnswer = questions[CurrentQues].correctAnswer;
  Options.push(correctAnswer);
  // Options = shuffle(Options)

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


  function Timer() {
    let interval = setInterval(() => {
      setsec(sec--);
      if (sec == -2) {
        setmin(min--);
        setsec(sec = 59);
        if (min == -2) {
          setmin(min == 0);
          setsec(sec = 0);
          setresult(true);
          clearInterval(interval)
        }
      }
    }, 1000);
  }

  return (
    <div className="App">
      <h1 id='quizhead'>.....Quiz App.....</h1>

      {result ? (
        <div className='ResultDiv'>
          <h1 id='Resulthead'>{(marks / questions.length) * 100 >= 60 ? "Congratulations !" : "Sorry,"}</h1>
          <img src={(marks / questions.length) * 100 >= 60 ? "https://www.lolgifs.net/wp-content/uploads/2019/01/trump-funny-dance.gif" : "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/353ab64d-8593-41e3-8369-399e110449f7/decjxju-e963df79-8a9d-4957-a95f-21eeb0225b40.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM1M2FiNjRkLTg1OTMtNDFlMy04MzY5LTM5OWUxMTA0NDlmN1wvZGVjanhqdS1lOTYzZGY3OS04YTlkLTQ5NTctYTk1Zi0yMWVlYjAyMjViNDAuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fOd-3bk3zAhkkWKVTtq-4DJ4TEKGlJainF6f03OdkCI"} id='resultImg' alt="" />
          <h3 className='ResultText'>Total Score :  <span>{questions.length}</span></h3><hr />
          <h3 className='ResultText'>Your Score :  <span>{marks}</span></h3><hr />
          <h3 className='ResultText'>Percentage :  <span>{(marks / questions.length) * 100}%</span></h3>

        </div>

      ) : (

        <div className='main'>
          <div className='timerDiv'>
            <p className='timer'>{min}</p>
            <p className='timer'>:</p>
            <p className='timer'>{sec}</p>
          </div>
          <h4 id='ques'><span>{CurrentQues + 1}) </span>{questions[CurrentQues].question.text}</h4>

          {
            Options.map((OptionsRender, index) => {
              return <button className='options' key={index} onClick={() => setSelectOption(index, setnextbtnClick(true))}>{OptionsRender}</button>
            })
          }
          <br />
          {
            CurrentQues === questions.length - 1 ? (
              <button onClick={submitbtn} id='subbtn'>Submit</button>) : (
              <button onClick={nextQuestion} id='nextbtn' disabled={!nextbtnClick}>Next</button>)
          }

        </div>

      )}


    </div>
  );
}

export default App;
