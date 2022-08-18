/**
 * Checks answer of a Question
 * @param {*} correctAnswers 
 * @param {*} answers 
 * @param {*} checkByText 
 * @returns 
 */
export default function checkAnswers(correctAnswers, answers, checkByText) {
  if (!answers || !answers.length) {
    return false;
  }
  return checkQuestion(correctAnswers, answers, checkByText);
}

export function checkQuestion(correctAnswersQuestion, answersQuestion, checkByText = false) {

  answersQuestion = answersQuestion.filter((value, index, self) => self.indexOf(value) === index); //Delete all posible duplicates

  let answerCount = getCorrectAnswersQuestionCount(correctAnswersQuestion, answersQuestion, checkByText);

  if (checkByText && answerCount) { //If One possible Answer is Correct
    return true;
  }
  return answerCount === correctAnswersQuestion.length; //If all possible answers are correct
}

function getCorrectAnswersQuestionCount(correctAnswers, answers, checkByText) {
  let answerCount = 0;

  correctAnswers.forEach(correctAnswer => {
    if (checkByText) {
      if (answers.includes(correctAnswer.answerText)) {
        answerCount++;
      }
    }
    else {
      if (answers.includes(correctAnswer.id)) {
        answerCount++;
      }
    }
  });

  return answerCount;
}

export function getCorrectAnswersCount(correctAnswers, answers, questions) {
  if (!answers || !answers.length) {
    return 0;
  }
  let correctAnswersCount = 0;
  correctAnswers.forEach((correctAnswer, idx) => {
    if (checkQuestion(correctAnswer, answers[idx], questions[idx].questionType === 'text')) {
      correctAnswersCount++;
    }
  });
  return correctAnswersCount;
}