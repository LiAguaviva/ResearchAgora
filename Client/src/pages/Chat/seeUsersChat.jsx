import React from 'react'

export const seeUsersChat = ({seeUsers, setSeeUsers}) => {
  return (
    <button onClick={()=> setSeeUsers(!seeUsers)}>see users</button>

  )
}
