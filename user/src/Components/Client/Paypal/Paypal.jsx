import React ,{useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";
import ModalSuccess from '../Modal/ModalSuccess';

function Paypal({amount,checkedValues}) {
    const[order,setOrder]=useState('')
    const [modal,setmodal]=useState(false)

    const totalAmount=checkedValues.length*amount


    console.log(totalAmount,"totl amount");

    const student = useSelector((state) => state.student._id);
    let { id } = useParams();

    const createOrder = (order_id) => {



        axios.post(
          "/creat_booking",
          { student, slot:checkedValues, amount,teacher:id,order_id},
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        ).then((res)=>{
            if(res.data.status){
                
                setOrder(res.data.result)
            }
        })
      };
  return (
    <div>

{modal?<ModalSuccess  modal={modal} setModal={setmodal}/>:


      <PayPalScriptProvider
                options={{
                  "client-id":process.env.REACT_APP_CLIENT_ID
                   
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order
                      .create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalAmount,
                            },
                          },
                        ],
                      })
                      .then((orderId) => {
                       
                       
                        return orderId;
                      });
                  }}
                  onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {

                        
                      // Your code here after capture the order
                    if(data.orderID){
                        createOrder(data.orderID);
                        setmodal(true)
                       
                        alert("its completed");
                      

                    }
                    else{
                    }
                    });
                  }}
                />
              </PayPalScriptProvider>}
    </div>
  )
}

export default Paypal
