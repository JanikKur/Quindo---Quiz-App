import React, {useEffect, useState} from 'react';
import '../assets/styles/quiz.css';
import QuestionIndex from '../components/QuestionIndex';
import {MdOutlineFavoriteBorder, MdOutlineFavorite} from 'react-icons/md';
import { useUser } from '../contexts/UserContext';
import QuizTitle from '../components/QuizTitle';
import QuestionBox from '../components/QuestionBox';
import CorrectAnswersBar from '../components/CorrectAnswersBar';
import checkAnswers, { getCorrectAnswersCount } from '../utils/checkAnswers';
import LoadingScreen from '../components/LoadingScreen';
import shuffle from '../utils/randomizeArray';
import { getQuizById } from '../services/quiz';

export default function Quiz() {

  const { currentUser, toggleFavorization, isFavorized } = useUser();

  const [loading,setLoading] = useState(true)

  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [author, setAuthor] = useState();

  useEffect(() => {
    const quizID = new URLSearchParams(window.location.search).get('id');
    getQuizById({id: quizID}).then(response => {
      const quiz = response.data.quiz;
      quiz.questions = shuffle(quiz.questions);
      quiz.questions.map(question => {return {...question, answers: shuffle(question.answers)}}); //Randomize Answer Position
      setQuizData(quiz);
      const correctAnswersTemp = [];
      quiz.questions.forEach(question => {
        const correctQuestionAnswers = question.answers.filter(answer => answer.isTrue);
        correctAnswersTemp.push(correctQuestionAnswers);
      });
      setAuthor(quiz.author[0]?.username);
      setCorrectAnswers(correctAnswersTemp);
      setLoading(false);
    });
  },[]);

  let submitQuiz = () => {
    alert('Das Quiz wurde Abgeschlossen');
    setIsSubmitted(true);
  }

  

  if(loading) return <LoadingScreen fullscreen={true}/>
  if(!quizData) return null;
  return (
    <main className='quiz'>
      {currentUser && <section className='quiz-interaction-buttons'>
        <button className='favourite-button' onClick={() => toggleFavorization(quizData.id)}>{isFavorized() ? <MdOutlineFavorite className='icon'/> : <MdOutlineFavoriteBorder className='icon'/>}</button>
      </section>}
      <QuizTitle title={quizData.title} author={author || 'gelöschter Nutzer'}/>
      <section className='quiz-game'>
        <QuestionIndex questions={quizData.questions} isSubmitted={isSubmitted} correctAnswers={correctAnswers} answers={answers} setCurrentQuestionIndex={setCurrentQuestionIndex} currentQuestionIndex={currentQuestionIndex}/>
        <QuestionBox quizData={quizData} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} isSubmitted={isSubmitted} submitQuiz={submitQuiz} answers={answers} setAnswers={setAnswers}/>
        {isSubmitted && <button onClick={() => window.location.reload()}>Quiz wiederholen</button>}
      </section>
      {isSubmitted && <section className='quiz-answers'>
        <h3>Dein Ergebnis</h3>
        <article className='quiz-statistics'>
          <CorrectAnswersBar percentage={Math.round(correctAnswers.map((answer, idx) => checkAnswers(answer, answers[idx], quizData.questions[idx].questionType === 'text')).filter(elem => elem).length / correctAnswers.length *100)}/>
          <p>Du hast {getCorrectAnswersCount(correctAnswers, answers, quizData.questions)} von {correctAnswers.length} Fragen korrekt beantwortet</p>
        </article>
      </section>}
    </main>
  )
}
