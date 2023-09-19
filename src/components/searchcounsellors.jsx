import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoggedInNav } from "./loggedinNav";

export const Searchcounsellors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(false);

  const originalFieldList = [
    { id: 1, name: "Mental Health Counseling" },
    { id: 2, name: "Marriage and Family Counseling" },
    { id: 3, name: "School Counseling" },
    { id: 4, name: "Career Counseling" },
    { id: 5, name: "Substance Abuse Counseling" },
    { id: 6, name: "Rehabilitation Counseling" },
    { id: 7, name: "Grief Counseling" },
    { id: 8, name: "Child and Adolescent Counseling" },
    { id: 9, name: "Geriatric Counseling" },
    { id: 10, name: "Trauma Counseling" },
    { id: 11, name: "Eating Disorders Counseling" },
    { id: 12, name: "Multicultural Counseling" },
    { id: 13, name: "Military and Veterans Counseling" },
    { id: 14, name: "Art Therapy" },
    { id: 15, name: "Play Therapy" },
    { id: 16, name: "Sex Therapy" },
    { id: 17, name: "Community Counseling" },
  ];
  const [fieldList, setFieldList] = useState(originalFieldList);
  const [isSearchingByField, setIsSearchingByField] = useState(true);
  const [isSearchingByName, setIsSearchingByName] = useState(false);

  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });

  const token = useSelector((state) => {
    return state.user.token;
  });

  const [filterName2, setFilterName2] = useState("");
  const [counsellors2, setCounsellors2] = useState([]);

  const getCounsellors2 = async () => {
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

      setCounsellors2(result.data.counselors);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const newdata = counsellors.filter((item) =>
      item.username.toLowerCase().includes(filterName.toLowerCase())
    );
    setDataDisplayed(newdata);
  }, [loading]);

  const getCounsellors = async (field) => {
    setLoading(true);
    try {
      const result = await Axios.get(
        `https://restapis.myconfessionz.com/api/counselors-by-field/${field}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);

      setCounsellors(result.data.counselor);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const [filterName, setFilterName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [dataDisplayed, setDataDisplayed] = useState([]);

  useEffect(() => {
    if (fieldName === "") {
      setFieldList(originalFieldList);
    }
  }, [fieldName]);

  useEffect(() => {
    if (filterName === "") {
      setDataDisplayed(counsellors);
    }
  }, [filterName]);
  useEffect(() => {
    setDataDisplayed(counsellors);
  }, [counsellors]);

  useEffect(() => {
    getCounsellors();
    getCounsellors2();
  }, []);

  const [dataDisplayed2, setDataDisplayed2] = useState([]);

  useEffect(() => {
    if (filterName2 === "") {
      setDataDisplayed2(counsellors2);
    }
  }, [filterName2]);
  useEffect(() => {
    setDataDisplayed2(counsellors2);
  }, [counsellors2]);

  const [fieldNameToDisplay, setFieldNameToDisplay] = useState("");

  return (
    <div>
      <LoggedInNav></LoggedInNav>
      <div className=" ">
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
        <div className="left px-[20px] pt-[90px] lg:hidden  pb-[130px]  overflow-y-scroll h-[100vh]   border-2 shadow-2xl   ">
          <div className="text-xl text-center z-40 max-w-[80%] mx-auto text-[red]">
            {!isSearchingByName ? (
              <div className="text-xl text-center z-40 max-w-[80%] mx-auto text-[red]">
                Search Councellors
                {isSearchingByField
                  ? "by Field"
                  : `for 
                ${fieldNameToDisplay}`}
              </div>
            ) : (
              "Search Councellors by Name"
            )}
          </div>

          <div className="flex justify-center mt-3">
            {isSearchingByName ? (
              <button
                className="bg-[red] py-2 px-3 rounded text-white "
                onClick={() => {
                  setIsSearchingByName(!isSearchingByName);
                }}
              >
                <i className="bi bi-arrow-right"></i> Search by Field
              </button>
            ) : (
              <button
                className="bg-[red] py-2 px-3 rounded text-white "
                onClick={() => {
                  setIsSearchingByName(!isSearchingByName);
                }}
              >
                <i className="bi bi-arrow-right"></i> Search by name
              </button>
            )}
          </div>
          {!isSearchingByName ? (
            <div>
              {" "}
              {isSearchingByField ? (
                <div>
                  <form action="" className="flex justify-center mb-4">
                    <input
                      type="text"
                      value={fieldName}
                      onChange={(e) => {
                        setFieldName(e.target.value);
                        const newdata = fieldList.filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(fieldName.toLowerCase())
                        );
                        setFieldList(newdata);
                      }}
                      className="w-[80%] rounded border-2 placeholder:text-[red] border-[red] p-2 mt-4"
                      placeholder="Search by field"
                    />
                  </form>
                  <div className="mt-6 sm:ml-10">
                    <h3 className="text-xl text-center">
                      {fieldList.length === 0 && "Not Available"}
                    </h3>
                    {fieldList.map((item) => {
                      return (
                        <div className="flex justify-start items-center mt-4 pl-[22px]">
                          {/* <img src={item.image} alt="" /> */}
                          <h4
                            onClick={() => {
                              //   navigate(`/counsellor/${item.id}`);
                              getCounsellors(item.name);
                              setFieldNameToDisplay(item.name);
                              setIsSearchingByField(false);
                            }}
                            className="text-[black] uppercase text-xl ml-3 cursor-pointer hover:text-[red] max-w-[70%]"
                          >
                            {item?.name}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex ml-3 mt-3">
                    <button
                      className="bg-[red] py-2 px-3 rounded text-white"
                      onClick={() => {
                        setIsSearchingByField(true);
                      }}
                    >
                      <i className="bi bi-arrow-left"></i> Fields
                    </button>
                  </div>
                  <form action="" className="flex justify-center mb-4">
                    <input
                      type="text"
                      value={filterName}
                      onChange={(e) => {
                        setFieldName(e.target.value);
                        const newdata = counsellors.filter((item) =>
                          item.username
                            .toLowerCase()
                            .includes(fieldName.toLowerCase())
                        );
                        setCounsellors(newdata);
                      }}
                      className="w-[80%] rounded border-2 placeholder:text-[red] border-[red] p-2 mt-3"
                      placeholder="Search by name"
                    />
                  </form>

                  <div className="mt-6">
                    <h3 className="text-xl text-center">
                      {counsellors.length === 0 && "Not Available"}
                    </h3>
                    {counsellors.map((item) => {
                      return (
                        <div className="flex justify-start items-center mt-4 pl-[22px]">
                          {/* <img src={item.image} alt="" /> */}
                          <h4
                            onClick={() => {
                              navigate(`/counsellor/${item.id}`);
                            }}
                            className="text-[black] uppercase text-xl ml-3 cursor-pointer hover:text-[red] max-w-[70%]"
                          >
                            {item?.username}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}{" "}
            </div>
          ) : (
            <h3 className="">
              <form action="" className="flex justify-center mb-4">
                <input
                  type="text"
                  value={filterName2}
                  onChange={(e) => {
                    setFilterName2(e.target.value);
                    const newdata = counsellors2.filter((item) =>
                      item.username
                        .toLowerCase()
                        .includes(filterName2.toLowerCase())
                    );
                    setDataDisplayed2(newdata);
                  }}
                  className="w-[80%] rounded border-2 placeholder:text-lg placeholder:text-[red] border-[red] p-2 mt-4"
                  placeholder="Search by name"
                />
              </form>

              <div className="mt-6 sm:ml-10">
                {dataDisplayed2.map((item) => {
                  return (
                    <div className="flex justify-start items-center mt-4 pl-[22px]">
                      {/* <img src={item.image} alt="" /> */}
                      <h4
                        onClick={() => {
                          navigate(`/counsellor/${item.id}`);
                        }}
                        className="text-[black] uppercase text-xl ml-3 cursor-pointer hover:text-[red] max-w-[70%]"
                      >
                        {item?.username}
                      </h4>
                    </div>
                  );
                })}
              </div>

              {dataDisplayed2.length === 0 && (
                <p className="mx-auto ml-3 w-[70%]">
                  No Counsellor Matches the Description
                </p>
              )}
            </h3>
          )}
        </div>
        <div className="hidden  lg:flex h-screen items-center justify-center ">
          <h4>
            This page is not Available on large screen, kindly go to homepage to
            search for counsellors
          </h4>
        </div>
      </div>
    </div>
  );
};
