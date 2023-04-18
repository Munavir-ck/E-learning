import React from 'react'
import Navbar from "../../Components/Client/Navbar";
import List_bookings from '../../Components/Client/List_bookings';
import Footer from '../../Components/Client/Footer';
import Head from '../../Components/Client/Head';


function List_booking_page() {
  return (
    <div>
      <Navbar/>
     <Head title={ "Yourt Booking"}/>
    <List_bookings/>
      <Footer/>
    </div>
  )
}

export default List_booking_page
