import React, { useEffect, useState } from "react";
import { LoggedInNav } from "./loggedinNav";
import { Chatsleft } from "./chatsleft";
import { Chatsright } from "./chatsright";
import Axios from "axios";
import { useSelector } from "react-redux";

export const Chats = () => {
  const [conversations, setConversations] = useState([]);
  const token = useSelector((state) => {
    return state.user.token;
  });

  const getConversations = async (id) => {
    // setLoading(true);
    try {
      const data = await Axios.get(
        `https://restapis.myconfessionz.com/api/conversations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);

      // console.log(data);
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.log(error);
      // navigate("/login");
    }
  };
  useEffect(() => {
    getConversations();
  }, []);
  return (
    <div>
      <LoggedInNav></LoggedInNav>
      <div className=" flex">
        <Chatsleft></Chatsleft>
        <Chatsright></Chatsright>
      </div>
    </div>
  );
};
