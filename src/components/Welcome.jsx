function Welcome({ onClick }) {
    return (
        <div className="welcome">
            <h1 className='game-title main-text'>Quizzical</h1>
            <p className='game-description'>Get ready for a fun and fast-paced custom trivia game! </p>
            <button id='start-quiz' className='btn btn--start-game' onClick={onClick}>Start quiz</button>
        </div>
    )
}

export default Welcome