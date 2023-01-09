import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { decoder, shuffle } from "./utilities/helpers"
import Welcome from './components/Welcome'
import './App.css'

const INITIAL_STATE = {
  quizState: {
    startQuiz: false,
    checkAnswers: false,
  },
  formData: [],
  score: 0
}

function App() {
  const [quizState, setQuizState] = useState(INITIAL_STATE.quizState)
  const [formData, setFormData] = useState(INITIAL_STATE.formData);
  const [score, setScore] = useState(INITIAL_STATE.score);

  useEffect(() => {
    const getQuestions = async () => {
      const res = await fetch("https://opentdb.com/api.php?amount=10")
      const { results } = await res.json()

      const questions = results.map(({ question, correct_answer, incorrect_answers, type }) => {
        return ({
          question: decoder(question),
          correctAnswer: correct_answer,
          answers: type === "multiple" ? shuffle([correct_answer, ...incorrect_answers]) : ["True", "False"],
          selectedAnswer: "",
          id: nanoid()
        })
      })
      setFormData(questions)
    }
    getQuestions()
    console.log("API FETCHED")
  }, [quizState.startQuiz])

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
  }

  const answersElements = (question, answers, selected) => {
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
          // required
          />
          {answer}
        </label>
      )
    })
  }

  const questions = (questions) => {
    return questions?.map(({ question, answers, selected }) => {
      return (
        <fieldset key={nanoid()}>
          <legend>{question}</legend>
          {answersElements(question, answers, selected)}
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
                <button type="submit" id="check-answers" className="start-game">Check Answers</button>
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
