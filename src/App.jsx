import { useState } from "react"
import { nanoid } from "nanoid"
import Welcome from './components/Welcome'
import Question from './components/Question'
import testData from "./data/testData"
import './App.css'

function App() {
  const [formData, setFormData] = useState(testData);

  function handleChange(event, id) {
    const { name, value } = event.target
    setFormData(oldData => {
      return oldData.map(question => {
        return question.question === name ? { ...question, selectedAnswer: value } : question
      })
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)
    setFormData(testData)
  }

  const answersElements = (answers, question, selected) => {
    return answers.map(answer => {
      return (
        <label htmlFor="" key={nanoid()}>
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
      <form onSubmit={handleSubmit}>
        {questions(formData)}
        <button type="submit" className="start-game">Submit</button>
      </form>
    </main>
  )
}

export default App
