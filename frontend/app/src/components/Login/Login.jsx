import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(email, password);

    try {
      const response = await axios.post('http://localhost:3000/login',
        JSON.stringify({email, password}),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      if (!error?.response) {
        setError('Server is offline');
      } else if (error.response == 401) {
        setError(error.response.data.message);
      }
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    setError('');
  }

  return (
    <div className="login-form-wrap">
      {user === null ? (
      <>
      <h2>Login</h2>
      <form className='login-form'>
        <input
          type='email'
          name='email'
          placeholder='Email'
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='btn-login'
          onClick={(e) => handleLogin(e)}
        >
          Login
        </button>
      </form>
      <p>{error}</p>
      </>
      ) : (
      <div>
        <h2>Welcome {user.name}</h2>
        <button
          type="button"
          className="btn-login"
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </button>
      </div>
      )}
  </div>
  );
}

export default Login;