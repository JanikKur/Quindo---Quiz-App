import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../assets/styles/navigation.css';
import {AiOutlineSearch} from 'react-icons/ai';
import {GrFormAdd} from 'react-icons/gr';
import {useUser} from '../contexts/UserContext';
import Logo from '../components/Logo';
import SearchContainer from '../components/SearchContainer';
import SideNavigation from './SideNavigation';

export default function Navigation() {

  const {currentUser} = useUser();
  const [showSearch, setShowSearch] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <>
    <nav className='main-navigation'>
        <Logo/>
        <div className='navigation-links'>
            {currentUser && <Link to='/add' className='navigation-link'><GrFormAdd className='icon'/></Link>}
            <button className='navigation-link' onClick={() => setShowSearch(prev => !prev)}><AiOutlineSearch className='icon'/></button>
            {currentUser ?  <img className='user-image' alt={currentUser.username} onClick={() => setShowSideNav(prev => !prev)} src={`${currentUser.profileImage}`}/>  : <Link to='/login'>Anmelden</Link>}
        </div>
    </nav>
        <SearchContainer visibility={showSearch}/>
        {currentUser && <SideNavigation visibility={showSideNav} setVisibility={setShowSideNav}/>}
      </>
  )
}
