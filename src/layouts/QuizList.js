import React, {useEffect, useState} from 'react';
import QuizPreview from '../components/QuizPreview';
import '../assets/styles/quizList.css';
import LoadingScreen from '../components/LoadingScreen';

export default function QuizList({title, method, options, limit = 4, fallBackText}) {

  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [moreResponse, setMoreResponse] = useState(true);

  useEffect(() => {
    setLoading(true);
    method({...options, page, limit}).then(response => {
      if(!response.data.quizes.length){
        setMoreResponse(false);
      }
      setQuizes([...quizes, ...response.data.quizes]);
      setLoading(false)
    });
    
  },[method, options, limit, page]);

  return (
      <section className='quizlist-wrapper'>
          <h4>{title}</h4>
          <article className='quizlist'>
            {
              quizes.length ? quizes.sort((q1,q2) => q1.plays - q2.plays).map(quiz => <QuizPreview key={quiz.id} data={quiz}/>) : <p>{fallBackText}</p>
            }
          </article>
          {loading && <LoadingScreen/>}
          {
            limit && !loading && moreResponse ? <button className='show-more-button' onClick={() => setPage(page + 1)}>Mehr anzeigen</button> : ''
          }
      </section>
  )
}
