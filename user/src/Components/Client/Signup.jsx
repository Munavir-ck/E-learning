import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner/Spinner";
import { signup } from "../../API/userReq";
import { get_otp, verify_otp } from "../../API/userReq";

const Signup = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    class: "",
    address: "",
    city: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [isCheck, setCheck] = useState(false);
  const [otp, setOtp] = useState(false);
  const [storeOTP, setStoreotp] = useState("");
  const navigate = useNavigate();
  const [isLoading,setLoading]=useState(false)

  const handleOtp = async () => {
    const number = formValues.phone;
    setOtp(true);
    get_otp(number)
      
  };

  const handleChangeotp = (e) => {
    const OTP = e.target.value;
    setStoreotp(OTP);
  };

  

  const submitOtp = () => {
   
    const number = formValues.phone;
    verify_otp(number,storeOTP)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          setCheck(true);
        } else {
          toast.error(res.data.message);
          setCheck(false);
        }
      });
  };
  const handleChange = (e) => {

   
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmit(true);
    if (isCheck) {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        setLoading(true)

        signup(formValues)
       
          .then((res) => {
           
            if (res.data.status) {
              setLoading(false)
              setSubmit(true);
              toast.success("success");
              navigate("/login");
            } else {
              seterrorMessage(res.data.message);
           
              setSubmit(false);
            }
          });
      }
    } else {
     
      toast.error("OTP NOT VERIFIED");
    }
  };
 
  const validate = (values) => {
   
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.name) {
      errors.name = "name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
      // } else if (regex.test(values.email)) {
      //   errors.email = "This is not a valid email format";
    }
    if (!values.password) {
      errors.password = "password is required";
    }
     if (values.password.length < 6) {
      errors.password = "password must be more than six character";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    } 
     if (values.phone.length > 10||values.phone.length <10) {
      errors.phone = "enter a valid number";
    } 
     if (!values.class) {
      errors.class = "enter a class";
    }
     if (!values.address) {
      errors.address = "enter address";
    }
     if (!values.city) {
      errors.city = "enter your nearest city";
    }
    
    

    return errors;
  };
  

  return (
    <div class={`min-h-screen p-6 bg-gray-100 flex items-center justify-center ${isLoading&&"pointer-events-none opacity-20"}`}> {isLoading&&<Spinner/>}
      <div class="container max-w-screen-lg mx-auto">
        <div>
          <ToastContainer />
          <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div class="text-gray-600">
                <p class="font-medium text-lg">Student Register</p>
                <p>Please fill out all the fields.</p>
              </div>
                <div class="lg:col-span-2">
              <form   onSubmit={handleSubmit}>
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div class="md:col-span-5">
                      <label for="full_name">Full Name</label>
                    
                      <input
                        placeholder={formErrors.name}
                        value={formValues.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="full_name"
                        class="placeholder-red-500 h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div class="md:col-span-5">
                      <label for="email">Email Address</label>
                      <input
                        value={formValues.email}
                        onChange={handleChange}
                        type="text"
                        name="email"
                        id="email"
                        class=" placeholder-red-500 h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder={formErrors.email}
                      />
                    </div>

                    <div class="md:col-span-3">
                      <label for="address">Address / Street</label>
                      <input
                        value={formValues.address}
                        onChange={handleChange}
                        type="text"
                        name="address"
                        id="address"
                        class=" placeholder-red-500 h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder={formErrors.address}
                      />
                    </div>

                    <div class="md:col-span-2">
                      <label for="city">City</label>
                      <input
                        value={formValues.city}
                        onChange={handleChange}
                        type="text"
                        name="city"
                        id="city"
                        class=" placeholder-red-500  h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder={formErrors.city}
                      />
                    </div>

                    <div class="md:col-span-2">
                      <label for="country">Phone</label>
                      <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          value={formValues.phone}
                          onChange={handleChange}
                          name="phone"
                          id="phone"
                          placeholder={formErrors.phone}
                          class="px-4 placeholder-red-500 outline-none text-gray-800 w-full bg-transparent"
                          type="tel"
                        />

                        <div
                          onClick={handleOtp}
                          tabindex="-1"
                          for="show_more"
                          class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                        >
                          OTP
                        </div>
                      </div>
                      {otp && formValues.phone ? (
                        <div className="relative">
                          <input
                            name="otp"
                            type=""
                            id="otp"
                            placeholder="OTP"
                            onChange={handleChangeotp}
                            className={`${
                              isCheck ? "bg-green-500" : "bg-gray-50"
                            } border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            required=""
                          />
                          <div
                            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow absolute inset-y-0 right-0"
                            onClick={submitOtp}
                          >
                            Submit
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>

                    <div class="md:col-span-1">
                      <label
                        for="countries"
                        class="block  text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select an option
                      </label>
                      <p className="text-red-700">{formErrors.class}</p>
                      <select
                        name="class"
                        placeholder={formErrors.class}
                        onChange={handleChange}
                        id="class"
                        class="placeholder-red-500  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Choose Your Class</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </select>
                    </div>

                    <div class="md:col-span-2">
                      <label
                        for="password"
                        className="block  text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        id="password"
                        placeholder={formErrors.password}
                        className="bg-gray-50 border placeholder-red-500 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        value={formValues.password}
                        onChange={handleChange}
                      />
                    </div>

                    <div class="md:col-span-5 text-right">
                      <div class="inline-flex items-end">
                        <button
                          type="submit"
                          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
              </form>
                </div>
            </div>
          </div>
        </div>

        <a
          href="https://www.buymeacoffee.com/dgauderman"
          target="_blank"
          class="md:absolute bottom-0 right-0 p-4 float-right"
        >
          <img
            src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
            alt="Buy Me A Coffee"
            class="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
          />
        </a>
      </div>
    </div>
  );
};

export default Signup;
