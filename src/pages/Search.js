import React, {useEffect, useState} from 'react'
import SearchContainer from '../components/SearchContainer';
import '../assets/styles/search.css';
import QuizList from '../layouts/QuizList';
import { getQuizesByTags } from '../services/quiz';


export default function Search() {

  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const urlSearchParam = new URLSearchParams(window.location.search).get('q');
    setSearchString(urlSearchParam);
  },[]);

  return (
    <>
      <SearchContainer content={searchString} visibility={true}/>
      <main className='search'>
        <p className='result-text'>Resultate für: "{searchString}"</p>
        {searchString && <QuizList method={getQuizesByTags} options={{tags: searchString.split(' ')}} fallBackText={`Es konnten leider keine Ergebnisse für "${searchString}" gefunden werden`}/>}
      </main>
    </>
  )
}
