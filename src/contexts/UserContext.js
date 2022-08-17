import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { remove } from '../utils/removeElement';

import { logoutUser, validateUser, loginUser as loginUserService, registerUser as registerUserService, updateUser, deleteUser as deleteUserService, favorizeQuiz as favorizeQuizService, unfavorizeQuiz as unfavorizeQuizService } from '../services/user';
import { getQuizesByAuthor } from '../services/quiz';
const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}



export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser(currentUser);
        setLoading(false);
    }, [currentUser]);


    useEffect(() => {
        validateUser().then(res => {
            setCurrentUser(res.data.user);
        }).catch(err => {});
    }, []);

    async function logout() {
        try {
            await logoutUser();
            setCurrentUser(null);
            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
    }

    async function loginUser(email, password) {
        if (!email || !password) {
            return;
        }
        try {
            const result = await loginUserService(email,password);
            if (result.status === 200) {
                setCurrentUser(prev => {return {...result.data}});
                navigate('/');
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async function registerUser(username, email, password) {
        if (!username || !email || !password) {
            return;
        }
        try {
            const result = await registerUserService(username, email, password);
            if (result.status === 201) {
                navigate('/login');
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async function updateUserData(newData) {
        if (!newData) {
            return;
        }
        try {
            const result = await updateUser(currentUser.id, newData);
            if (result.status === 200) {
                setCurrentUser(prev => {return {...prev, ...newData}});
                navigate('/settings');
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async function deleteUser(){
        try{
            const result = await deleteUserService(currentUser.id);
            if (result.status === 200) {
                await logout();
            }
        }catch(err){
            throw new Error(err);
        }
    }

    async function favorizeQuiz(quizId) {
        try{
            await favorizeQuizService(quizId);
            setCurrentUser(prev => {
                if(!prev.favorites.includes(quizId)) {
                    prev.favorites.push(quizId);
                }
                return {...prev};
            });
        }
        catch(err){
            throw new Error(err);
        }
    }

    async function unfavorizeQuiz(quizId) {
        try{
            await unfavorizeQuizService(quizId);
            setCurrentUser(prev => {
                prev.favorites = remove(prev.favorites, quizId);
                return {...prev};
            });
        }
        catch(err){
            throw new Error(err);
        }
    }

    
    async function toggleFavorization(quizId){
        if(isFavorized(quizId)){
            unfavorizeQuiz(quizId);
        }
        else{
            favorizeQuiz(quizId);
        }
    }
    
    function isFavorized(quizId){
        return currentUser.favorites.includes(quizId);
    }

    const value = {
        currentUser,
        setCurrentUser,
        logout,
        loginUser,
        registerUser,
        updateUserData,
        deleteUser,
        toggleFavorization,
        isFavorized
    };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}