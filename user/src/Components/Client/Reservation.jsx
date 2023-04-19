import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios/axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "tailwindcss/tailwind.css";
import Modal from "react-modal";
import Paypal from "./Paypal/Paypal";
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from "react-toastify"
import ModalSuccess from "./Modal/ModalSuccess";

function Reservation() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [slot, setSlot] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [filterdSlot, setFiltersSlot] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [submit, setSubmit] = useState(false);
 

const [modal,setmodal]=useState(false)

  console.log(checkedValues);

 console.log(filterdSlot,444);

  
  let { id } = useParams();
  
//    const  orderSuccess=()=>{
       
//      axios.post( "/order_success",{id,order,slot:checkedValues} , {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }).then((res)=>{
//         setSubmit(false)
//       })
//    }
  

 



  const handleSubmit=()=>{
  if(checkedValues.length!==0){
    setSubmit(true)

  }else{
    toast.error( "select a slot ")
   }
  }

  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((val) => val !== value));
    }
  };



  // const amount = 50;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "350px",
      width: "380px",
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    axios
      .get("/reservation_page", {
        params: {
          id,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTeacher(res.data.result);
      })
      .catch((err) => {});

    axios
      .get("/get_slot", {
        params: {
          id,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSlot(res.data.result);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios
      .post(
        "/filter_slot",
        {
          id,
          selectedDate,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
         
          console.log(res.data.result.slot, 55);
          setFiltersSlot(res.data.result.slot);
        }
        else{
            setFiltersSlot(["null"]); 
        }
      })
      .catch((err) => {});
  }, [selectedDate]);

  

  return (
    <div>
      <div className="flex">
        <div className="w-screen">
            <ToastContainer/>
          <div className="relative mx-auto mt-20 mb-20 max-w-screen-lg overflow-hidden rounded-t-xl bg-mycolors py-32 text-center shadow-xl shadow-gray-300">
            <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">
              Book an appointment
            </h1>
            <p className="mt-6 text-lg text-white">
              Get an appointment with our experienced accountants
            </p>
            <img
              className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div>

          <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
            <div className="">
              <p className="font-serif text-xl font-bold text-blue-900">
                Select a service
              </p>
              <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                <div className="relative ">
                  <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                    <a
                      href="#!"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      <img
                        className=" object-cover"
                        src={
                          teacher.image ? teacher.image : "../../../avatar.png"
                        }
                        alt=""
                      />
                    </a>
                  </div>
                </div>
       <button
       onClick={()=>setmodal(true)}
       
       
       >modal</button >
       {modal&&<ModalSuccess  modal={modal} setModal={setmodal}/>}
                <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>

                <label
                  className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-mycolors peer-checked:text-white"
                  for="radio_2"
                >
                  <h1 className="font-sans mt-5">
                    {" "}
                    Name :
                    <span className="mt-2 font-medium">{teacher.name}</span>
                  </h1>
                  <span className="text-xs uppercase">{teacher.class}</span>
                  <h1 className="font-sans mt-5">
                    {" "}
                    Sub :
                    <span className="text-xs uppercase font-bold">
                      {teacher.subject}
                    </span>
                  </h1>

                  <div className="gap-2 mt-5">
                    <span className="font-bold decoration-green-300">
                      FEE :
                    </span>
                    <span class="title-font font-medium text-2xl text-gray-900">
                      {teacher.FEE}
                    </span>
                  </div>
                </label>

                <div className="relative"></div>
              </div>
            </div>

            <div className="">
              <p className="mt-8 font-serif text-xl font-bold text-blue-900">
                Select a date
              </p>
              <div className="relative mt-4 w-56">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full text-gray-700 py-2 px-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="">
              <p className="mt-8 font-serif text-xl font-bold text-blue-900">
                Select a time
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
                {(filterdSlot.length !== 0 ? filterdSlot : slot).map(
                  (item, i) => (
                    <div>
                      <div class="flex items-center mb-4 gap-2 border-2 bg-mycolors hover:bg-mycolors_b ">
                        <input
                          defaultChecked={false}
                          onChange={handleCheckboxChange}
                          id={`default-checkbox${i}`}
                          type="checkbox"
                          value={item._id}
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 ml-2 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />

                        <button
                          onClick={() => {
                            openModal();
                            setSelectedData(item);
                          }}
                          className="rounded-lg px-4 py-2 font-mediumactive:scale-95  hover:bg-mycolors_b text-white"
                        >
                          Slot-{i + 1}
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-8 w-56 rounded-full border-8 border-mycolors_b bg-mycolors px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1"
            >
              Book Now
            </button>
            <div className="w-80 mt-10">
            {submit && 
             <Paypal amount={teacher.FEE} checkedValues={checkedValues}/>
             }
             </div>
          </div>
        </div>
        <script src="https://unpkg.com/flowbite@1.5.2/dist/datepicker.js"></script>

        {selectedData && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <div class="relative w-full p-4 overflow-hidden bg-white shadow-lg rounded-xl md:w-80 dark:bg-gray-800">
              <div class="flex items-center justify-between w-full mb-6">
                <p class="text-xl font-medium text-gray-800 dark:text-white">
                  Details
                </p>
                <button class="flex items-center text-gray-800 border-0 hover:text-black dark:text-gray-50 dark:hover:text-white focus:outline-none"></button>
              </div>
              <div class="flex items-center justify-between p-3 mb-2 bg-green-100 rounded">
                <div class="flex items-center justify-between w-full ml-2">
                  <p>date</p>
                  <p className="font-bold">{selectedData.date}</p>
                </div>
              </div>
              <div class="flex items-center justify-between p-3 mb-2 bg-purple-100 rounded">
                <div class="flex items-center justify-between w-full ml-2">
                  <p>Starting Time</p>
                  <p>{selectedData.startTime}</p>
                </div>
              </div>
              <div class="flex items-center justify-between p-3 mb-2 bg-yellow-100 rounded">
                <div class="flex items-center justify-between w-full ml-2">
                  <p>End Time</p>
                  <p>{selectedData.endTime}</p>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Reservation;
