import React from 'react'
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { useUser } from '../contexts/UserContext';

export default function FavorizationButton({ quizId }) {

    const { toggleFavorization, isFavorized } = useUser();

    return (
        <button className='favourite-button' onClick={() => toggleFavorization(quizId)}>{isFavorized(quizId) ? <MdOutlineFavorite className='icon' /> : <MdOutlineFavoriteBorder className='icon' />}</button>
    )
}
