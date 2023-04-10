import React from 'react'

import Time_mange from '../../Components/Tutor/Time_mange'
import Sidebar from '../../Components/Tutor/TutorNavbar'


function Time_managePage() {
  return (
    <div className='h-screen flex w-full '>
    <Sidebar/>
    <div className='w-full'>
    <Time_mange/>
 
    </div>
  </div>
  )
}

export default Time_managePage
