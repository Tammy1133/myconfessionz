import React, { useEffect, useState } from "react";
import icon1 from "../utils/icon2.png";
import icon2 from "../utils/icon3.png";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const Counsellor = () => {
  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });

  const token = useSelector((state) => {
    return state.user.token;
  });
  const [filterName, setFilterName] = useState("");
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const newdata = counsellors.filter((item) =>
      item.username.toLowerCase().includes(filterName.toLowerCase())
    );
    setDataDisplayed(newdata);
  }, [loading]);

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

      setCounsellors(result.data.counselors);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const navigate = useNavigate();
  // const counsellors = [
  //   { id: 1, name: "Johnson Samuel", gender: "male" },
  //   { id: 2, name: "Anita Chriswell", gender: "female" },
  //   { id: 3, name: "Likee Mitchelle", gender: "female" },
  //   { id: 4, name: "Rick Lawson", gender: "male" },
  //   { id: 5, name: "Larry Joseph", gender: "male" },
  //   { id: 6, name: "Johnson Samuel", gender: "male" },
  //   { id: 7, name: "Anita Chriswell", gender: "female" },
  //   { id: 8, name: "Likee Mitchelle", gender: "female" },
  //   { id: 9, name: "Rick Lawson", gender: "male" },
  //   { id: 10, name: "Larry Joseph", gender: "male" },
  //   { id: 11, name: "Johnson Samuel", gender: "male" },
  //   { id: 12, name: "Anita Chriswell", gender: "female" },
  //   { id: 13, name: "Likee Mitchelle", gender: "female" },
  //   { id: 14, name: "Rick Lawson", gender: "male" },
  //   { id: 15, name: "Larry Joseph", gender: "male" },
  // ];

  useEffect(() => {
    getCounsellors();
  }, []);

  const [dataDisplayed, setDataDisplayed] = useState([]);

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  useEffect(() => {
    if (filterName === "") {
      setDataDisplayed(counsellors);
    }
  }, [filterName]);
  useEffect(() => {
    setDataDisplayed(counsellors);
  }, [counsellors]);

  return (
    <div className="left pt-[90px]  pb-[130px]  overflow-y-scroll h-[100vh]   hidden md:block w-[35vw]  lg:w-[25vw] border-2 shadow-2xl   ">
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
      <div className="md:text-md lg:text-xl text-center z-40 max-w-[80%] mx-auto text-[red]">
        Search Councellors by name
      </div>

      <form action="" className="flex justify-center mb-4">
        <input
          type="text"
          value={filterName}
          onChange={(e) => {
            setFilterName(e.target.value);
            const newdata = counsellors.filter((item) =>
              item.username.toLowerCase().includes(filterName.toLowerCase())
            );
            setDataDisplayed(newdata);
          }}
          className="w-[80%] rounded border-2 placeholder:text-[red] border-[red] p-2 mt-4"
          placeholder="Search by name"
        />
      </form>

      <div className="mt-6">
        {dataDisplayed.map((item) => {
          return (
            <div className="flex justify-start items-center mt-4 pl-[22px]">
              {/* <img src={item.image} alt="" /> */}
              <h4
                onClick={() => {
                  navigate(`/counsellor/${item.id}`);
                }}
                className="uppercase md:text-xs lg:text-sm lg:ml-3  text-[red]  cursor-pointer hover:text-[red] max-w-[70%]"
              >
                {item?.username}
                <span className="text-[black]">
                  {" "}
                  ({item?.counseling_field})
                </span>
              </h4>
            </div>
          );
        })}
      </div>

      {dataDisplayed.length === 0 && (
        <p className="mx-auto ml-3 w-[70%]">
          No Counsellor Matches the Description
        </p>
      )}
    </div>
  );
};
