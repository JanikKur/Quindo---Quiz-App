import React from 'react';
import QuizList from '../layouts/QuizList';
import { useUser } from '../contexts/UserContext';
import { getQuizesByAuthor } from '../services/quiz';

export default function MyQuizes() {

    const { currentUser } = useUser();

    if(!currentUser) return null;
    return (
        <main>
            <h1>Meine Quizes</h1>
            <QuizList  method={getQuizesByAuthor} options={{authorId: currentUser.id}} fallBackText='Du hast noch keine Quizes erstellt'/>
        </main>
    )
}
