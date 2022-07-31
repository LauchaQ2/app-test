import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([])

  const [limit, setLimit] = useState('3')
  const [logged, setLogged] = useState('')
  const [userLogged, setUserLogged] = useState({})

  const getUsers = async () => {
    const res = await axios.get(`https://restserver-lautaro-quevedo.herokuapp.com/api/users?limit=${limit}`)
    setUsers(res.data.users)
  }

  useEffect(() => {
    getUsers()
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleLimit = (e) => {
    var regex = /[^0-9]/g;
    e.target.value = e.target.value.replace(regex, "");
    setLimit(e.target.value)
  }
  const login = (event) => {
    event.preventDefault();
    console.log(formData)
    axios.post('https://restserver-lautaro-quevedo.herokuapp.com/api/auth/login', formData)
      .then(res => {
        console.log(res.data)
        setUserLogged(res.data)
        setLogged(res.status)
      })
      .catch(err => {
        console.log(err.response.data.errors)
        let er = err.response.data.errors;
        if (er.lenght === 1) {
          alert(er)
        } er.map(error => {
          alert(error.msg)
        })
      })
  }

  const handleSubmitPost = (event) => {
    event.preventDefault();
    console.log(formData)
    axios.post('https://restserver-lautaro-quevedo.herokuapp.com/api/users', formData)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.response.data.errors)
        let er = err.response.data.errors;
        if (er.lenght === 1) {
          alert(er)
        } er.map(error => {
          alert(error.msg)
        })
      })
  }


  return (
    <div className="App">
      <div className='containerform'>
        {logged === 200
          ?<>
          <div className='profile'>
            <div className='box-left'>
              <img src={userLogged.user.img} />
            </div>

            <div className='box-right'>
            <h1>{userLogged.user.name}</h1>
            <h3>{userLogged.user.email}</h3>
            <h3></h3>
            </div>
          </div>
          <button onClick={() => setLogged('')}>Logout</button>
          </>
          :
          <>
            <h1>Iniciar Sesión</h1><form className='form' onSubmit={login}>
              <input name='email' placeholder='email' onChange={handleChange} />
              <input name='password' placeholder='password' onChange={handleChange} />
              <button>Login</button>
            </form>
          </>
        }

      </div>
    </div>
  );
}

export default App;
