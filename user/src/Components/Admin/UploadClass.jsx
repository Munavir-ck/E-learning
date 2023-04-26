import React, { useState } from "react";
import axios from "../../axios/axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "./ProgressBAr/ProgressBar";

function UploadClass() {
  // const initialState={
  //     selectedVideos:null,
  //     loaded:0
  // }
  const [selectedVideos, setSelectedVideos] = useState(null);

  const [loaded, Setloading] = useState(0);

  const [subject, setSubject] = useState("");
  const [Class, setClass] = useState("");
  const [description, setDescription] = useState("");

  const handleClass = (e) => {
    setClass(e.target.value);
  };
  const handleChange = (e) => {
    setSubject(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const maxSelectFile = (event) => {
    console.log(22222222);
    const files = event.target.files;

    if (files.length > 1) {
      toast.error("Maximum one file is allowed");
      event.target.value = null;
      return false;
    } else {
      let err = "";
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 52428800) {
          err += files[i].name + "";
        }
        if (err !== "") {
          event.target.value = null;
          toast.error(err + "is too large");
        }
      }
    }
    return true;
  };

  const validation = () => {
    if (!selectedVideos) {
      return false;
    }
    return true;
  };

  const fileChangehandler = (e) => {
    const files = e.target.files;
    if (maxSelectFile(e)) {
      setSelectedVideos(files);
      Setloading(0);
    }
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    console.log(validation());
    if (validation() == false) {
      console.log(33333333);
      toast.error("No files");
    } else {
      const data = new FormData();
      console.log(data);
      for (let i = 0; i < selectedVideos.length; i++) {
        data.append("file", selectedVideos[i]);
      }
      data.append("subject", subject);
      data.append("class", Class);
      data.append("description", description);
      axios
        .post("admin/upload_class", data, {
          headers: {
            Authorization: localStorage.getItem("admintoken"),
          },
          onUploadProgress: (ProgressEvent) => {
            Setloading((ProgressEvent.loaded / ProgressEvent.total) * 100);
          },
        })
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(4444444444);
          toast.error("error");
        });
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add Your Classes
              </h1>

              <ToastContainer />
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleFileUpload}
                encType="multipart/form-data"
              >
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CLASS
                  </label>
                  <input
                    type="text"
                    name="class"
                    id="class"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Class"
                    onChange={handleClass}
                    value={Class}
                    required=""
                  />
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description"
                    onChange={handleDescription}
                    value={description}
                    required=""
                  />
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="subject"
                    onChange={handleChange}
                    value={subject}
                    required=""
                  />
                </div>

                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        class="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        MP4(MAX. 50 MB)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="video/"
                      onChange={fileChangehandler}
                    />
                  </label>
                  {/* <Progress className=""
                  max="100"
                  color="success"
                  value={loaded}
                  >
               {isNaN(Math.round(loaded,2))?0:Math.round(loaded,2)}%
                  </Progress> */}
                </div>
                <ProgressBar value={loaded} />

                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </form>

              {/* <img src="http://localhost:5001/thumbnails/061caf4726c420d8c445a18d860ad0e77e4038d36d7ec7d85c34cc01ac199e4d.png
" /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UploadClass;
