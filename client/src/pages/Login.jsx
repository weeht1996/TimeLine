import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  //async for api call
  const handleSubmit = async e => {
    e.preventDefault() //to prevent refresh of page on click
    //don't need the full link because there is a proxy defined in the package.json as the header
    try {
      await login(inputs)
      //to homepage on successful login
      navigate("/")
    }catch (err) {
      setError(err.response.data)
    }
  };

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
      <input type="text" placeholder='username'name='username' onChange={handleChange}/>
      <input type="password" placeholder='password' name='password' onChange={handleChange}/>
      <button onClick={handleSubmit}>Login</button>
      {err && <p>{err}</p>}
      <span>Don't have an account? <Link to='/register'>Register</Link></span>
      </form>
    </div>
  )
}

export default Login