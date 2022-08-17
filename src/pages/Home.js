import React from 'react';
import MotivationText from '../components/MotivationText';
import WelcomeMessage from '../components/WelcomeMessage';
import { useUser } from '../contexts/UserContext';
import QuizList from '../layouts/QuizList';
import { getAllQuizes } from '../services/quiz';

export default function Home() {

    const { currentUser } = useUser();

    return (
        <main>
            <WelcomeMessage username={currentUser?.username}/>
            <MotivationText/>
            <QuizList method={getAllQuizes} options={{}} title='Unsere Beliebtesten Quizes'/>
        </main>
    )
}
