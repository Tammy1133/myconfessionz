import React, { useEffect, useState } from "react";
import { LoggedInNav } from "./loggedinNav";
import { useNavigate, useParams } from "react-router-dom";
import confessbg from "../utils/confessbg.jpg";
import { useSelector } from "react-redux";
import { EachRoomLeft } from "./eachroomleft";
import Axios from "axios";
import { IndividualPost } from "./individualPost";

export const EachRoom = () => {
  const params = useParams();
  console.log(params.name);
  const navigate = useNavigate();
  let [time, setTime] = useState(4);
  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });
  const token = useSelector((state) => {
    return state.user.token;
  });
  if (user === undefined && username === undefined) {
    setTimeout(() => setTime(time - 1), 1000);
  }

  useEffect(() => {
    if (time === 0) {
      navigate("/login");
    }
  }, [time]);

  const [pageData, setPageData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await Axios.get(
        "https://restapis.myconfessionz.com/api/all-posts-home",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(result);

      setPageData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/login");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    const text = params.name;
    const separatedText = text.split("-").join(" ");

    const data = pageData.filter((item) => {
      return item.category.toUpperCase() === separatedText.toUpperCase();
    });
    setRoomData(data);
  }, []);
  useEffect(() => {
    const text = params.name;
    const separatedText = text.split("-").join(" ");

    const data = pageData.filter((item) => {
      return item.category.toUpperCase() === separatedText.toUpperCase();
    });
    setRoomData(data);

    window.scrollTo(0, 0);
  }, [pageData]);
  useEffect(() => {
    const text = params.name;
    const separatedText = text.split("-").join(" ");

    const data = pageData.filter((item) => {
      return item.category.toUpperCase() === separatedText.toUpperCase();
    });
    setRoomData(data);

    window.scrollTo(0, 0);
  }, [params.name]);
  return user !== undefined || username !== undefined ? (
    <div>
      {loading === true && (
        <div className="fixed top-0   h-[100vh] w-screen  z-50 overflow-x-hidden bg-[#00000064] bg-cover flex justify-center items-center">
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
      <LoggedInNav></LoggedInNav>
      <div className="flex ">
        <EachRoomLeft></EachRoomLeft>

        <div className=" pt-[100px]  pb-[100px] w-[100vw] md:w-[75vw] md:h-[94vh] md:overflow-y-scroll ">
          <h4 className="text-center uppercase underline text-[red] mb-[30px]">
            {params.name}
          </h4>
          {roomData?.map((item) => {
            return <IndividualPost item={item}></IndividualPost>;
          })}
          {roomData.length === 0 && (
            <div className="flex flex-col w-screen md:w-[75vw] h-[74vh] items-center justify-center mt-[-30px]">
              <h4>No post in this section yet</h4>
              <h5>Be the first to post...</h5>
              <button
                className="bg-[red] py-3 rounded-xl
                 px-4 text-white"
                onClick={() => {
                  navigate("/post/create");
                }}
              >
                Click to add new post
              </button>
            </div>
          )}
        </div>
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
