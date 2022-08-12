import React from 'react'

const InfoProfile = ({userLogged}) => {
  return (
    <div className='container-full'>
    <h2>MI INFORMACIÓN PERSONAL</h2>
    <label>Nombre</label>
    <input value={userLogged.user.name} readOnly={true}/>
    <label>E-mail</label>
    <input value={userLogged.user.email} readOnly={true}/>
    </div>
  )
}

export default InfoProfile