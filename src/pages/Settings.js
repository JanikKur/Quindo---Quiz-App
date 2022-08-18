import React, { useRef } from 'react';
import Input from '../components/Input';
import { useUser } from '../contexts/UserContext';
import '../assets/styles/settings.css';

export default function Settings() {

    const { currentUser, updateUserData: updateUserDataCtx } = useUser();
    const previewImageRef = useRef();
    const usernameRef = useRef();
    const userImageRef = useRef();
    const emailRef = useRef();

    let updateUserData = e => {
        e.preventDefault();
        if (!usernameRef.current.value || !emailRef.current.value) {
            alert('Es muss der ein Username und eine E-Mail vorhanden sein!')
            return;
        }
        const newData = {
            username: usernameRef.current.value,
            email: emailRef.current.value
        }
        if (userImageRef.current.files[0]) {
            newData['file'] = userImageRef.current.files[0]
        }
        updateUserDataCtx(newData);
    }


    if (!currentUser) return null;
    return (
        <main>
            <div className='user-informations'>
                <img className='user-image' alt={currentUser.username} ref={previewImageRef} onClick={() => userImageRef.current.click()} src={`${currentUser.profileImage}`} />
                <h3>{currentUser.username}</h3>
            </div>
            <form className='user-form' onSubmit={updateUserData}>
                <input type='file' ref={userImageRef} onChange={e => previewImageRef.current.src = URL.createObjectURL(e.target.files[0])} className='file-input' />
                <Input label='Username' defaultValue={currentUser.username} reference={usernameRef} type='text' placeholder='Username' required />
                <Input label='E-Mail' defaultValue={currentUser.email} reference={emailRef} type='email' placeholder='E-Mail' required />
                <button type='submit'>Speichern</button>
            </form>
        </main>
    )
}