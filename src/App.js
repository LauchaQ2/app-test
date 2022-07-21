import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([])

  const getUsers = async() =>{
    const res =  await axios.get('https://restserver-lautaro-quevedo.herokuapp.com/api/users?limit=25')
    setUsers(res.data.users)
  }

  useEffect(() => {
    getUsers()
    }, []);

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      role: ''
  })
    const handleChange = (e) => {
      const {name, value} = e.target
      setFormData({...formData, [name] : value})
  } 


     const handleSubmitPost = (event) =>{
      event.preventDefault();
      console.log(formData)
      axios.post('https://restserver-lautaro-quevedo.herokuapp.com/api/users', formData)
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
     }
     
     return (
    <div className="App">
        <h1>LISTA DE USUARIOS</h1>
    {users.length === 0 && <p>Nada</p>}
    <ul>{users.map((user, i)=>{
      return(
        <div className='list'>
        <li>Usuario n°: {i}</li>
        <li key={i}>Nombre: {user.name}</li>
        <li>Email: {user.email}</li>
        </div>
        )
    })}
    <button onClick={()=>{getUsers()}}>Actualizar lista de usuarios</button>
    </ul>
    <div className='containerform'>
    <h1>CREAR USUARIO</h1>
    <form className='form' onSubmit={handleSubmitPost}>
      <input name='name' placeholder='name' onChange={handleChange}/>
      <input name='email' placeholder='email' onChange={handleChange}/>
      <input name='password' placeholder='password' onChange={handleChange}/>
      <input name='role' placeholder='role' onChange={handleChange}/>
      <button>Enviar</button>
    </form>

    </div>
    </div>
  );
}

export default App;
