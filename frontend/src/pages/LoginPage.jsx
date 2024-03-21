import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);
    setLoginInProgress(false);
    navigate('/map')
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-4xl mb-4">
        Login
      </h1>
      <form className="flex flex-col max-w-xs mx-auto" 
        onSubmit={handleFormSubmit}
      >
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={email}
          disabled={loginInProgress}
          onChange={(e) => setEmail(e.target.value)}
          className='my-4'
        />
        <input 
          type="password" 
          name="password"
          placeholder="Password"
          value={password}
          disabled={loginInProgress}
          onChange={(e) => setPassword(e.target.value)}
          className='my-4'
        />
        <button 
          type="submit"
          disabled={loginInProgress}
        >
          Login
        </button>
      </form>
    </section>
  )
}

export default LoginPage