import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios/axios";
import moment from "moment";
import Spinner from "./Spinner/Spinner";

function TeacherDetail() {
  const [teacher, setTeacher] = useState({});
  const [reviews, setReviews] = useState([]);
  const [totalSatrs, setTotalStars] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [stars, setStars] = useState([
    { id: 1, color: false },
    { id: 2, color: false },
    { id: 3, color: false },
    { id: 4, color: false },
    { id: 5, color: false },
  ]);
  const [stars2, setStars2] = useState([
    { id: 0, color: false },
    { id: 0, color: false },
    { id: 0, color: false },
    { id: 0, color: false },
    { id: 0, color: false },
  ]);
  let total = [];

  useEffect(() => {
    const total = [];
    for (let j = 0; j < reviews.length; j++) {
      const updatedStars = stars2.map((star) => ({ ...star, id: j }));
      total.push(updatedStars);
    }
    setTotalStars(total);
  }, [reviews, stars2]);

  useEffect(() => {}, [reviews]);

  const rating = teacher.rating;

  for (let i = 0; i < rating; i++) {
    stars[i].color = true;
  }

  for (let i = 0; i < reviews.length; i++) {
    for (let j = 0; j < reviews[i].rating; j++) {
      if (totalSatrs.length > i && totalSatrs[i].length > j) {
        totalSatrs[i][j].color = true;
      }
    }
  }
  
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

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
    axios
      .get("/get_reviews", {
        params: {
          id,
        },
      })
      .then((res) => {
        setLoading(false);
        setReviews(res.data.result);
      });
  }, []);

  return (
    <div>
      {isLoading && <Spinner />}
      <section
        className={`text-gray-700 body-font overflow-hidden bg-white ${
          isLoading && "pointer-events-none opacity-20"
        }`}
      >
        <div className="container px-5 py-24 mx-auto ">
          <div className="lg:w-4/5 mx-auto flex flex-wrap ">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200 shadow-lg"
              src={teacher.image ? teacher.image : "../../../avatar.png"}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                TEACHER NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {teacher.name}
              </h1>
              <div className=" mb-4">
                <span className="flex pr-3 py-2 border-gray-200 gap-2">
                  <h1>Subject:</h1>
                  <h1 className="font-bold">{teacher.subject}</h1>
                </span>

                <span className="flex pr-3 py-2 border-gray-200 gap-2">
                  <h1 className="decoration-green-600">Qualification:</h1>
                  <h1 className="font-bold">{teacher.qualification}</h1>
                </span>
              </div>
              <span></span>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex items-center">
                  {stars.map((item) => {
                    return (
                      <svg
                        aria-hidden="true"
                        className={`w-5 h-5 ${
                          item.color ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    );
                  })}

                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {Math.round(teacher.rating)} out of 5
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="gap-2">
                  <span className="font-bold decoration-green-300">FEE :</span>
                  <span className="title-font font-medium text-2xl text-gray-900">
                    {teacher.FEE}
                  </span>
                </div>
                <Link to={`/reservation/${id}`}>
                  <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded">
                    BOOK NOW
                  </button>
                </Link>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <a className="inline-block mb-14 text-3xl font-heading font-medium underline hover:text-darkBlueGray-700">
            Customer Reviews
          </a>
          <div className="flex">
            {reviews.length !== 0 &&
              reviews.map((item,index) => {
                return (
                  <div className="mb-2 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden h-60 w-2/5">
                    <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
                      <div className="flex flex-wrap items-center">
                        <img
                          className="mr-6 w-10 h-10 rounded-md"
                          src={item.student && item.student.image}
                          alt=""
                        />
                        <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                          {item.student.name}
                        </h4>
                        <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
                        <span className="mr-4 text-xl font-heading font-medium">
                        {item.rating}
                        </span>
                        <div className="inline-flex">
                       {console.log(totalSatrs, "______________,,,, mr-1")}
                          {totalSatrs.map((item, i) => {
                        
                            if(i===index){


                              return item.map((star, j) => {
                                console.log(item.length)
                             
                                  console.log(item, "inline-block,,,,, mr-1");
                                  return (
                                    <a
                                      className="inline-block mr-1"
                                      href="#"
                                      key={j}
                                    >
                                      <svg
                                        aria-hidden="true"
                                        className={`w-5 h-5 ${
                                          star.color
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <title>{`Star ${j + 1}`}</title>
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                      </svg>
                                    </a>
                                  );
                                
                              });
                            }

                          })}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
                      <div className="flex flex-wrap">
                        <div className="w-full md:w-2/3 mb-6 md:mb-0">
                          <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">
                            {item.comment}
                          </p>
                        </div>
                        <div className="w-full md:w-1/3 text-right">
                          <p className="mb-8 text-sm text-gray-300">
                            Added{" "}
                            {moment(item.createdAt).format("MMMM Do YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeacherDetail;
