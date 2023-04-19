import { useState } from "react";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ImArrowRight } from "react-icons/im";
export default function Sidebar() {
    // const [open, setOpen] = useState(false);
    const studentName = useSelector(state => state.tutor.name);
    return (
        <div className="flex">
            <div  className= "w-60 flex flex-col h-screen p-3 bg-cyan-700 shadow duration-300">
               
                     
                
            
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">
                           {studentName}
                        </h2>
                        {/* <button onClick={() => setOpen(!open)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button> */}
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                type="submit"
                                className="p-2 focus:outline-none focus:ring"
                            >
                              < ImArrowRight/>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                  < ImArrowRight/>
                                    <span className="text-gray-100">Home</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                   < ImArrowRight/>
                                    <Link to={"/tutor/profile"}>
                                    <span className="text-gray-100">PROFILE</span>
                                    </Link>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <Link to={"/tutor/manage_time"}>
                                <a
                                    
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                 < ImArrowRight/>
                                    <span className="text-gray-100">
                                     Time Manage
                                    </span>
                                </a>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                            <Link to={"/tutor/booking_list"}>
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                   < ImArrowRight/>
                                    <span className="text-gray-100">
                                        Settings
                                    </span>
                                </a>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span className="text-gray-100">
                                        Logout
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
           
        </div>
    );
}




