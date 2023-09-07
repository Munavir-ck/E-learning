import React, { useState } from "react";
import axios from "../../axios/axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../../constants/constants";
import GoogleButton from "react-google-button";
import { setStudent } from "../../Store/Slice/student_slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSocket } from "../../contex/socketProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setSubmit] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  // const someValue = useSelector(state => state.studentSlice)
  const googleAuth = () => {
    const apiUrl = `${baseUrl}/auth/google/callback`;
    window.open(apiUrl, "_self");

    return new Promise((resolve, reject) => {
      fetch(apiUrl)
        .then((res) => {
          res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
        
        });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));

    if (Object.keys(formErrors).length === 0) {
      setSubmit(true);
      console.log(formValues);
      axios
        .post("/login", {
          formValues,
        })
        .then((res) => {
          if (res.data.status) {
           
            setSubmit(true);
            toast.success(res.data.message);
            localStorage.setItem("token", res.data.token);
            dispatch(
              setStudent({
                name: res.data.result.name,
                email: res.data.result.email,
                _id:res.data.result._id,
                image:res.data.result.image,
                isLoggedIn: true,
                token: res.data.token
              })
            );
            const student_id=res.data.result._id
            socket.emit('student:initial-connection',{student_id},student_id) 
         
            navigate("/");
          } else {
            setSubmit(false);
            seterrorMessage(res.data.message);
            toast.error(res.data.message);
          }
        });
    }
  };
  const validate = (values) => {
   
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.password) {
      errors.password = "name is required";
    }
    if (!values.email) {
      errors.email = "email is required";
      // } else if (regex.test(values.email)) {
      //   errors.email = "This is not a valid email format";
    }
    return errors;
  };
  setTimeout(() => seterrorMessage(null), 3000);

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <ToastContainer />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div
                  class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <span class="font-medium">Success alert!</span> Change a few
                  things up and try submitting again.
                </div>
              ) : (
                <div />
              )}
              {errorMessage ? (
                <div
                  class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span class="font-medium">{errorMessage}</span> try again.
                </div>
              ) : (
                <div />
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    onChange={handleChange}
                    value={formValues.email}
                    required=""
                  />
                </div>
                <p className="text-red-700">{formErrors.email}</p>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    value={formValues.password}
                    required=""
                  />
                </div>
                <p className="text-red-700">{formErrors.password}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        for="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?
                  <Link to={"/signup"}>
                    <a classNameName="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Sign up
                    </a>
                  </Link>
                </p>
              </form>
              <GoogleButton onClick={googleAuth} />
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
}

export default Login;
