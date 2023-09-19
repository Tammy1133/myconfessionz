import React, { useEffect, useState } from "react";
import { LoggedInNav } from "./loggedinNav";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import confessbg from "../utils/confessbg.jpg";
import { useSelector } from "react-redux";
import Axios from "axios";

export const CreateNew = () => {
  const navigate = useNavigate();
  const [confession, setConfession] = useState("");
  const [room, setRoom] = useState("");
  const rooms = [
    { label: "Love", value: "Love" },
    { label: "Heartbreak", value: "Heartbreak" },
    { label: "Marriage", value: "Marriage" },
    { label: "Domestic Violence", value: "Domestic Violence" },
    { label: "Abused", value: "Abused" },
    { label: "Harassed", value: "Harassed" },
    { label: "Hoe Story", value: "Hoe Story" },
    { label: "Assault", value: "Assault" },
    { label: "Cheating", value: "Cheating" },
    { label: "Entertaining", value: "Entertaining" },
    { label: "Funny", value: "Funny" },
    { label: "Shocking", value: "Shocking" },
    { label: "Murder", value: "Murder" },
    { label: "Sinful", value: "Sinful" },
    { label: "Daily Gist", value: "Daily Gist" },
    { label: "Personal Problem", value: "Personal Problem" },
    { label: "Health Issues", value: "Health Issues" },
    { label: "Politics", value: "Politics" },
    { label: "Supernatural events", value: "Supernatural events" },
    { label: "Ghost stories", value: "Ghost stories" },
    { label: "Others", value: "Others" },
  ];
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 7000);
  }, [errorMessage]);
  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });
  let [time, setTime] = useState(4);
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
  return user !== undefined || username !== undefined ? (
    <div>
      <LoggedInNav></LoggedInNav>
      {errorMessage !== "" && (
        <div className=" mt-[58px] bg-[#ff00002f] py-3 text-center text-[red] text-xl font-bold">
          {errorMessage}
        </div>
      )}
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

      <div
        className={`${
          errorMessage !== "" ? "mt-[40px]" : "mt-[130px]"
        } mb-[130px] lg:mb-[30px]`}
      >
        <div className="text-[red] text-center mx-[20px] text-[30px]  md:mx-auto">
          Sharing Your Darkest Secrets Anonymously
        </div>
        <form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setLoading(true);
              await Axios.post(
                "https://restapis.myconfessionz.com/api/create-post",
                { post: confession, category: room.value },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setLoading(false);
              setErrorMessage("Done");
              setConfession("");
              setRoom("");
              navigate("/homepage");
            } catch (error) {
              setLoading(false);
              console.log(error);
            }
          }}
          className="pb-[40px] mt-[40px] flex  flex-col justify-center items-center"
        >
          <textarea
            name=""
            id=""
            cols="93"
            rows="10"
            required
            value={confession}
            onChange={(e) => {
              setConfession(e.target.value);
            }}
            className="border-2 border-[green]    px-2 pt-2 placeholder:text-[red] hidden md:block rounded"
            placeholder="Share a confession"
          ></textarea>
          <textarea
            name=""
            id=""
            cols="40"
            rows="10"
            required
            value={confession}
            onChange={(e) => {
              setConfession(e.target.value);
            }}
            className="border-2 border-[red] px-2 pt-2 placeholder:text-[red] md:hidden rounded "
            placeholder="Share a confession"
          ></textarea>
          <div className="text-[red]  ml-[-140px] md:ml-[-520px] mt-6 text-xl">
            Select Room to share
          </div>
          <Select
            styles={{
              control: (base) => ({
                ...base,
                border: 0,
                // This line disable the blue border
                boxShadow: "red",
              }),
            }}
            value={room}
            onChange={(e) => {
              setRoom(e);
            }}
            //   onChange={this.handleChange}
            closeMenuOnSelect
            placeholder={"Select"}
            options={rooms}
            isSearchable={true}
            required
            className=" border border-slate-400 rounded-lg  mt-2 w-[330px] md:w-[710px]"
          />
          <button
            type="submit"
            className=" form-top text-base text-white px-[40px] py-[12px] rounded-2xl mt-4   "
            onClick={() => navigate("/post/create")}
          >
            Share
          </button>
        </form>
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
