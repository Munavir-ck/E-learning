import React, { useState } from "react";
import Slot from "../../Components/Tutor/Slot";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Time_mange() {
  const initialState = { date: "", endTime: "", startTime: "" };

  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [submit,setSubmit]=useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  console.log(formValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    if (Object.keys(formErrors).length == 0) {

        axios.post("/tutor/create_slot",{
            formValues
        }, { headers: {
            Authorization: localStorage.getItem('tutortoken')
          }
         
        }).then((res)=>{
            if(res.data.status){
                toast.success('success')
                setSubmit(true)
            }
            else{
                toast.error('error')  
            }

        }).catch((err)=>{
            toast.error('error')
            console.log(err);
        })
    }
  };

  const validate = (values) => {
    console.log(formErrors);
    const errors = {};
    let currentDate = new Date();
               console.log( new Date(values.date),2222); 

    console.log(currentDate);

    if (!values.date) {
      errors.date = "date is required";
      toast.error( "date is required")
    }
    if (!values.endTime) {
      errors.endTime = "End Time is required";
      toast.error( "End Time is required")
      // } else if (regex.test(values.email)) {
      //   errors.email = "This is not a valid email format";
    }
    if (!values.startTime) {
      errors.startTime = "Start Time is required";
      toast.error( "Start Time is required")
    }
    if (values.startTime > values.endTime) {
      errors.properTime = "Choose a proper time";
      toast.error( "Choose a proper time")
    }
    if ( currentDate >new Date(values.date)) {
        errors.properDate = "Choose a proper date";
        toast.error("Choose a proper date")
      }

    return errors;
  };

  return (
    <div className=" h-screen overflow-y-auto">
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
            <ToastContainer/>
          <form>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                
                  <label
                    for="date"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    onChange={handleChange}
                    value={formValues.date}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                {/* <div className="mb-5">
                  <label
                    for="time"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    step="3600"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] appearance-none outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div> */}
              </div>
            </div>

            <div className="mb-5 pt-3">
              <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                SELECT A TIME
              </label>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                  
                    <label
                      for="time"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      id="time"
                      step="3600"
                      onChange={handleChange}
                      value={formValues.startTime}
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] appearance-none outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                   
                    <label
                      for="time"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      End Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      id="time"
                      step="3600"
                      onChange={handleChange}
                      value={formValues.endTime}
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] appearance-none outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                {/* <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="Enter state"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div> */}
                {/* <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="post-code"
                      id="post-code"
                      placeholder="Post Code"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div> */}
              </div>
            </div>

            <div>
              <button 
              type="submit"
              onClick={handleSubmit}
               className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
          <Slot  values={submit}/>
        </div>
      </div>
    </div>
  );
}

export default Time_mange;
