import React, { useRef, useState } from 'react';
import Input from '../components/Input';
import '../assets/styles/addQuiz.css';
import Question from '../components/Question';
import { useUser } from '../contexts/UserContext';
import AddQuestion from '../components/AddQuestion';
import {addQuiz as addQuizService} from '../services/quiz';

export default function AddQuiz() {

    const titleRef = useRef();
    const categoryRef = useRef();
    const tagRef = useRef();
    const isPublicRef = useRef();
    const { currentUser } = useUser();
    const [questions, setQuestions] = useState([]);


    let addQuiz = async e => {
        e.preventDefault();
        if(!questions.length){
            alert('Das Quiz benötigt mindestens eine Frage');
            return;
        }
        const quiz = {
            title: titleRef.current.value,
            category: categoryRef.current.value,
            tags: tagRef.current.value.split(' '),
            visibility: isPublicRef.current.checked ? 'public' : 'private',
            plays: 0,
            questions: questions
        }
        const formData = new FormData();
        formData.append('obj', JSON.stringify(quiz));
        try{
            await addQuizService(formData);
            alert("Das Quiz wurde erfolgreich hinzugefügt");
            window.location.reload();
        }
        catch(e){
            alert("Leider gab es einen Fehler, bitte versuche es erneut");
        }
    }

    if(!currentUser) return null;
    return (
        <main className='add-quiz'>
            <h1>Quiz hinzufügen</h1>
            <form className='add-quiz-form' onSubmit={addQuiz}>
                <Input label='Titel' reference={titleRef} type='text' placeholder='Titel...' required={true} />
                <Input label='Kathegorie' reference={categoryRef} type='text' placeholder='Informatik Sport Biologie...' required={true} />
                <Input label='Tags' reference={tagRef} type='text' placeholder='Quiz hart bwl finanzen Lernfeld4...' required={true} />
                <div className=''>
                    <input type='checkbox' id="public" ref={isPublicRef} name='public'/>
                    <label htmlFor='public'>Öffentlich</label>
                </div>
                <AddQuestion setQuestions={setQuestions}/>
                <button type='submit'>Quiz hinzufügen</button>
            </form>
            <div className='questions'>
                <p>Fragen:</p>
                {
                    questions.map(question => <Question key={question.id} data={question} />)
                }
            </div>
        </main>
    )
}
