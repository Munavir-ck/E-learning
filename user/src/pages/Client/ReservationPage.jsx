import React from 'react'

import Navbar from "../../Components/Client/Navbar";
import Classes from '../../Components/Client/Classes';
import Footer from '../../Components/Client/Footer';
import Head from '../../Components/Client/Head';
import Reservation from '../../Components/Client/Reservation';

function ReservationPage() {
  return (
    <div>
        <Navbar/>
        {/* <Head/> */}
        <Reservation/>
        <Footer/>
        
      
    </div>
  )
}

export default ReservationPage
