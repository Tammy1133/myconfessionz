import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigate, useNavigate } from "react-router-dom";
import "../css/main.css";
import confessbg from "../utils/confessbg.jpg";
import textured from "../utils/textured.jpg";
import { Spin as Hamburger } from "hamburger-react";
import logo from "../utils/secondconfess.png";
import { setUser } from "../redux/actions/UserActions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { LoggedInNav } from "./loggedinNav";
import { confessions } from "../utils/confessions";
import { IndividualPost } from "./individualPost";
import { Counsellor } from "./counsellor";
import Axios from "axios";
import { CounsellorNyField } from "./counsellorbyfield";

export const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });

  const token = useSelector((state) => {
    return state.user.token;
  });
  console.log(token);
  const [pageData, setPageData] = useState([]);

  console.log(token);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await Axios.get(
        "https://restapis.myconfessionz.com/api/all-posts-home",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPageData(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      navigate("/login");
      dispatch(setUser("."));
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
  const [showNavOptions, setShowNavOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBarclose = () => {
    setIsopen(!isOpen);
  };

  // useEffect(() => {
  //   if (pageData.length >= 0) {
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //   }
  //   console.log(pageData);
  // }, [pageData]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return user !== undefined || username !== undefined ? (
    <div>
      <LoggedInNav></LoggedInNav>

      <div className="flex">
        <Counsellor></Counsellor>
        {loading === true && (
          <div className="fixed top-0   h-[100vh] w-screen z-50 overflow-x-hidden bg-[#00000064] bg-cover flex justify-center items-center">
            <svg
              class="pl overflow-x-hidden"
              viewBox="0 0 200 200"
              width="200"
              height="200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                  <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                  <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                </linearGradient>
                <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                  <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                </linearGradient>
              </defs>
              <circle
                class="pl__ring"
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="url(#pl-grad1)"
                stroke-width="36"
                stroke-dasharray="0 257 1 257"
                stroke-dashoffset="0.01"
                stroke-linecap="round"
                transform="rotate(-90,100,100)"
              />
              <line
                class="pl__ball"
                stroke="url(#pl-grad2)"
                x1="100"
                y1="18"
                x2="100.01"
                y2="182"
                stroke-width="36"
                stroke-dasharray="1 165"
                stroke-linecap="round"
              />
            </svg>
          </div>
        )}
        <div className="right w-screen lg:w-[50vw]  overflow-y-scroll h-[100vh] ">
          <div className="mt-[130px]  ">
            <div className="  text-xl md:text-2xl text-[red] transition hover:text-[#b21a1a] lg:ml-[60px] tobecentered">
              Sharing Your Darkest Secrets Anonymously
            </div>
            <div className="flex justify-start">
              <button
                type="submit"
                className="form-top text-base text-white px-[20px] py-[12px] rounded-2xl mt-4 md:ml-[50px] lg:ml-[60px] mb-3 ml-[20px] "
                onClick={() => navigate("/post/create")}
              >
                Share a confession
              </button>
            </div>
          </div>
          <div className=" mb-[100px] ">
            {pageData?.map((item) => {
              return <IndividualPost item={item}></IndividualPost>;
            })}
          </div>
        </div>
        <CounsellorNyField></CounsellorNyField>
      </div>
    </div>
  ) : (
    <div className="relative">
      <img
        src={confessbg}
        alt=""
        className="absolute h-screen w-screen brightness-[20%] "
      />
      <div className=" relative flex flex-col justify-center items-center h-screen text-center z-30">
        <span className="text-2xl text-white">
          Redirecting to Login page in {time}
        </span>
      </div>
    </div>
  );
};
