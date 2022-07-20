import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async() =>{
      const res =  await axios.get('https://restserver-lautaro-quevedo.herokuapp.com/api/users?limit=10')
      setUsers(res.data.users)
    }
    getUsers()
    }, []);
  
    console.log(users)

  return (
    <div className="App">
    {users.length === 0 && <p>Nada</p>}
    <ul>{users.map((user, i)=>{
      return(
        <>
        <li key={i}>{user.name}</li>
        <li>{user.email}</li>
        </>
        )
    })}
    </ul>
    </div>
  );
}

export default App;
