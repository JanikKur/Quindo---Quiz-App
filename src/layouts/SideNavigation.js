import React from 'react';
import {Link} from 'react-router-dom';
import '../assets/styles/sidenavigation.css';
import { useUser } from '../contexts/UserContext';
import {AiFillHome} from 'react-icons/ai';
import {BiStats} from 'react-icons/bi';
import {MdQuiz} from 'react-icons/md';
import {AiFillSetting} from 'react-icons/ai';

export default function SideNavigation({ visibility, setVisibility }) {

    const { logout, currentUser } = useUser();

    return (
        <aside className={`side-navigation-wrapper ${visibility && 'active'}`} onClick={() => setVisibility(false)}>
            <nav className='side-navigation' onClick={e => e.stopPropagation()}>
                <button className='close-button' onClick={() => setVisibility(false)}>X</button>
                <div className='user-informations'>
                    <img className='user-image' alt={currentUser.username} src={`${process.env.REACT_APP_BACKEND_URL}${currentUser.profileImage}`}/>
                    <h3>{currentUser.username}</h3>
                </div>
                <div className='links'>
                    <Link className='link' to='/favorites'><AiFillHome className='link-icon'/> <label>Meine Favoriten</label></Link>
                    <Link className='link' to='/myQuizes'><MdQuiz className='link-icon'/><label>Meine Quizes</label></Link>
                    <Link className='link' to='/favourites'><BiStats className='link-icon'/><label>Meine Statistik</label></Link>
                    <Link className='link' to='/settings'><AiFillSetting className='link-icon'/><label>Meine Einstellungen</label></Link>
                </div>
                <button className='logout-button' onClick={() => {logout()}}>Abmelden</button>
            </nav>
        </aside>
    )
}
