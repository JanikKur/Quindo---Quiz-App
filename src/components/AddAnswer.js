import React, {useRef} from 'react';
import Input from './Input';
import { v4 as uuidv4 } from 'uuid';

export default function AddAnswer({setAnswers, answers, questionType}) {

    const answerTextRef = useRef();
    const isCorrectAnswerRef = useRef();

    let addAnswer = () => {
        if(!answerTextRef.current.value){
            alert('Es muss ein Text Vorhanden sein!');
            return;
        }
        const answer = {
            answerText: answerTextRef.current.value,
            isTrue: questionType === 'text' ? true : isCorrectAnswerRef.current.checked,
            id: uuidv4()
        }
        setAnswers(prev => [...prev, answer]);
        answerTextRef.current.value = '';
        if(questionType !== 'text'){
            isCorrectAnswerRef.current.checked = false;
        }
        answerTextRef.current.focus();
    }


    return (
        <div className='answers-wrapper'>
            <Input label='Antwort' reference={answerTextRef} className='answer-input' type='text' placeholder='Antwort Text...' required={false} />
            {questionType !== 'text' && <div className='answer-isCorrect'>
                <label htmlFor='correct'>korrekt</label>
                <input type='checkbox' id="correct" ref={isCorrectAnswerRef} disabled={questionType === 'radio'  && answers.filter(answer => answer.isTrue).length} name='correct' />
            </div>}
            <button type='button' className='add-answer-button' onClick={() => addAnswer()}>+</button>
        </div>
    )
}
