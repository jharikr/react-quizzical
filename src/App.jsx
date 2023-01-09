import { useState } from "react"
import { nanoid } from "nanoid"
import Welcome from './components/Welcome'
import Question from './components/Question'
import testData from "./data/testData"
import './App.css'

const INITIAL_STATE = {
  quizState: {
    startQuiz: false,
    checkAnswers: false
  },
  formData: testData,
  score: 0
}

function App() {
  const [quizState, setQuizState] = useState(INITIAL_STATE.quizState)
  const [formData, setFormData] = useState(INITIAL_STATE.formData);
  const [score, setScore] = useState(INITIAL_STATE.score);

  function startQuiz(event) {
    setQuizState(prevState => ({
      ...prevState,
      startQuiz: !prevState.startQuiz
    }))
  }

  function resetQuiz(event) {
    setFormData(INITIAL_STATE.formData)
    setQuizState(INITIAL_STATE.quizState)
    setScore(INITIAL_STATE.score)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(oldData => {
      return oldData.map(question => {
        return question.question === name ? { ...question, selectedAnswer: value } : question
      })
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const score = formData.reduce((acc, curr) => {
      return curr.correctAnswer === curr.selectedAnswer ? acc + 1 : acc
    }, 0)
    setScore(score)
    setQuizState(prevState => ({
      ...prevState,
      checkAnswers: !prevState.checkAnswers
    }))
    console.log("Running")
  }

  const answersElements = (answers, question, selected) => {
    return answers.map(answer => {
      return (
        <label htmlFor={answer} key={nanoid()}>
          <input
            type="radio"
            id={answer}
            name={question}
            value={answer}
            onChange={handleChange}
            checked={selected === answer}
          />
          {answer}
        </label>
      )
    })
  }

  const questions = (questions) => {
    return questions.map(question => {
      return (
        <fieldset key={nanoid()}>
          <legend>{question.question}</legend>
          {answersElements([...question.incorrectAnswers, question.correctAnswer], question.question, question.selectedAnswer)}
        </fieldset>
      )
    })
  }

  return (
    <main>
      {
        !quizState.startQuiz ?
          <Welcome onClick={startQuiz} />
          :
          <form onSubmit={handleSubmit}>
            {questions(formData)}
            {
              !quizState.checkAnswers ?
                <button type="submit" className="start-game">Check Answers</button>
                :
                <div>
                  <span>{score}</span>
                  <button type="reset" className="start-game" onClick={resetQuiz}>Play Again</button>
                </div>
            }
          </form>
      }
    </main>
  )
}

export default App
