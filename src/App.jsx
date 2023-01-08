import { useState, useId } from "react"
import Welcome from './components/Welcome'
import Question from './components/Question'
import testData from "./data/testData"
import './App.css'


function App() {
  const [formData, setFormData] = useState(testData);

  function handleChange(event, id) {
    const { name, value } = event.target
    setFormData(oldData => ({
      ...oldData,
      [name]: value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)
  }

  const answersElements = [...formData.incorrectAnswers, formData.correctAnswer].map(answer => {
    return (
      <label htmlFor={answer} key={useId()}>
        <input
          type="radio"
          name="selected"
          id={answer}
          value={answer}
          checked={formData.selected === answer}
          onChange={handleChange}
        />
        {answer}
      </label>
    )
  })

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend htmlFor="">{formData.question}</legend>
          {answersElements}
        </fieldset>
        <button type="submit" className="start-game">Submit</button>
      </form>
    </main>
  )
}

export default App
