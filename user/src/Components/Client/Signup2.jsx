import React, { useState, useEffect } from "react";
import axios from "../../axios/axios"
import { useNavigate,Link } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const initialValues = { name: "", email: "", password: "", phone: "",class:"" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [errorMessage,seterrorMessage]=useState("")
  const[isCheck,setCheck]=useState(false)
  const [otp,setOtp]=useState(false)
  const [storeOTP,setStoreotp]=useState( "")
  const navigate=useNavigate()


  const handleOtp= async()=>{
  const number=formValues.phone
  setOtp(true)
await axios.post("/get_otp",{
  number
 
}).then((res)=>{

})

  }

  const handleChangeotp=(e)=>{
    const OTP=e.target.value
    setStoreotp(OTP)
  }

  const submitOtp=()=>{
    console.log(111111111111);
   
   const number=formValues.phone
   axios.post("/verify_otp",{
    storeOTP,
    number
   }).then((res)=>{
    if(res.data.status){
     toast.success(res.data.message)
     setCheck(true)
    }
    else{
      toast.error(res.data.message)
      setCheck(false)
    }

   })
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmit(true)
    if(isCheck){
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(5555555555);
        axios.post("/signup",{
         name:formValues.name,
         password:formValues.password,
         email:formValues.email,
         phone:formValues.phone,
         Class:formValues.class
        }).then((res)=>{
         console.log(res.data);
         console.log(222222222222222222);
         if(res.data.status){
             console.log(33333333);
             setSubmit(true)
             toast.success("success")
             navigate("/login")
         }else{
             seterrorMessage(res.data.message)
             console.log(errorMessage,1111111);
             setSubmit(false)
         }
 
        })
     }
    }
    else{
      console.log(7777777777);
     toast.error("OTP NOT VERIFIED")
  }
    
  };

  const validate = (values) => {
    console.log(formErrors);
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.name) {
      errors.name = "name is required";
    }
    if (!values.email) {
      errors.email = "email is required";
    // } else if (regex.test(values.email)) {
    //   errors.email = "This is not a valid email format";
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 6) {
      errors.password = "password must be more than six character";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    }

    return errors;
  };
  useEffect(() => {
    
   
    
  }, [formErrors]);

  return (
  
      <section className="bg-gray-50 dark:bg-gray-900 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <ToastContainer/>
            
            <div className="p-6 space-y-4 h-screen md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              {/* {Object.keys(formErrors).length === 0 && isSubmit ? 
              <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <span class="font-medium">Success alert!</span> Change a few things up and try submitting again.
            </div>:<div/>
              
               
              } */}
              {
                errorMessage ?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
              </div>:<div/>
              }
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <p className="text-red-700">{formErrors.email}</p>
                <div>
                  <label
                    for="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <div className="relative">
                 
                  <input
                    name="phone"
                    type="tel"
                    id="phone"
                    placeholder="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={formValues.phone}
                    onChange={handleChange}
                  /><div class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow absolute inset-y-0 right-0"
                   onClick={handleOtp}
                  >
                  OTP
                </div>
             
                 </div>
                 {otp&&formValues.phone?(<div className="relative"><input
                    name="otp"
                    type=""
                    id="otp"
                    placeholder="OTP"
                    onChange={handleChangeotp}
                    className={`${isCheck?"bg-green-500":"bg-gray-50"} border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    required=""
                   
                   
                  />
                  <div class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow absolute inset-y-0 right-0"
                   onClick={submitOtp}
                  >
                  Submit
                </div></div>
               ):<div></div>}
                </div>
                <p className="text-red-700">{formErrors.phone}</p>
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    type=""
                    id="name"
                    placeholder="student name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-red-700">{formErrors.name}</p>

               
<label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
<select 

name="class"
onChange={handleChange}
 id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Choose Your Class</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
</select>

                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-red-700">{formErrors.password}</p>
                <div className="flex items-start">
                  {/* <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    
                    />
                  </div> */}
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                   Signup
                  </button>
                  {/* <div className="ml-3 text-sm">
                    <label
                      for="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div> */}

                <p className="text-sm font-light text-gray-500 ml-10 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to={"/login"}>
                  <a
                 
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                  </Link>
                </p>
                
                </div>
               
              </form>
            </div>
          </div>
        </div>
      </section>
   
  );
};

export default Signup;