import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

function ModalSuccess({ modal,setModal}) {

  const navigate=useNavigate()
  if (!modal) return null;


  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "380px",
      width: "400px",
      overflow:"hidden",
     
    },
  };

  return (
    <>
      <div 
      onClick={()=>setModal(false)}
      class="h-screen w-screen bg-mycolors absolute ">
        <Modal 
        // className="scrollbar-hide"
        isOpen={true} contentLabel="Example Modal" style={customStyles}>
         
            <div class="bg-white p-6  md:mx-auto">
              <svg
                viewBox="0 0 24 24"
                class="text-green-600 w-16 h-16 mx-auto my-6"
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                ></path>
              </svg>
              <div class="text-center">
                <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Payment Done!
                </h3>
                <p class="text-gray-600 my-2">
                  Thank you for completing your secure online payment.
                </p>
                <p> Have a great day! </p>
                <div class="py-10 text-center">
                  <a
                   onClick={()=>navigate("/")}
                    href="#"
                    class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                  >
                    GO HOME
                  </a>
                </div>
              </div>
            </div>
       
        </Modal>
      </div>
    </>
  );
}

export default ModalSuccess;
