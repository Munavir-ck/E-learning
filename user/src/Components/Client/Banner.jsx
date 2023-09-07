import React from "react";
import { motion } from "framer-motion";

function Banner() {
  return (
    <div>
      <div className="bg-mycolors  box-border md:flex justify-between  inset-16 opacity-100">
        <div className="md:w-2/4 flex justify-center items-center sm:w-5/5 ">
          <motion.div 
           initial={{opacity:0,y:30,x:100}}
           animate={{opacity:1, fontSize:50,x:50,y:-10}} 
           transition={{delay:0.5,type:'spring',stiffness:100}}
          className="mt-20 shadow-lg p-8">
            <h1 className="text-white text-2xl ">Kids Learning Center</h1>
            <h1 className="text-white font-bold text-6xl font-serif ">
              New Approach to Kids Education
            </h1>
            <p className="text-white">
              Sea ipsum kasd eirmod kasd magna, est sea et diam ipsum est amet
              sed sit. Ipsum dolor no justo dolor et, lorem ut dolor erat dolore
              sed ipsum at ipsum nonumy amet. Clita lorem dolore sed stet et est
              justo dolore.
            </p>
          </motion.div>
        </div>
        <div className="lg:w-2/4  h-500 h-500sm:w-5/5 flex justify-center">
          <img
            className="object-cover h-4/5 mt-16 float-right"
            src="../../../header.png"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Banner;
