import React, { useRef, useEffect } from 'react'
import '../assets/styles/searchContainer.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchContainer({visibility, content}) {

    const searchRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if(searchRef?.current){
            searchRef.current.focus();
        }
    },[visibility]);
    
    useEffect(() => {
        if(content && searchRef?.current){
            searchRef.current.value = content;
        }
    },[content]);
    
    let searchSubmit = e => {
        e.preventDefault();
        navigate(`/search?q=${searchRef.current.value}`);
    }

    return (
        <aside className={`search-container ${visibility && 'active'}`}>
            <form onSubmit={searchSubmit}>
                <input type='text' ref={searchRef} required/><button type='submit'><AiOutlineSearch /></button>
            </form>
        </aside>
    )
}
