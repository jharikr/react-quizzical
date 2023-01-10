import { nanoid } from "nanoid"

function Quiz({ formData, checkAnswers, score, onChange, onSubmit, reset }) {
    const answersElements = (question, answers, selected) => {
        return answers.map(answer => {
            return (
                <label htmlFor={answer} key={nanoid()}>
                    <input
                        type="radio"
                        id={answer}
                        name={question}
                        value={answer}
                        onChange={onChange}
                        checked={selected === answer}
                        required
                    />
                    {answer}
                </label>
            )
        })
    }

    const questions = (questions) => {
        return questions?.map(({ question, answers, selectedAnswer }) => {
            return (
                <fieldset key={nanoid()}>
                    <legend>{question}</legend>
                    {answersElements(question, answers, selectedAnswer)}
                </fieldset>
            )
        })
    }

    return (
        <form onSubmit={onSubmit}>
            {questions(formData)}
            {
                !checkAnswers ?
                    <button type="submit" id="check-answers" className="start-game">Check Answers</button>
                    :
                    <div>
                        <span>{score}</span>
                        <button type="reset" className="start-game" onClick={reset}>Play Again</button>
                    </div>
            }
        </form>
    )
}

export default Quiz