import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { confessions } from "../utils/confessions";
import { LoggedInNav } from "./loggedinNav";
import confessbg from "../utils/confessbg.jpg";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import dateFormat, { masks } from "dateformat";
import { Eachcomment } from "./eachcomment";
import {
  setCounsellorComments,
  setCommentss,
} from "../redux/actions/UserActions";
import { EachcommentForCounsellor } from "./eachcommentForCounsellor";

export const EachPost = () => {
  const [postToBeShown, setPostToBeShown] = useState([]);

  useEffect(() => {
    return () => {
      setAllLikes(0);
    };
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const params = useParams();
  const [showCounsellorReplies, setShowcounsellorreplies] = useState(false);
  const [loading, setLoading] = useState(false);

  const [likechanged, setLikeChanged] = useState(true);
  const [allLikes, setAllLikes] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });
  const userId = useSelector((state) => {
    return state?.user?.user?.id;
  });

  const [isliking, setIsliking] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    console.log(postToBeShown);
    if (postToBeShown.post) {
      setAllLikes(
        postToBeShown?.counselor_likes_count + postToBeShown?.user_likes_count
      );
      setCommentsCount(
        postToBeShown?.counselor_comments_count +
          postToBeShown?.user_comments_count
      );
    }
  }, [postToBeShown]);
  const likeAPost = async (id) => {
    if (!isliking) {
      setIsLiked(!isLiked);
      if (isLiked) {
        setAllLikes(allLikes - 1);
      } else {
        setAllLikes(allLikes + 1);
      }
      if (user) {
        setIsLiked(!isLiked);

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
          setIsliking(false);
          console.log(error);
          setIsLiked(!isLiked);
          // navigate("/login");
        }
      } else {
        setIsLiked(!isLiked);
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
          setIsliking(false);
          // setCounslen(result.data.PostComments.length);
          // setPageData(result.data.posts);
        } catch (error) {
          console.log(error);
          setIsLiked(!isLiked);
          setIsliking(false);
          // navigate("/login");
        }
      }
    }
  };
  useEffect(() => {
    // console.log(userId);
    const isThere = postToBeShown?.user_likes?.find(
      (item) => item.user_id === userId
    );
    const isCounsellorThere = postToBeShown?.counselor_likes?.find(
      (item) => item.counselor_id === userId
    );
    if (isThere || isCounsellorThere) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [postToBeShown]);

  const token = useSelector((state) => {
    return state.user.token;
  });

  const deletePost = async () => {
    try {
      setLoading(true);
      const result = await Axios.delete(
        `https://restapis.myconfessionz.com/api/delete-post/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      setLoading(true);
      const result = await Axios.get(
        `https://restapis.myconfessionz.com/api/single-post/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(result);
      dispatch(setCommentss(result.data.post.user_comments));
      dispatch(setCounsellorComments(result.data.post.counselor_comments));
      setPostToBeShown(result.data.post);

      setLoading(false);

      setLoading(false);
      // setPageData(result.data.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      navigate("/homepage");
    }
  };
  useEffect(() => {
    console.log(postToBeShown);
  }, [postToBeShown]);

  const [comments, setComments] = useState([]);
  // const [pageComments, setPageComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  // const [counsellorcomments, setcounsellorComments] = useState([]);
  const dispatch = useDispatch();
  // const getComments = async () => {
  //   console.log(params.id);
  //   try {
  //     setLoading(true);
  //     const result = await Axios.get(
  //       `https://restapis.myconfessionz.com/api/all-post-comment/${params.id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log(result);
  //     // dispatch(setCommentss(result.data));
  //     setLoading(false);
  //     console.log(result);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     // navigate("/login");
  //   }
  // };
  // const getcounsellorcomments = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await Axios.get(
  //       `https://restapis.myconfessionz.com/api/all-post-comments-counselor/${params.id}`,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // dispatch(setCounsellorComments(result.data.PostComments));
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     // navigate("/login");
  //   }
  // };
  const pageComments = useSelector((state) => {
    return state.user.comments;
  });

  console.log(pageComments);
  const counsellorcomments = useSelector((state) => {
    return state.user.counsellorcomments;
  });
  // console.log(counsellorcomments);

  console.log();

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    // getComments();
    // getcounsellorcomments();
  }, []);

  console.log(userId);
  let [time, setTime] = useState(4);

  if (user === undefined && username === undefined) {
    setTimeout(() => setTime(time - 1), 1000);
  }

  useEffect(() => {
    if (time === 0) {
      navigate("/login");
    }
  }, [time]);

  const [height, setHeight] = useState(0);

  const handleChange = (e) => {
    const element = e.target;
    const scrollHeight = element.scrollHeight || 0;
    const clientHeight = element.clientHeight || 0;
    const height = Math.max(scrollHeight, clientHeight);
    setHeight(height);
  };

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
  var dateString = postToBeShown?.user?.dob;

  var age = calculateAge(dateString);
  return user !== undefined || username !== undefined ? (
    <div className="mb-[230px]">
      <LoggedInNav></LoggedInNav>
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
      <div className="mt-[130px] border border-red-200 mb-[60px] shadow-xl py-4 mx-[10px] md:mx-[50px] px-3 md:px-6 rounded-xl">
        <div className="flex text-[red]">
          {console.log(postToBeShown)}
          {postToBeShown?.user?.usercode || postToBeShown?.user?.username},{" "}
          {age} , {dateFormat(postToBeShown.createdAt, "mmmm d, yyyy")} <br />
        </div>
        <div className="mt-3 leading-6 text-[red] hover:cursor-pointer">
          {postToBeShown.post}
        </div>

        <div className="w-[93%] mx-auto bg-slate-300 h-[1px] my-3 "></div>

        <div className="mt-3 flex justify-around items-center">
          <div className=" flex flex-col justify-center items-center hover:cursor-pointer ">
            <i className="bi bi-chat-right-dots text-2xl text-[red]"></i>

            <div className="text-base text-[red]">
              {commentsCount}
              {commentsCount > 2 ? " Comments" : " Comment"}
            </div>
          </div>

          <div className=" flex flex-col justify-center items-center hover:cursor-pointer  ">
            {!isLiked && (
              <div
                onClick={() => {
                  // setIsLiked(true);
                  // console.log(item);
                }}
                className=" "
              >
                <div className="flex items-center text-[red] font-bold  text-xl">
                  {allLikes}
                  <i
                    onClick={() => {
                      setIsLiked(false);
                      // console.log(item);
                      likeAPost(postToBeShown.id);
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
                  // console.log(item);
                }}
                className=" "
              >
                <div className="flex items-center text-[red] font-bold  text-xl">
                  {allLikes}
                  <i
                    onClick={() => {
                      likeAPost(postToBeShown.id);
                      setIsLiked(false);
                    }}
                    className="bi bi-hearts cursor-pointer text-3xl  text-[red] pl-[5px]  "
                  ></i>
                </div>
              </div>
            )}
            {/* <h3 className=" text-[red] text-xl">React</h3>   */}
          </div>
        </div>
        <div className="w-[93%] mx-auto bg-slate-300 h-[1px] my-3 "></div>

        <div className="text-lg mt-2 ml-2 text-[red] font-bold">
          Report as false
        </div>

        {userId === postToBeShown.user_id && (
          <button
            className=" form-top text-base text-white px-[20px] py-[12px] rounded-2xl  mt-3  "
            onClick={() => {
              deletePost(postToBeShown.id);
            }}
          >
            Delete
          </button>
        )}
      </div>
      <div className="flex w-screen items-center  bg-[#00000053] justify-center fixed bottom-[55px]">
        <form
          action=""
          className="   justify-center items-center"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setLoading(true);
              if (user) {
                const response = await Axios.post(
                  `https://restapis.myconfessionz.com/api/user-comment/${params.id}`,
                  {
                    comment: commentBody,
                    category: postToBeShown.category,
                    user_id: userId,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                getData();
                // setPageComments([
                //   ...pageComments,
                //   { created_at: Date.now(), comment: commentBody },
                // ]);

                console.log("Done");
                setCommentBody("");
                setLoading(false);
              } else {
                const response = await Axios.post(
                  `https://restapis.myconfessionz.com/api/counselor-comment/${params.id}`,
                  {
                    comment: commentBody,
                    category: postToBeShown.category,
                    user_id: userId,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                // setcounsellorComments([
                //   ...counsellorcomments,
                //   { created_at: Date.now(), comment: commentBody },
                // ]);
                getData();
                console.log("Done");
                setCommentBody("");
                setLoading(false);
              }

              // setcounsellorComments(result.data.message);
            } catch (error) {
              setLoading(false);
              console.log(error);
              navigate("/homepage");
            }
          }}
        >
          <div className="flex items-center">
            <textarea
              name=""
              id=""
              cols={20}
              value={commentBody}
              onChange={(e) => {
                setCommentBody(e.target.value);
                handleChange(e);
              }}
              className="border-2 rounded-xl overflow-hidden border-[red] focus:border-[red] active::border-[red] px-3 pt-3 pb-4 placeholder:text-[red] hidden md:block w-[50vw]"
              placeholder="Comment"
              style={{ height: `${height}px` }}
            ></textarea>
            <textarea
              name=""
              id=""
              rows="10"
              value={commentBody}
              onChange={(e) => {
                setCommentBody(e.target.value);
                handleChange(e);
              }}
              className="border-2 rounded-xl overflow-hidden  w-[60vw] sm:w-[70vw] border-[red] focus:border-[red] active::border-[red] px-3 pt-3 pb-4 placeholder:text-[red] md:hidden "
              placeholder="Comment"
              style={{ height: `${height}px` }}
            ></textarea>

            <button
              type="submit"
              className=" ml-2 lg:ml-8 form-top text-base text-white px-[20px] py-[12px] rounded-2xl mt-4  mb-3  "
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="flex w-[100vw] items-center mt-[30px] ">
        <div className="w-[30%] mx-auto bg-[red] h-[1px] my-3 "></div>
        <div className="text-2xl text-[red]"> Comments</div>
        <div className="w-[30%] mx-auto bg-[red] h-[1px] my-3 "></div>
      </div>

      <button
        type="submit"
        className=" form-top text-base text-white px-[20px] py-[12px] rounded-2xl mb-[70px] mt-4 ml-[20px] md:ml-[60px] "
        onClick={() => setShowcounsellorreplies(!showCounsellorReplies)}
      >
        {!showCounsellorReplies ? "Counsellor Comments" : "Anonymous Comments"}
      </button>

      {
        <div className="mb-[100px]">
          {!showCounsellorReplies ? (
            <div>
              {pageComments?.length === 0 && (
                <div>
                  <div className="text-xl text-center">No Comments</div>
                </div>
              )}
              {pageComments?.map((item) => {
                return <Eachcomment item={item}></Eachcomment>;
              })}
            </div>
          ) : (
            <div>
              {counsellorcomments.length === 0 && (
                <div>
                  <div className="text-xl text-center">No Comments</div>
                </div>
              )}
              {counsellorcomments?.map((item) => {
                return (
                  <EachcommentForCounsellor
                    item={item}
                  ></EachcommentForCounsellor>
                );
              })}
            </div>
          )}
        </div>
      }
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
