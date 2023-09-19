import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import confessbg from "../utils/confessbg.jpg";
import { useSelector } from "react-redux";
import dateFormat, { masks } from "dateformat";
import Axios from "axios";

export const IndividualPost = ({ item }) => {
  // console.log(item);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });
  const token = useSelector((state) => {
    return state.user.token;
  });
  const userId = useSelector((state) => {
    return state.user.user.id;
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

  const [userDetails, setUserDetails] = useState({});
  const [couslen, setCounslen] = useState(0);
  const [anonslen, setAnonslen] = useState(0);
  const [likechanged, setLikeChanged] = useState(true);
  const [allLikes, setAllLikes] = useState(0);

  useEffect(() => {
    setAllLikes(item.overallLikesCount);
  }, []);

  const [isliking, setIsliking] = useState(false);

  const likeAPost = async (id) => {
    setIsLiked(!isLiked);
    if (!isliking) {
      if (user) {
        setIsLiked(!isLiked);
        if (isLiked) {
          setAllLikes(allLikes - 1);
        } else {
          setAllLikes(allLikes + 1);
        }
        try {
          setIsliking(true);
          const result = await Axios.post(
            `https://restapis.myconfessionz.com/api/user-like-post/${id}`,
            { id: id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(result);

          if (result.status === 201) {
            setIsLiked(true);
            setAllLikes(allLikes + 1);
          } else {
            setIsLiked(false);
            if (allLikes > 0) {
              setAllLikes(allLikes - 1);
            }
          }
          setLikeChanged(!likechanged);
          setIsliking(false);
          // setCounslen(result.data.PostComments.length);
          // setPageData(result.data.posts);
        } catch (error) {
          console.log(error);
          setIsLiked(!isLiked);
          setIsliking(false);
          // navigate("/login");
        }
      } else {
        setIsLiked(!isLiked);
        if (isLiked) {
          setAllLikes(allLikes - 1);
        } else {
          setAllLikes(allLikes + 1);
        }
        try {
          setIsliking(true);
          const result = await Axios.post(
            `https://restapis.myconfessionz.com/api/counselor-like-post/${id}`,
            { id: id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(result);

          if (result.status === 201) {
            setIsLiked(true);
            setAllLikes(allLikes + 1);
          } else {
            setIsLiked(false);
            if (allLikes > 0) {
              setAllLikes(allLikes - 1);
            }
          }
          setLikeChanged(!likechanged);
          // setCounslen(result.data.PostComments.length);
          // setPageData(result.data.posts);
          setIsliking(false);
        } catch (error) {
          console.log(error);
          // navigate("/login");
          setIsLiked(!isLiked);
          setIsliking(false);
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLiked]);

  useEffect(() => {
    console.log(userId);
    const isThere = item.userLikes.find((item) => item.user_id === userId);
    const isCounsellorThere = item.counselorLikes.find(
      (item) => item.counselor_id === userId
    );
    if (isThere || isCounsellorThere) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, []);

  function calculateAge(dateString) {
    // Create a new date object from the input string
    var birthDate = new Date(dateString);

    // Get the current date
    var currentDate = new Date();

    // Calculate the difference in years
    var age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the current date has passed the birthdate for this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--; // Subtract 1 from age if the birthdate has not been reached yet
    }

    return age;
  }
  var dateString = item.dob;

  var age = calculateAge(dateString);
  // console.log(item);
  return user !== undefined || username !== undefined ? (
    <div>
      <div className="mt-6 mb-[60px] shadow-2xl border border-red-300 py-4 mx-[10px] md:mx-[50px] px-3 md:px-6 rounded-xl">
        <div className="flex flex-col text-[red]">
          {console.log(item)}
          {item?.usercode || item?.username}, {item?.gender}, {age}{" "}
          {age > 2 ? "years" : "year"} ,
          {dateFormat(item?.createdAt, "mmmm d, yyyy")} <br />
        </div>
        <div
          onClick={() => {
            navigate(`/post/show/${item.postId}`);
          }}
          className="mt-3 leading-6 text-[red] hover:cursor-pointer"
        >
          {/* {console.log(item)} */}
          {item.post.split(" ").length > 70
            ? `${item.post.split(/\s+/).slice(0, 70).join(" ")} read more...`
            : item.post}
        </div>

        <div className="w-[100%] mx-auto justify-center bg-[red] h-[1px] my-3 "></div>

        <div className="mt-3 flex justify-around items-center">
          <div
            className=" flex flex-col justify-center items-center hover:cursor-pointer "
            onClick={() => {
              navigate(`/post/show/${item.postId}`);
            }}
          >
            <i className="bi bi-chat-right-dots text-2xl text-[red]"></i>
            <div className="text-base text-[red]">
              {/* {console.log(item)} */}
              {item.allCommentsCount}{" "}
              {item.allCommentsCount < 2 ? "Comment" : "Comments"}
            </div>
          </div>
          {/* <div className=" flex flex-col justify-center items-center hover:cursor-pointer  ">
            {!isLiked && (
              <i
                onClick={() => {
                  setIsLiked(true);
                }}
                className="bi bi-hand-thumbs-up text-3xl text-[red]"
              ></i>
            )}
            {isLiked && (
              <i
                onClick={() => {
                  setIsLiked(false);
                }}
                className="bi bi-hand-thumbs-up-fill text-3xl text-[red]"
              ></i>
            )}


            
          </div> */}
          <div className=" flex flex-col justify-center items-center hover:cursor-pointer  ">
            {!isLiked && (
              <div
                onClick={() => {
                  // setIsLiked(true);

                  console.log(item);
                }}
                className=" "
              >
                <div className="flex items-center text-[red] font-bold  text-xl">
                  {allLikes}
                  <i
                    onClick={() => {
                      // setIsLiked(false);
                      console.log(item);
                      likeAPost(item.postId);
                    }}
                    className="bi bi-hearts cursor-pointer text-3xl  text-slate-600 pl-[5px]  "
                  ></i>
                </div>
              </div>
            )}

            {isLiked && (
              <div
                onClick={() => {
                  // setIsLiked(true);
                  console.log(item);
                }}
                className=" "
              >
                <div className="flex items-center text-[red] font-bold  text-xl">
                  {allLikes}
                  <i
                    onClick={() => {
                      likeAPost(item.postId);
                      // setIsLiked(false);
                    }}
                    className="bi bi-hearts cursor-pointer text-3xl  text-[red] pl-[5px]  "
                  ></i>
                </div>
              </div>
            )}
            {/* <h3 className=" text-[red] text-xl">React</h3>   */}
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
        <span className="text-2xl text-white">
          Redirecting to Login page in {time}
        </span>
      </div>
    </div>
  );
};
