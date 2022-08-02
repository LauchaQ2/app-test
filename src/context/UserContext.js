import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(JSON.parse(localStorage.getItem('user')))
  const [localOk, setLocalOk] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [img, setImg] = useState({})
  const [someUp, setSomeUp] = useState(false)
  const [idUser, setIdUser] = useState()
  const [refresh, setRefresh] = useState(false);
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

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1500);
  }, []);

  const login = async () => {
    console.log(user)
    await axios.post('https://restserver-lautaro-quevedo.herokuapp.com/api/auth/login', user)
      .then(response => {
        const data = { ...response.data }
        localStorage.setItem('user', JSON.stringify(data))
        setUserLogged(data)
        const id = data.user.uid;
        setIdUser(id)
        setIsLogin(true)
        setLocalOk(true)
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

  const onChangePicture = (e) => {
    console.log(img);
    const image = e.target.files[0];
    setImg(image);
    setSomeUp(true)
  };

  const update = (e) => {
    e.preventDefault();
    const formDat = new FormData()
    formDat.append('archivo', img);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
    }
    const url = `https://restserver-lautaro-quevedo.herokuapp.com/api/uploads/users/${idUser}`;
    axios.put(url, formDat)
      .then((response) => {
        const data = { user: { ...response.data } }
        console.log(data)
        localStorage.setItem('user', JSON.stringify(data))
        setUserLogged(data)
        setRefresh(true)
        setSomeUp(false)
        console.log(refresh)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const updateProfileImg = () => {
    alert("Your file is being uploaded!")
    console.log(img)
    axios.put(`https://restserver-lautaro-quevedo.herokuapp.com/api/uploads/users/${idUser}`, img)
      .then(response => {
        console.log(response)
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
        const data = { ...response.data }
        localStorage.setItem('user', JSON.stringify(data))
        setUserLogged(data)
        console.log(userLogged)
        const idc = data.user.uid;
        console.log(data)
        setIdUser(idc)
        console.log(idUser)
        setIsLogin(true)
        setLocalOk(true)
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
    handleChangeForm,
    onChangePicture,
    setImg,
    updateProfileImg,
    update,
    setRefresh,
    refresh,
    someUp,
    loader,
    setLoader,
    localOk,
    setLocalOk
  }

  return (
    <UserContext.Provider value={data} >
      {children}
    </UserContext.Provider>
  )
}
export { UserProvider }
export default UserContext