import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import SearchTeacher from "./Search/SearchTeacher";
import { Link } from "react-router-dom";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [searchError, setError] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
 

  useEffect(() => {
    async function teachersList() {
      console.log(1111);
      await axios
        .get("/get_teachers", {})
        .then((res) => {
          if (res.data.status) {
            setTeachers(res.data.data);
          }
        })
        .catch((err) => {});
    }
    teachersList();

    console.log(teachers, 111);
  }, []);
  return (
    <>
      <div className=" w-full h-40  flex items-center justify-center ">
        <motion.h1
          initial={{ opacity: 0, y: 30, x: 100 }}
          animate={{
            opacity: 1,
            fontSize: 50,
            x: 50,
            y: -10,
            color: "#18355c",
          }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          className="text-6xl font-semibold font-monospace text-mycolors_b"
        >
          Meet Our Teachers
        </motion.h1>
      </div>
      <div className="mb-24 ml-24">
        <SearchTeacher setData={setSearchResult} setError={setError} />
      </div>

      <div
        className={
          searchError
            ? "w-full flex h-full  justify-center"
            : "h-full colo p-16 grid gap-6 mt-10  text-center sm:h-full grid-cols-2 m-8 md:grid-cols-4 shadow-lg  cursor-pointer"
        }
      >
        {searchError ? (
          <img
            className="h-80 object-contain"
            src="data:image/png;base64,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"
          ></img>
        ) : (
          (searchResult.length ? searchResult : teachers).map((items, key) => (
            <Link to={`/teacher_details/${items._id}`}
            
            >
              <motion.div
                whileHover={{ scale: 1.1, color: "#e1eaf0" }}
                transition={{ type: "spring", stiffness: 120 }}
                
              >
                <a href="#" class="group relative block bg-black">
                  <img
                    alt="Developer"
                    src={items.image ? items.image : "../../../avatar.png"}
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  />

                  <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                      {items.qualification}
                    </p>

                    <p className="text-xl font-bold text-white sm:text-2xl">
                      {" "}
                      {items.name}
                    </p>

                    <div className="mt-32 sm:mt-48 lg:mt-64">
                      <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-sm text-white">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Omnis perferendis hic asperiores quibusdam
                          quidem voluptates doloremque reiciendis nostrum harum.
                          Repudiandae?
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}