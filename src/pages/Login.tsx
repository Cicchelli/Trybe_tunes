import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmailAction } from '../redux/actions';

function Login() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setEmailAction(email));
    navigate('/carteira');
  };
  
  const pass = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const valid = password.length >= 6;
  const button = !pass || !valid;

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          E-mail:
          <input
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label>
          Senha:
          <input
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          onClick={ handleLogin }
          disabled={ button }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;