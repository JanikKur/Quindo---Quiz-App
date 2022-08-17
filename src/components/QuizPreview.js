import React from 'react';
import {Link} from 'react-router-dom';
import '../assets/styles/quizPreview.css';

export default function QuizPreview({data}) {
  return (
    <Link className='quiz-preview' to={`/quiz?id=${data.id}`}>
      <h3>{data.title}</h3>
    </Link>
  )
}
