import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios/axios";

function TeacherDetail() {
  const [teacher, setTeacher] = useState({});

  const { id } = useParams();

  console.log(id, 2222);

  useEffect(() => {
    axios
      .get("/get_teacherDetails", {
        params: {
          id,
        },
      })
      .then((res) => {
        setTeacher(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(teacher.id,444444);

  return (
    <div>
      <section class="text-gray-700 body-font overflow-hidden bg-white">
        <div class="container px-5 py-24 mx-auto ">
          <div class="lg:w-4/5 mx-auto flex flex-wrap ">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200 shadow-lg"
              src={teacher.image ? teacher.image : "../../../avatar.png"}
            />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                TEACHER NAME
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {teacher.name}
              </h1>
              <div class=" mb-4">
                <span class="flex pr-3 py-2 border-gray-200 gap-2">
                  <h1>Subject:</h1>
                  <h1 className="font-bold">{teacher.subject}</h1>
                </span>

                <span class="flex pr-3 py-2 border-gray-200 gap-2">
                  <h1 className="decoration-green-600">Qualification:</h1>
                  <h1 className="font-bold">{teacher.qualification}</h1>
                </span>
              </div>
              <span></span>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <p>ahdjasdjsdjsdjsdklsdjklsdjlKDJkldjklsdl</p>
              </div>
              <div class="flex gap-4">
                <div className="gap-2">
                  <span className="font-bold decoration-green-300">FEE :</span>
                  <span class="title-font font-medium text-2xl text-gray-900">
                   {teacher.FEE}
                  </span>
                </div>
                <Link to={`/reservation/${id}`}>
                <button class="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded">
                 BOOK NOW
                </button>
                </Link>
                <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeacherDetail;
