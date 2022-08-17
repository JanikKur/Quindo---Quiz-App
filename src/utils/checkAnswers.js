export default function checkAnswers(correctAnswers, answers, checkByText){
    if(!answers || !answers.length){
        return false;
    }
    return checkQuestion(correctAnswers, answers, checkByText);
}

export function checkQuestion(correctAnswersQuestion, answersQuestion, checkByText = false){
    let answerCount = 0;
    if(!answersQuestion || !answersQuestion.length){
      return false;
    }
    answersQuestion = answersQuestion.filter((value, index, self) => self.indexOf(value) === index); //Delete all posible duplicates


    correctAnswersQuestion.forEach((correctAnswer,idx) => {
        if(checkByText){
            if(answersQuestion.includes(correctAnswer.answerText)){
              answerCount++;
            }
        }
        else{
            if(answersQuestion.includes(correctAnswer.id)){
              answerCount++;
            }
        }
    });

    if(checkByText && answerCount ){
        return true;
    }
    if(checkByText && !answerCount ){
        return false;
    }
    if(answerCount !== correctAnswersQuestion.length){
      return false;
    }
    return true;
  }

export function getCorrectAnswersCount(correctAnswers, answers, questions){
    if(!answers || !answers.length){
        return 0;
    }
    let correctAnswersCount = 0;
    correctAnswers.forEach((correctAnswer, idx) => {
      if(checkQuestion(correctAnswer, answers[idx], questions[idx].questionType === 'text')){
        correctAnswersCount++;
      }
    });
    return correctAnswersCount;
  }