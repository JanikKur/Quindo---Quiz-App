import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Quiz from '../pages/Quiz';
import AddQuiz from '../pages/AddQuiz';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import MyQuizes from '../pages/MyQuizes';
import MyFavorites from '../pages/MyFavorites';
import NotFound from '../pages/NotFound';

export default function RoutesComp() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/add' element={<AddQuiz/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/myquizes' element={<MyQuizes/>}/>
        <Route path='/favorites' element={<MyFavorites/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}
