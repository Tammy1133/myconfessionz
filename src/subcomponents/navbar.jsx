import React, { useEffect, useState } from "react";
import "../css/main.css";
import confessbg from "../utils/confessbg.jpg";
import textured from "../utils/textured.jpg";
import { Spin as Hamburger } from "hamburger-react";
import logo from "../utils/secondconfess.png";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsopen] = useState(false);
  const [firstren, setFirstren] = useState(true);

  const handleBarclose = () => {
    setIsopen(!isOpen);
  };
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className=" z-50  w-screen   ">
      <div
        className=" py-[10px]    flex mynav items-center  w-[100%] 
         drop-shadow-lg px-6  "
      >
        <div className="flex items-center cursor-pointer w-full justify-between ">
          {/* <h1 className="text-4xl md:text-5xl font-semibold text-white">
            BRAND.
          </h1> */}
          <div className="flex items-center" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt=""
              className="w-[30px] md:w-[30px]"
              loading="lazy"
            />
            <p className="text-white logo-text mt-3">MyConfessionz</p>
          </div>
          <div className="md:hidden">
            <Hamburger
              color="white"
              toggled={isOpen}
              toggle={() => {
                setIsopen(!isOpen);
              }}
            />
          </div>
          <div className="hidden md:flex items-center justify-between mr-12">
            <button
              class="button-3 hidden md:flex mr-4 items-center"
              role="button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login <i className=" ml-2 bi bi-box-arrow-in-right mt-[3px]"></i>
            </button>
            <button
              class="button-3 hidden md:flex items-center"
              role="button"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register <i className=" ml-2 bi bi-pencil-square mt-[3px]"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`bi ${
          !isOpen && "hidden"
        } md:hidden absolute mynavext z-[50]  w-screen px-10 py-5 slide-in-right`}
      >
        <div className=" mt-6 my-5 flex flex-col w-full ">
          <button
            class="button-31  "
            role="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login <i className=" ml-2 bi bi-box-arrow-in-right mt-[3px]"></i>
          </button>
          <button
            class="button-31  mt-5"
            role="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register <i className=" ml-2 bi bi-pencil-square mt-[3px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
