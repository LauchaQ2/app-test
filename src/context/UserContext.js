import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [productCarts, setProductsCart] = useState([])
  const [userLogged, setUserLogged] = useState(JSON.parse(localStorage.getItem('user')))
  const [localOk, setLocalOk] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [navbar, setNavbar] = useState(localStorage.getItem('nav'))
  const [img, setImg] = useState()
  const [products, setProducts] = useState([])
  const [someUp, setSomeUp] = useState(false)
  const [idUser, setIdUser] = useState()
  const [limit, setLimit] = useState('3')
  const [refresh, setRefresh] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [users, setUsers] = useState([])
  const [orderProducts, setOrderProducts] = useState({});
  const [sorted, setSorted] = useState()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(false)
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
  console.log('navbar', navbar)
  const [loader, setLoader] = useState(true);



  const getUsers = async () => {
    const res = await axios.get(`https://restserver-lautaro-quevedo.herokuapp.com/api/users?limit=${limit}`)
    setUsers(res.data.users)
  }

  useEffect(() => {
    getUsers()
    console.log(users)
  }, []);


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
        localStorage.setItem('nav', true)
        setUserLogged(data)
        const id = data.user.uid;
        setIdUser(id)
        setIsLogin(true)
        setLocalOk(true)
      })
      .catch(err => {
        console.log(err)
        let er = err;
        setError(true)
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
        setLocalOk(true)
        setRefresh(true)
        setSomeUp(false)
        setAddModal(true)
        setImg(null)
        console.log(refresh)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const updateProfileImg = () => {
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
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`https://restserver-lautaro-quevedo.herokuapp.com/api/products?limit=20`)
      const data = res.data.products
      setProducts(data)
    }
    getProducts()
    console.log(products)
  }, []);

  const sortAZ = () => {
    const data = products.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    })
    setOrderProducts(data)
    setSorted(true)
    console.log(orderProducts)
  }
  const sortZA = () => {
    const data = products.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    })
    setOrderProducts(data)
    setSorted(true)
    console.log(orderProducts)
  }
  const sortPriceExp = () => {
    const data = products.sort((a, b) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    })
    setOrderProducts(data)
    setSorted(true)
    console.log(orderProducts)
  }
  const sortPriceCheap = () => {
    const data = products.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    })
    setOrderProducts(data)
    setSorted(true)
    console.log(orderProducts)
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

  function isInCart(id) {
    return productCarts.some(productCart => productCart.id === id);
  }


  const addProducts = (productCart, quantity) => {
    if (isInCart(productCart.id)) {
      const newAddProducts = productCarts.map(currentElement => {
        if (currentElement.id === productCart.id) {
          console.log("el current tiene", currentElement.quantity)
          return { ...currentElement, quantity: currentElement.quantity + quantity }
        } else return currentElement
      })
      setProductsCart(newAddProducts)
    } else {
      setProductsCart(prev => [...prev, { ...productCart, quantity }]);
    }
  }

  const totalPrice = productCarts.reduce(function (acc, curr) {
    return acc + curr.quantity * curr.price;
  }, 0);

  console.log(productCarts)
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
    setLocalOk,
    addModal,
    setAddModal,
    navbar,
    setNavbar,
    img,
    error,
    setError,
    products,
    sortAZ,
    sorted,
    setProducts,
    orderProducts,
    sortZA,
    setSorted,
    sortPriceExp,
    sortPriceCheap,
    addProducts,
    productCarts,
    totalPrice
  }

  return (
    <UserContext.Provider value={data} >
      {children}
    </UserContext.Provider>
  )
}
export { UserProvider }
export default UserContext