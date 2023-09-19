import React, { useEffect, useState } from "react";
import dateFormat, { masks } from "dateformat";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import {
  setCommentss,
  setCounsellorComments,
} from "../redux/actions/UserActions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { EachReply } from "./eachreply";
import { EachcommentForCounsellor } from "./eachcommentForCounsellor";
import { EachReplyCounsellor } from "./eachreplyCousellor";

export const Eachcomment = ({ item }) => {
  console.log(item);
  const token = useSelector((state) => {
    return state.user.token;
  });

  console.log(item);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate("");

  // console.log(token);
  const [replies, setReplies] = useState([]);
  const [counsellorReplies, setCounsellorReplies] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [allLikes, setAllLikes] = useState(0);
  const [allReplies, setAllReplies] = useState(0);

  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });
  const userId = useSelector((state) => {
    return state.user.user.id;
  });

  const [commentUserDetails, setCommentUserDetails] = useState({});

  console.log(userId);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const dispatch = useDispatch();
  const pageComments = useSelector((state) => {
    return state.user.comments;
  });

  // console.log(pageComments);
  const counsellorcomments = useSelector((state) => {
    return state.user.counsellorcomments;
  });

  const [height, setHeight] = useState(0);

  const handleChange = (e) => {
    const element = e.target;
    const scrollHeight = element.scrollHeight || 0;
    const clientHeight = element.clientHeight || 0;
    const height = Math.max(scrollHeight, clientHeight);
    setHeight(height);
  };

  const handleCommentDelete = async (id) => {
    setLoading(true);
    try {
      if (user) {
        const data = await Axios.delete(
          `https://restapis.myconfessionz.com/api/user-delete-comment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.status === 500) {
          navigate("/homepage");
        }

        const newlist = pageComments.filter((item) => item.id !== id);
        dispatch(setCommentss(newlist));
        setLoading(false);
      } else {
        const data = await Axios.delete(
          `https://restapis.myconfessionz.com/api/counselor-delete-comment/${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newlist = counsellorcomments.filter((item) => item.id !== id);
        dispatch(setCounsellorComments(newlist));

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      navigate("/homepage");
    }
  };

  const submitReply = async (id) => {
    setSubmitLoading(true);
    // console.log(username);
    try {
      if (user) {
        console.log("There is user");
        const data = await Axios.post(
          `https://restapis.myconfessionz.com/api/user-reply-user/${id}`,
          { reply: newReply },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.status === 500) {
          navigate("/homepage");
        }
        getComment();

        setSubmitLoading(false);
        setNewReply("");
      } else {
        console.log("There is no user");
        const data = await Axios.post(
          `https://restapis.myconfessionz.com/api/counselor-reply-user/${id}`,
          { reply: newReply },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getComment();
        setNewReply("");
        if (data.status === 500) {
          navigate("/homepage");
        }

        setSubmitLoading(false);
      }
    } catch (error) {
      setSubmitLoading(false);
      console.log(error);
      // navigate("/login");
      navigate("/homepage");
    }
  };

  const getComment = async () => {
    if (item.user_comment) {
      try {
        const response = await Axios.get(
          `https://restapis.myconfessionz.com/api/user-single-comment/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCommentUserDetails(response?.data?.user);

        const isThere = response.data?.userLikes?.find(
          (item) => item.user_id === userId
        );
        const isCounsellorThere = response.data?.counselorLikes?.find(
          (item) => item.counselor_id === userId
        );
        if (isThere || isCounsellorThere) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }

        setReplies(response.data.userReplies);
        setCounsellorReplies(response.data.counselorReplies);
        setAllLikes(response.data.allLikes);
        setAllReplies(response.data.allReplies);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await Axios.get(
          `https://restapis.myconfessionz.com/api/counselor-single-comment/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllLikes(response.data.allLikes);
        setAllReplies(response.data.allReplies);
        console.log(response);
        const isThere = response.data?.userLikes?.find(
          (item) => item.user_id === userId
        );
        const isCounsellorThere = response.data?.counselorLikes?.find(
          (item) => item.counselor_id === userId
        );
        if (isThere || isCounsellorThere) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showCounsellorReplies, setShowcounsellorreplies] = useState(false);
  console.log(item);
  const [isliking, setIsliking] = useState(false);
  const [likechanged, setLikeChanged] = useState(true);
  console.log(token);
  const likeAPost = async () => {
    if (!isliking) {
      if (user) {
        if (item.user_comment) {
          setIsLiked(!isLiked);
          try {
            setIsliking(true);
            if (isLiked) {
              setAllLikes(allLikes - 1);
            } else {
              setAllLikes(allLikes + 1);
            }
            // console.log(token);
            console.log(
              `https://restapis.myconfessionz.com/api/user-like-user-comment/${item.post_id}/${item.id}`
            );
            const result = await Axios.post(
              `https://restapis.myconfessionz.com/api/user-like-user-comment/${item.post_id}/${item.id}`,
              {},
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
              `https://restapis.myconfessionz.com/api/user-like-counselor-comment/${item.post_id}/${item.id}`,

              {},
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
      } else {
        if (item.user_comment) {
          setIsLiked(!isLiked);
          try {
            setIsliking(true);
            const result = await Axios.post(
              `https://restapis.myconfessionz.com/api/counselor-like-user-comment/${item.post_id}/${item.id}`,
              {},
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
              `https://restapis.myconfessionz.com/api/counselor-like-counselor-comment/${item.post_id}/${item.id}`,

              {},
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
    }
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
  var dateString = commentUserDetails.dob;

  var age = calculateAge(dateString);

  return (
    <div>
      <div className="bg-[red] mx-auto  w-[90vw] md:w-[70vw] mb-7 text-white ">
        <div className="flex text-xl px-3 py-[20px] ">
          {commentUserDetails?.usercode}, {age},{" "}
          {dateFormat(item?.created_at, "mmmm d, yyyy")},
        </div>

        <div className="mt-3 px-3 pb-5 text-white">
          {" "}
          {item.user_comment || item.counselor_comment}
        </div>

        <div className=" flex flex-col justify-around items-stretch bg-white text-[red] pt-4 pb-2">
          <div className="flex justify-around   items-center">
            <div
              onClick={() => {
                handleShow();
                {
                  console.log(item.id);
                }
                setModalData({
                  commentId: item.id,
                  title: item.comment,
                  replies: replies,
                  counsellorReplies: counsellorReplies,
                });
              }}
              className=" flex  justify-center pr-5 items-center text-xl hover:cursor-pointer mt-2 "
            >
              {replies.length + counsellorReplies.length}
              <span className="text-black ml-3 text-lg">
                {replies.length + counsellorReplies.length > 1
                  ? "Replies"
                  : "Reply"}
              </span>
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
                        setIsLiked(true);
                        // // console.log(item);
                        likeAPost();
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
                        likeAPost();
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

          {/* {console.log(item.postId)} */}
          {/* {console.log(userId)} */}
          {userId === item.user_id && (
            <button
              onClick={() => {
                handleCommentDelete(item.id);
              }}
              type="submit"
              className=" self-center  form-top text-base text-white px-[20px] py-[12px] rounded-2xl mt-4  mb-3  "
            >
              {loading ? (
                <div className=" flex items-center">
                  <div
                    class="spinner-border float-end mr-2 text-[5px]"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  Loading
                </div>
              ) : (
                <div className="">Delete</div>
              )}
            </button>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" form-top text-base text-white px-[20px] py-[12px] rounded-2xl mb-[70px] mt-4 "
              onClick={() => setShowcounsellorreplies(!showCounsellorReplies)}
            >
              {!showCounsellorReplies
                ? "Counsellor Replies"
                : "Anonymous Replies"}
            </button>
          </div>

          {!showCounsellorReplies ? (
            <div className="mt-3">
              <h2 className="mt-[-30px] font-bold text-2xl">
                All Anonymous Replies
              </h2>

              {replies.length === 0 ? (
                <h4 className="text-center my-7 text-xl">No Replies yet</h4>
              ) : (
                replies.map((item1) => {
                  return (
                    <EachReply
                      item={item1}
                      getComment={getComment}
                      postId={item.post_id}
                      commentId={item.id}
                      replies={replies}
                      counsellorReplies={counsellorReplies}
                    ></EachReply>
                  );
                })
              )}
            </div>
          ) : (
            <div className="mt-3">
              <h2 className="mt-[-30px] font-bold text-2xl">
                All Counsellor Replies
              </h2>

              {counsellorReplies.length === 0 ? (
                <h4 className="text-center my-7 text-xl">No Replies yet</h4>
              ) : (
                counsellorReplies.map((item1) => {
                  return (
                    <EachReplyCounsellor
                      item={item1}
                      getComment={getComment}
                      postId={item.post_id}
                      commentId={item.id}
                      replies={replies}
                      counsellorReplies={counsellorReplies}
                    ></EachReplyCounsellor>
                  );
                })
              )}
            </div>
          )}
        </Modal.Body>
        <div className="mypad"></div>
        <Modal.Footer></Modal.Footer>
        <div className="flex  fixed bottom-0 left-0 bg-slate-200 ">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              submitReply(modalData.commentId);
            }}
            className="flex py-2 items-center justify-center w-screen bg-[#00000032] p-2  "
          >
            <textarea
              value={newReply}
              onChange={(e) => {
                setNewReply(e.target.value);
                handleChange(e);
              }}
              placeholder="Reply to the comment"
              className=" placeholder:text-black w-[70%]  overflow-y-hidden border-black border-2  rounded-xl p-3 pb-4"
              style={{ height: `${height}px` }}
              rows="1"
            ></textarea>
            <br />
            <button className="bg-red-600 ml-2  py-3 px-2 rounded text-white">
              {submitLoading ? (
                <div className=" flex items-center">
                  <div
                    class="spinner-border float-end mr-2 text-[5px]"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  Loading
                </div>
              ) : (
                <div className="">Submit Reply</div>
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
