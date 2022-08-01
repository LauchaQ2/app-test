import { createContext, useState } from "react";
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';


const UserContext = createContext();

const UserProvider = ({children}) => {
    const [userLogged, setUserLogged] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    
    const [user, setUser] = useState({
      email: '',
      password: ''
    })
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
      role: 'USER_ROLE'
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
      }
      const handleChangeForm = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
      }

    const login = () => {
        console.log(user)
          axios.post('https://restserver-lautaro-quevedo.herokuapp.com/api/auth/login', user)
          .then(response => {
            const data = {...response.data}
            setUserLogged(data)
            console.log(userLogged)
            setIsLogin(true)
            console.log(isLogin)
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


      const createUser = (event) => {
        event.preventDefault();
        console.log(formData)
        axios.post('https://restserver-lautaro-quevedo.herokuapp.com/api/users', formData)
          .then(response => {
            const data = {...response.data}
            setUserLogged(data)
            console.log(userLogged)
            setIsLogin(true)
            console.log(isLogin)
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


    const data = {
        login,
        handleChange,
        userLogged,
        isLogin,
        setUserLogged,
        setIsLogin,
        createUser,
        handleChangeForm
    }
    
    return(
        <UserContext.Provider value={data} >
            {children}
        </UserContext.Provider>
    )
}
export { UserProvider }
export default UserContext