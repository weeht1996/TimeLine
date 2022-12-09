import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  //async for api call
  const handleSubmit = async e => {
    e.preventDefault() //to prevent refresh of page on click
    //don't need the full link because there is a proxy defined in the package.json as the header
    try {
      await axios.post("/auth/register", inputs, {
        'Content-Type':  'application/json'
      })
      
      navigate("/login")
    }catch (err) {
      setError(err.response.data)
    }
  };

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
      <input required type="text" placeholder='username' name='username' onChange={handleChange}/>
      <input required type="email" placeholder='email'name='email' onChange={handleChange}/>
      <input required type="password" placeholder='password'name='password' onChange={handleChange}/>
      <button onClick={handleSubmit}>Register</button>
      {err && <p>{err}</p>}
      <span>Have an account? <Link to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register