import { Fragment } from "react"
import { nanoid } from "nanoid"

function Quiz({ formData, checkAnswers, score, onChange, onSubmit, reset }) {
    const answersElements = (question, answers, selected) => {
        return answers.map(answer => {
            return (
                <Fragment key={nanoid()}>
                    <input
                        type="radio"
                        id={answer}
                        name={question}
                        value={answer}
                        onChange={onChange}
                        checked={selected === answer}
                        required
                    />
                    <label htmlFor={answer}>{answer}</label>
                </Fragment>
            )
        })
    }

    const questions = (questions) => {
        return questions?.map(({ question, answers, selectedAnswer }) => {
            return (
                <div key={nanoid()}>
                    <fieldset>
                        <legend className="main-text">{question}</legend>
                        {answersElements(question, answers, selectedAnswer)}
                    </fieldset>
                    <hr />
                </div>
            )
        })
    }

    return (
        <form onSubmit={onSubmit}>
            {questions(formData)}
            {
                !checkAnswers ?
                    <div className="form--btn">
                        <button type="submit" className="btn btn--form">Check Answers</button>
                    </div>

                    :
                    <div className="form--btn">
                        <span className="score">{`You scored ${score}/${formData.length} correct answers`}</span>
                        <button type="reset" className="btn " onClick={reset}>Play Again</button>
                    </div>
            }
        </form>
    )
}

export default Quiz