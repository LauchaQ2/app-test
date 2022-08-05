import React from 'react'

const InfoProfile = ({userLogged}) => {
  return (
    <h2>{userLogged.user.email}</h2>
  )
}

export default InfoProfile