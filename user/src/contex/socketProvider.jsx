import { createContext, useContext, useMemo } from "react"
import React from 'react'
import {io} from 'socket.io-client'

const socketContext=createContext(null)

export const  useSocket =()=>{
    const  socket=useContext(socketContext)
    return socket
}

export const SocketProvider=(probs)=> {

    const socket=useMemo(()=>io("localhost:5001"))
  return (
    <socketContext.Provider  value={socket}>
      {probs.children}
    </socketContext.Provider>
  )
}
