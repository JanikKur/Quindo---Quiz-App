import React, {useRef} from 'react';
import '../assets/styles/authorization.css';
import {Link} from 'react-router-dom';
import Input from '../components/Input';
import {useUser} from '../contexts/UserContext';

export default function Register() {

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const {registerUser} = useUser();



  let login = async e => {
    e.preventDefault();
    if(!usernameRef.current.value || !passwordRef.current.value){
      alert('Username oder Passwort Fehlt');
      return;
    }
    try {
      await registerUser(usernameRef.current.value,emailRef.current.value, passwordRef.current.value);
      alert('Daten wurden erfolgreich aktualisiert');
    }
    catch (err) {
      alert("Leider ist ein Fehler aufgetreten, bitte versuche es erneut")
    }
  }

  return (
    <main className='register'>
      <form className='register-form' onSubmit={login}>
        <h3>Registrieren</h3>
        <Input label='Username' reference={usernameRef} placeholder='Nutzername...' type='text' required={true}/>
        <Input label='E-Mail' reference={emailRef} placeholder='E-Mail...' type='email' required={true}/>
        <Input label='Password' reference={passwordRef} placeholder='Passwort...' type='password' required={true}/>
        <button type='submit'>Registrieren</button><Link to='/login'>oder Anmelden</Link>
      </form>
    </main>
  )
}
