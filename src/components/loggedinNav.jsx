import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/main.css";
import confessbg from "../utils/confessbg.jpg";
import textured from "../utils/textured.jpg";
import { Spin as Hamburger } from "hamburger-react";
import logo from "../utils/secondconfess.png";
import { setUser } from "../redux/actions/UserActions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export const LoggedInNav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });
  const navigate = useNavigate();
  let [time, setTime] = useState(4);

  if (user === undefined && username === undefined) {
    setTimeout(() => setTime(time - 1), 1000);
  }

  useEffect(() => {
    if (time === 0) {
      navigate("/login");
    }
  }, [time]);

  const [isOpen, setIsopen] = useState(false);
  const [showNavOptions, setShowNavOptions] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setIsFirstTime(true);
    }
    if (isOpen && isFirstTime === true) {
      setIsFirstTime(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setShowNavOptions(true);
    }
  }, [isOpen]);

  const handleBarclose = () => {
    setIsopen(!isOpen);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <div className="fixed top-0 ">
        {/* Navbar  */}
        <div className=" z-50  w-screen   ">
          <div
            className=" py-[5px] flex mynav items-center  w-[100%] 
         drop-shadow-lg px-6  "
          >
            <div className="flex items-center cursor-pointer w-full justify-between ">
              {/* <h1 className="text-4xl md:text-5xl font-semibold text-white">
            BRAND.
          </h1> */}
              <div
                className="flex items-center"
                onClick={() => navigate("/homepage")}
              >
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
                {user && (
                  <div
                    className="flex items-center pt-1 mr-6  hover:scale-110 transition"
                    onClick={() => {
                      navigate("/chats");
                    }}
                  >
                    <i className="bi bi-chat-dots text-md  mb-1 text-white mr-1  "></i>
                    <h2 className="text-white text-base pt-2 mr-3 ">Chats</h2>
                  </div>
                )}

                <div className="flex items-center mr-[-20px]">
                  <i className="bi bi-person-fill text-lg mr-[-10px] mt-1 text-white "></i>
                  <DropdownButton
                    className="mydropdown "
                    id="dropdown-basic-button"
                    title={user || username}
                  >
                    <div className="lg:hidden">
                      <Dropdown.Item
                        onClick={() => {
                          navigate("/searchcounsellors");
                        }}
                      >
                        <div className="cursor-pointer ">
                          Counsellors <i className="bi bi-person-badge"></i>
                        </div>
                      </Dropdown.Item>
                    </div>

                    <Dropdown.Item
                      onClick={() => {
                        navigate("/terms");
                      }}
                    >
                      Terms of Service
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        navigate("/privacy");
                      }}
                    >
                      Privacy Policy
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(setUser("."));
                      }}
                    >
                      Logout <i className="bi bi-door-open-fill" />
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`bi ${
              !isOpen && "hidden"
            } md:hidden absolute mynavext z-[50]  w-screen px-10 py-3 `}
          >
            <div className=" flex flex-col w-full ">
              <div
                className="flex items-start justify-center cursor-pointer py-3"
                onClick={() => {
                  setShowNavOptions(!showNavOptions);
                }}
              >
                <i className="bi bi-person-fill text-lg text-white mr-1"></i>
                <div className="text-white text-xl">{user || username}</div>
                <i className="bi bi-caret-down-fill text-xl text-white ml-1 "></i>
              </div>

              {showNavOptions && (
                <div
                  className="slide-in-right
                   px-5 text-xl bg-white py-3 rounded-xl my-4 text-[red] "
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/searchcounsellors");
                    }}
                  >
                    Counsellors <i className="bi bi-person-badge"></i>
                  </div>
                  <div
                    className="cursor-pointer mt-3"
                    onClick={() => {
                      navigate("/chats");
                    }}
                  >
                    Chats{" "}
                    <i className="bi bi-chat-dots text-lg md:text-xl mb-1"></i>
                  </div>
                  <div
                    className=" cursor-pointer mt-3"
                    onClick={() => {
                      navigate("/terms");
                    }}
                  >
                    Terms of Service
                  </div>
                  <div
                    className=" cursor-pointer mt-3"
                    onClick={() => {
                      navigate("/privacy");
                    }}
                  >
                    Privacy Policy
                  </div>
                  <div
                    onClick={() => {
                      dispatch(setUser("."));
                      setIsopen(false);
                    }}
                    className=" cursor-pointer mt-3 flex items-center"
                  >
                    Logout <i className="bi bi-door-open-fill ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Navbar end */}
      </div>

      <div className="fixed  text-white  mynav bottom-0 w-screen py-1 flex justify-around items-center bg-[red]">
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => {
            navigate("/homepage");
          }}
        >
          <i className="bi bi-house-door-fill text-lg md:text-xl mb-1"></i>
          Home
        </div>
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => {
            navigate("/explore");
          }}
        >
          <i className="bi bi-shuffle text-lg md:text-xl mb-1"></i>
          Explore
        </div>
        {user && (
          <div
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={() => {
              navigate("/post/create");
            }}
          >
            <i className="bi bi-plus-circle text-lg md:text-xl mb-1"></i>
            Confess
          </div>
        )}
        {username && (
          <div
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={() => {
              navigate("/chats");
            }}
          >
            <i className="bi bi-chat-dots text-lg md:text-xl mb-1"></i>
            Chats
          </div>
        )}
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => {
            navigate("/rooms");
          }}
        >
          <i className="bi bi-lightning-charge  text-lg md:text-xl mb-1"></i>
          Rooms
        </div>
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <i className="bi bi-person-circle text-lg md:text-2xl mb-1"></i>
          Profile
        </div>
      </div>
    </div>
  );
};
