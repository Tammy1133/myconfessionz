import React, { useEffect, useState } from "react";
import { LoggedInNav } from "./loggedinNav";
import { useNavigate } from "react-router-dom";
import confessbg from "../utils/confessbg.jpg";
import { useSelector } from "react-redux";

export const Rooms = () => {
  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });
  let [time, setTime] = useState(4);

  if (user === undefined && username === undefined) {
    setTimeout(() => setTime(time - 1), 1000);
  }

  useEffect(() => {
    if (time === 0) {
      navigate("/login");
    }
  }, [time]);
  const navigate = useNavigate();

  return user !== undefined || username !== undefined ? (
    <div>
      <LoggedInNav></LoggedInNav>

      <div className="mt-[120px] mx-[8px] md:mx-[130px] lg:mx-[200px]">
        <div className="bg-[red] rounded-t-lg py-3 text-center text-white text-2xl capitalize">
          Rooms
        </div>

        <div className="border border-slate-400 py-3 mb-[130px] px-2 rounded-b-lg">
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/love");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Love </p>
            <i className="text-2xl  bi bi-heart-fill "></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/heartbreak");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Heartbreak </p>
            <i className="text-2xl  bi bi-heartbreak-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/marriage");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Marriage </p>
            <i className="text-2xl  bi bi-heartbreak-house-heart-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/domestic-violence");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Domestic Violence </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/shocking");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Shocking </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/murder");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Murder </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/hoe-story");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Hoe Story </p>
            <i className="text-2xl  bi bi-emoji-wink-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/funny");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Funny </p>
            <i className="text-2xl  bi bi-emoji-laughing-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/daily-gist");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Daily gist </p>
            <i className="text-2xl  bi bi-emoji-laughing-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/cheating");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Cheating </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/assault");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Assault </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/personal-problem");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Personal Problem </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/sinful");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Sinful </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/harassed");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Harassed </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/health-issues");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Health Issues </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/harassed");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Harassed </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/politics");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize"> Politics </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
          <div
            className="border mb-3 border-slate-400 py-2 flex items-center  text-[red] hover:cursor-pointer pt-3"
            onClick={() => {
              navigate("/room/supernatural-events");
            }}
          >
            <p className="mb-1 mx-2 text-2xl capitalize">
              {" "}
              Supernatural Events{" "}
            </p>
            <i className="text-2xl  bi bi-emoji-expressionless-fill"></i>
          </div>
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
        <span className="text-2xl capitalize text-white">
          Redirecting to Login page in {time}
        </span>
      </div>
    </div>
  );
};
