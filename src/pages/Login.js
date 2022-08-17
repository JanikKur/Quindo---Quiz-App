import React, {useRef, useState} from 'react';
import '../assets/styles/authorization.css';
import {Link} from 'react-router-dom';
import {useUser} from '../contexts/UserContext';
import Input from '../components/Input';
import LoadingScreen from '../components/LoadingScreen';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const {loginUser} = useUser();
  const [loading, setLoading] = useState(false);


  let login = async e => {
    e.preventDefault();
    setLoading(true);
    if(!emailRef.current.value || !passwordRef.current.value){
      alert('E-Mail oder Passwort Fehlt');
      return;
    }

    try{
      await loginUser(emailRef.current.value, passwordRef.current.value);
    }
    catch(e){
      setLoading(false);
      alert("Nutzername oder Passwort falsch");
    }
  }

  if(loading) return <LoadingScreen fullscreen={true}/>
  return (
    <main className='login'>
      <form className='login-form' onSubmit={login}>
        <h3>Anmelden</h3>
        <Input label='E-Mail' reference={emailRef} placeholder='E-Mail...' type='email' required={true}/>
        <Input label='Passwort' reference={passwordRef} placeholder='Passwort...' type='password' required={true}/>
        <button type='submit'>Anmelden</button><Link to='/register'>oder Registrieren</Link>
      </form>
    </main>
  )
}
