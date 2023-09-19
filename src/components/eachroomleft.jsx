import React, { useEffect, useState } from "react";
import icon1 from "../utils/icon2.png";
import icon2 from "../utils/icon3.png";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const EachRoomLeft = () => {
  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });

  const token = useSelector((state) => {
    return state.user.token;
  });

  const [loading, setLoading] = useState(false);

  const getCounsellors = async () => {
    setLoading(true);
    try {
      const result = await Axios.get(
        "https://restapis.myconfessionz.com/api/all-counselors ",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="left pt-[90px] bg-[#ff00001e]  pb-[130px]  hidden md:block w-[25vw] border-[1px] shadow-2xl  h-[93vh] overflow-y-scroll   ">
      {loading === true && (
        <div className="fixed top-0   h-[100vh] w-[25vw] z-50 overflow-x-hidden bg-[#00000064] bg-cover flex justify-center items-center">
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

      <div className=" py-3 mb-[-20px] px-2 rounded-b-lg">
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/love");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Love </p>
          <i className="md:text-xl lg:text-2xl  bi bi-heart-fill "></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/heartbreak");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize">
            {" "}
            Heartbreak{" "}
          </p>
          <i className="md:text-xl lg:text-2xl  bi bi-heartbreak-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/marriage");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Marriage </p>
          <i className="md:text-xl lg:text-2xl  bi bi-heartbreak-house-heart-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/domestic violence");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize">
            {" "}
            Domestic Violence{" "}
          </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/shocking");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Shocking </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/murder");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Murder </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/hoe story");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Hoe Story </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-wink-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/funny");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Funny </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-laughing-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/daily gist");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize">
            {" "}
            Daily gist{" "}
          </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-laughing-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/cheating");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Cheating </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/assault");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Assault </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/personal problem");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize">
            {" "}
            Personal Problem{" "}
          </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/sinful");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Sinful </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/harassed");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Harassed </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/health issues");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize">
            {" "}
            Health Issues{" "}
          </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/harassed");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Harassed </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/politics");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize"> Politics </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
        <div
          className="border-[1px] rounded mb-3 border-[red] py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
          onClick={() => {
            navigate("/room/supernatural events");
          }}
        >
          <p className="mb-1 mx-2 text-sm lg:text-xl capitalize">
            {" "}
            Supernatural Events{" "}
          </p>
          <i className="md:text-xl lg:text-2xl  bi bi-emoji-expressionless-fill"></i>
        </div>
      </div>
    </div>
  );
};
