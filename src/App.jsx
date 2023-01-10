import { useState, useEffect } from "react"
import { decoder, shuffle } from "./utilities/helpers"
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'
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

  const getQuestions = async () => {
    const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    const { results } = await res.json()

    const questions = results.map(({ question, correct_answer, incorrect_answers, type }) => {
      const cleanAns = shuffle([correct_answer, ...incorrect_answers]).map(decoder)
      return ({
        question: decoder(question),
        correctAnswer: correct_answer,
        answers: type === "multiple" ? cleanAns : ["True", "False"],
        selectedAnswer: "",
      })
    })
    setFormData(questions)
  }

  function startQuiz() {
    setQuizState(prevState => ({
      ...prevState,
      startQuiz: !prevState.startQuiz
    }))
  }

  function resetQuiz() {
    setFormData(INITIAL_STATE.formData)
    setQuizState(INITIAL_STATE.quizState)
    setScore(INITIAL_STATE.score)
  }

  function handleQuiz(event) {
    const { id } = event.target

    if (id === 'start-quiz') {
      startQuiz()
      getQuestions()
      return
    }
    resetQuiz()
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

  return (
    <main>
      {
        !quizState.startQuiz ?
          <Welcome onClick={handleQuiz} />
          :
          <Quiz
            formData={formData}
            checkAnswers={quizState.checkAnswers}
            score={score}
            onChange={handleChange}
            onSubmit={handleSubmit}
            reset={handleQuiz}
          />
      }
    </main>
  )
}

export default App
