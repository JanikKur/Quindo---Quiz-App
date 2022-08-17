import React, {useRef, useState} from 'react';
import AddAnswer from './AddAnswer';
import Answer from './Answer';
import { v4 as uuidv4 } from 'uuid';
import Input from './Input';

export default function AddQuestion({setQuestions}) {

    const questionTextRef = useRef();
    const [questionType, setQuestionType] = useState(undefined);
    const [answers, setAnswers] = useState([]);

    let addQuestion = () => {
        if(!answers.length){
            alert('Die Frage benötigt mindestens eine Antwort');
            return;
        }
        const question = {
            id: uuidv4(),
            questionText: questionTextRef.current.value,
            questionType: questionType,
            answers: answers
        }
        setQuestions(prev => [...prev, question])
        setAnswers([]);
        questionTextRef.current.value = '';
        questionTextRef.current.focus();
    }

    return (
        <div className='questions-wrapper'>
            <Input label='Frage' reference={questionTextRef} className='question-title' type='text' placeholder='Frage Text...' required={false} />
            <select value={questionType} onChange={e => { setQuestionType(e.target.value)}}>
                <option value={undefined}>Art der Frage auswählen</option>
                <option value='checkbox'>Multiple Choice</option>
                <option value='radio'>Single Choice</option>
                <option value='text'>Text</option>
            </select>
            
            <div className='answers'>
                {
                    answers.map(answer => <Answer key={answer.id} data={answer} setAnswers={setAnswers}/>)
                }
            </div>
            
            <AddAnswer setAnswers={setAnswers} answers={answers} questionType={questionType}/>
            
            <button type='button' className='add-question-button' onClick={() => addQuestion()}>Frage hinzufügen</button>
        </div>
    )
}
