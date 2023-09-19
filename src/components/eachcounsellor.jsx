import React, { useEffect, useState } from "react";
import { LoggedInNav } from "./loggedinNav";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

export const Eachcounsellor = () => {
  const [loading, setLoading] = useState(false);
  const [counsellorDetails, setCounsellorDetails] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const params = useParams();

  const token = useSelector((state) => {
    return state.user.token;
  });
  const userId = useSelector((state) => {
    return state.user.user.id;
  });
  const [image, setImage] = useState("");

  const getCounsellors = async () => {
    // setLoading(true);
    try {
      const result = await Axios.get(
        `https://restapis.myconfessionz.com/api/get-single-counselor/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      setCounsellorDetails(result.data.counselor);
      //   setCounsellors(result.data.counselors);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      //   console.log(error);
    }
  };
  useEffect(() => {
    console.log(allReviews);
  }, [allReviews]);
  const getReviews = async () => {
    setLoading(true);
    try {
      const result = await Axios.get(
        `https://restapis.myconfessionz.com/api/single-counselor-reviews/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      setAllReviews(result.data.review);
      // setCounsellorDetails(result.data.counselor);
      // console.log("Testing");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      //   console.log(error);
    }
  };
  const addReview = async () => {
    setLoading(true);
    try {
      const result = await Axios.post(
        `https://restapis.myconfessionz.com/api/user-create-review/${params.id}`,
        { review: newReview },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      getReviews();
      setNewReview("");
      // setCounsellorDetails(result.data.counselor);
      // console.log("Testing");

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      //   console.log(error);
    }
  };
  const deleteReview = async (id) => {
    setLoading(true);
    try {
      const result = await Axios.delete(
        `https://restapis.myconfessionz.com/api/delete-review/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      getReviews();

      // setCounsellorDetails(result.data.counselor);
      // console.log("Testing");

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      //   console.log(error);
    }
  };
  // const getImage = async () => {
  //   try {
  //     const result = await Axios.get(
  //       `https://restapis.myconfessionz.com/api/counselors/64a54fcf54951-counselor.jpg`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(result.data);
  //     setImage(result.data);
  //   } catch (error) {
  //     setLoading(false);
  //     //   console.log(error);
  //   }
  // };
  const getImage = async (image) => {
    try {
      const response = await Axios.get(
        `https://restapis.myconfessionz.com/api/counselors/${image}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImage(`data:image/jpeg;base64,${response.data.image}`);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    getCounsellors();
    getReviews();
  }, []);

  useEffect(() => {
    getImage(counsellorDetails.image);
  }, [counsellorDetails]);

  return (
    <div>
      <LoggedInNav></LoggedInNav>

      {loading ? (
        <div className="h-[80vh] flex justify-center items-center">
          <h4>Loading</h4>
        </div>
      ) : (
        <div className="my-[100px]  px-5">
          <img
            src={image}
            alt=""
            className="h-[250px] w-[250px] rounded-full object-fill"
          />
          <div className="flex">
            <h4>
              <span className="text-[red]">First name</span>:{" "}
              {counsellorDetails.first_name}
            </h4>
          </div>
          <div className="flex mt-2">
            <h4>
              <span className="text-[red]">Last name</span>:{" "}
              {counsellorDetails.last_name}
            </h4>
          </div>
          <div className="flex mt-2">
            <h4>
              <span className="text-[red]">Username</span>:{" "}
              {counsellorDetails.username}
            </h4>
          </div>
          <div className="flex mt-2">
            <h4>
              <span className="text-[red]">Gender</span>:{" "}
              {counsellorDetails.gender}
            </h4>
          </div>

          <div className="flex mt-2">
            <h4>
              <span className="text-[red]">Date of birth</span>:{" "}
              {counsellorDetails.dob}
            </h4>
          </div>
          <div className="flex mt-2">
            <h4>
              <span className="text-[red]">Bio</span>: {counsellorDetails.bio}
            </h4>
          </div>
          <div className="flex mt-2">
            <h4>
              <span className="text-[red]">Counselling Field</span>:{" "}
              {counsellorDetails.counselling_field}
            </h4>
          </div>
          <div className="flex mt-2">
            <h4>
              <span className="text-[red]">Location</span>:{" "}
              {counsellorDetails.state}, {counsellorDetails.country}
            </h4>
          </div>
          <div className="flex mt-2">
            <h4>
              <span className="text-[red]">Reviews</span>: {allReviews.length}
            </h4>
          </div>
          {/* <div className="flex mt-2">
          <h4>
            <span className="text-[red]">Satisfied Clients</span>:{" "}
            {counsellorDetails.satisfied_clients}
          </h4>
        </div> */}
          <button
            onClick={() => {
              setShowReviews(!showReviews);
            }}
            className="bg-[red] py-2 px-3 text-white rounded-lg mt-3"
          >
            View {allReviews.length}{" "}
            {allReviews.length > 1 ? "Reviews" : "Review "}
          </button>
          {showReviews && (
            <div>
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="text"
                  rows={5}
                  cols={60}
                  value={newReview}
                  onChange={(e) => {
                    setNewReview(e.target.value);
                  }}
                  className="py-2 px-4  rounded mt-5 border-2 placeholder:text-black border-black mr-2"
                  placeholder="Add Review"
                ></input>
                <button
                  type="submit"
                  onClick={() => {
                    addReview();
                  }}
                  className="bg-[green]  py-2 px-3 text-white rounded-lg mt-3"
                >
                  Add review
                </button>
              </form>

              <h3 className="mt-4 text-center underline text-[red]">
                All Reviews
              </h3>
              {allReviews.length === 0 && (
                <h4 className="text-center mt-5">No reviews yet</h4>
              )}

              {allReviews.map((item, key) => {
                return (
                  <div>
                    <h4>
                      {key + 1}: {item.review}
                      {console.log(item.user_id)}
                      {console.log(userId)}
                      {item.user_id === userId && (
                        <div>
                          <button
                            className="bg-[red] py-2 px-3 text-lg text-white rounded-xl mt-2"
                            onClick={() => {
                              deleteReview(item.id);
                            }}
                          >
                            Delete Review
                          </button>
                        </div>
                      )}
                    </h4>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
