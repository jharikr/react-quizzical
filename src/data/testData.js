import { nanoid } from 'nanoid'
const testData = [
    {
    question: "Which of these TrackMania environments was NOT in the original game?",
    correctAnswer: "Bay",
    incorrectAnswers: [
      "Desert",
      "Snow",
      "Rally"
    ],
    selectedAnswer: "",
    id: nanoid()
  }, 
  {
    question: "What name is given to all baby marsupials?",
    correctAnswer: 	"Joey",
    incorrectAnswers: [
      "Calf",
      "Pup",
      "Cub"
    ],
    selectedAnswer: "",
    id: nanoid()
  } 
]

  export default testData 