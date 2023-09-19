import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInNav } from "./loggedinNav";
import confessbg from "../utils/confessbg.jpg";
import { useNavigate } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import Axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { setUser } from "../redux/actions/UserActions";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const acctdetails = useSelector((state) => {
    return state?.user?.user;
  });

  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });
  const token = useSelector((state) => {
    return state.user.token;
  });
  let [time, setTime] = useState(4);

  if (user === undefined && username === undefined) {
    setTimeout(() => setTime(time - 1), 1000);
  }

  const deleteAccount = async () => {
if (user) {
  try {
    const result = await Axios.delete(
      `https://restapis.myconfessionz.com/api/delete-account/${acctdetails.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
    dispatch(setUser("."));
    navigate("/login");
  } catch (error) {
    console.log(error);
    navigate("/login");
  }
}
else{
  try {
    const result = await Axios.delete(
      `https://restapis.myconfessionz.com/api/delete-account/${acctdetails.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
    dispatch(setUser("."));
    navigate("/login");
  } catch (error) {
    console.log(error);
    navigate("/login");
  }
}
  };

  useEffect(() => {
    if (time === 0) {
      navigate("/login");
    }
  }, [time]);
  console.log(user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return user !== undefined || username !== undefined ? (
    <div>
      <LoggedInNav></LoggedInNav>
      <div className="mt-[130px] px-3 flex flex-col items-center">
        <h4>
          {user !== undefined ? (
            <div>Usercode: {acctdetails.usercode}</div>
          ) : (
            <div> Username:{acctdetails.username}</div>
          )}
        </h4>

        <div className="">Gender: {acctdetails.gender}</div>
        <div className="">Date of Birth: {acctdetails.dob}</div>
        <div className="">Country: {acctdetails.country}</div>
        <div className="">Country: {acctdetails.state}</div>
        <div className="">
          Date Joined: {dateFormat(acctdetails.created_at)}
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="mt-5 text-[red]">
              Are you sure you want to delete Account?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Go Back
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleClose();
                deleteAccount();
              }}
            >
              Delete Account
            </Button>
          </Modal.Footer>
        </Modal>

        {/* {user !== undefined ? (
          <div className="mt-5">
            <button className="bg-[red] py-2 px-3">Delete</button>
          </div>
        ) : (
          <div className="mt-5">
            <button className="bg-[red] py-2 px-3">Delete</button>
          </div>
        )} */}

        <div className="mt-5">
          <button
            className="bg-[red] py-2 px-3 text-[white] rounded-md"
            onClick={handleShow}
          >
            Delete
          </button>
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
