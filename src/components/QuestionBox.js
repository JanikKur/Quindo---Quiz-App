import React, {useRef, useEffect} from 'react'

export default function QuestionBox({ quizData, currentQuestionIndex, setCurrentQuestionIndex, isSubmitted, submitQuiz, answers, setAnswers }) {
    const textAreaRef = useRef();
    
    useEffect(() => {
        if(quizData.questions[currentQuestionIndex].questionType === 'text'){
            textAreaRef.current.value = '';
            textAreaRef.current.focus();
            if(answers[currentQuestionIndex] && answers[currentQuestionIndex].length){
                textAreaRef.current.value = answers[currentQuestionIndex][0]
            }
        }
    }, [currentQuestionIndex])

    return (
        <article className='question-box'>
            <p className='question'>
                {quizData.questions[currentQuestionIndex].questionText}
            </p>
            <div className={`answers`}>
                {quizData.questions[currentQuestionIndex].questionType === 'radio' && quizData.questions[currentQuestionIndex].answers.map((answer) => {
                    return <div key={answer.id} className='answer-wrapper'><input type={quizData.questions[currentQuestionIndex].questionType} className={`answer-input ${isSubmitted && answer.isTrue && 'correct'}`} value={`${answer.id}`} disabled={isSubmitted} defaultChecked={answers[currentQuestionIndex]?.filter(answerTemp => answerTemp === answer.id).length} onChange={e => { setAnswers(prev => { prev[currentQuestionIndex] = [e.target.value]; return prev; }) }} name={`answer${currentQuestionIndex}`} id={answer.id} /><label htmlFor={answer.id}>{answer.answerText}</label></div>
                })}
                {quizData.questions[currentQuestionIndex].questionType === 'checkbox' && quizData.questions[currentQuestionIndex].answers.map((answer) => {
                    return <div key={answer.id} className='answer-wrapper'><input type={quizData.questions[currentQuestionIndex].questionType} className={`answer-input ${isSubmitted && answer.isTrue && 'correct'}`} value={`${answer.id}`} disabled={isSubmitted} defaultChecked={answers[currentQuestionIndex] && answers[currentQuestionIndex].includes(answer.id)} onChange={e => { setAnswers(prev => { if (!prev[currentQuestionIndex]) { prev[currentQuestionIndex] = [] }; if (!e.target.checked) { prev[currentQuestionIndex].splice(prev[currentQuestionIndex].indexOf(e.target.value), 1); return prev; }; prev[currentQuestionIndex].push(e.target.value); return prev; }) }} name={`answer${currentQuestionIndex}`} id={answer.id} /><label htmlFor={answer.id}>{answer.answerText}</label></div>
                })}
                {
                    quizData.questions[currentQuestionIndex].questionType === 'text' && <><textarea className={`text-input`} ref={textAreaRef} placeholder='Antwort eingeben...' onChange={e => { setAnswers(prev => { prev[currentQuestionIndex] = [e.target.value]; return prev; }) }} disabled={isSubmitted}></textarea>{isSubmitted && <div className={`answers-text`}>Antwortmöglichkeiten: {quizData.questions[currentQuestionIndex].answers.map((answer, idx) => <p key={idx}>{answer.answerText}</p>)}</div>}</>
                }
                {currentQuestionIndex < quizData.questions.length - 1 ? <button type='submit' className='submit-button' onClick={() => {setCurrentQuestionIndex(prev => (prev + 1) % quizData.questions.length)}}>Nächste Frage</button> : (!isSubmitted ? <button onClick={submitQuiz}>Quiz Abschließen</button> : '')}
            </div>
        </article>
    )
}
