import React from 'react';
import { useUser } from '../contexts/UserContext';
import QuizList from '../layouts/QuizList';
import { getQuizesByIds } from '../services/quiz';

export default function MyFavourites() {
    const { currentUser } = useUser();

    if(!currentUser) return null;
    return (
        <main>
            <h1>Meine Favoriten</h1>
            <QuizList method={getQuizesByIds} options={{ids: currentUser.favorites}} fallBackText='Du hast noch keine Favoriten'/>
        </main>
    )
}
