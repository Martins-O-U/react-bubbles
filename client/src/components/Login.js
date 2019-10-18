import React, {useState} from "react";
import axiosWithAuth  from './AxiosWithAuth';

const Login = (props) => {
  const credentials = {
    username: '',
    password: ''
  }
  const [login, setLogin] = useState(credentials)

  const handleChange = e => {
    e.persist();
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }
  const submitForm = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/login', login)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      props.history.push('/protected');
      // console.log(res)
    })
    .catch(err => console.log(err.message))
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className='login'>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={submitForm} className='loginForm'>
        <h3>Please Enter Your Login Details </h3>
        <div>
          <input name='username' placeholder='Enter username...' value={login.username} onChange={handleChange} />
        </div>
        <div>
          <input name='password' placeholder='Enter Password...' value={login.password} onChange={handleChange} />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
