import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { setStudent } from "../../Store/Slice/student_slice";
import "./profile.css";

function Profile() {
  const dispatch = useDispatch();
  const [student, setStudents] = useState({});
  const [image, setImage] = useState(null);
  const [newImage, setNewimage] = useState(null);

  const toBase64 = (image) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }).catch((err) => {
      console.log(err);
    });

  const handleImage = async (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    async function editProfile() {
      if (image) {
        const imgBase = await toBase64(image);
        console.log(imgBase, 333333);
        setImage();
        axios
          .post(
            "/edit_profile_image",
            {
              imgBase,
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            toast.success("success");
            console.log(res.data.data.image, 2222);
            setNewimage(res.data.data.image);
            dispatch(
              setStudent({
                image: res.data.data.image,
                name: student.name,
                email: student.email,
                isLoggedIn: true,
                _id: student._id,
              })
            );
            console.log(res.data.data.image, 3333);
          })
          .catch((res) => {
            console.log("error");
            toast.error("error");
          });
      }
    }

    editProfile();
  }, [image]);

  useEffect(() => {
    axios
      .get("/get_profile", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.status) {
          setStudents(res.data.result);
        }
        console.log(222222);
      });
  }, [newImage]);

  console.log(student);
  return (
    <div>
      <div class="bg-gray-100">
        <div class="w-full text-white bg-main-color">
          <div
            x-data="{ open: false }"
            class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
          >
            <div class="p-4 flex flex-row items-center justify-between">
              <a
                href="#"
                class="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
              >
                example profile
              </a>
            </div>
            <nav class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
              <div class="relative" x-data="{ open: false }"></div>
            </nav>
          </div>
        </div>

        <div class="container mx-auto my-5 p-5">
          <div class="md:flex no-wrap md:-mx-2 ">
            <div class="w-full md:w-3/12 md:mx-2">
              <div class="bg-white p-3 border-t-4 border-green-400">
             
                <div class="image overflow-hidden">
                  <img
                    class="h-auto w-full mx-auto"
                    src={student.image ? student.image : "../../../userprofile.jpg"} 
                    alt=""
                  />
                </div>
                <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                 {student.name}
                </h1>
               
                <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li class="flex items-center py-3">
                    <span>Status</span>
                    <span class="ml-auto">
                      <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    </span>
                  </li>
                  <li class="flex items-center py-3">
                    <span>Member since</span>
                    <span class="ml-auto">Nov 07, 2016</span>
                  </li>
                </ul>
              </div>

              <div class="my-4"></div>

              <div class="bg-white p-3 hover:shadow">
                
                
              </div>
            </div>

            <div class="w-full md:w-9/12 mx-2 h-64">
              <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      class="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span class="tracking-wide">About</span>
                </div>
                <div class="text-gray-700">
                  <div class="grid md:grid-cols-2 text-sm">
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">First Name</div>
                      <div class="px-4 py-2"> {student.name}</div>
                    </div>
                    
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Gender</div>
                      <div class="px-4 py-2">Female</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Contact No.</div>
                      <div class="px-4 py-2"> {student.phone}</div>
                    </div>
                    
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div class="px-4 py-2">
                       {student.address},{student.city}
                      </div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Email.</div>
                      <div class="px-4 py-2">
                        <a class="text-blue-800" href="mailto:jane@example.com">
                         {student.email}
                        </a>
                      </div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Class</div>
                      <div class="px-4 py-2">{student.class}</div>
                    </div>
                  </div>
                </div>
                <button class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                  Show Full Information
                </button>
              </div>

              <div class="my-4"></div>

              <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="grid grid-cols-2">
                
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
