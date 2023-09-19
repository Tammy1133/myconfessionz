import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";

export const Chatsleft = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const token = useSelector((state) => {
    return state.user.token;
  });
  const user = useSelector((state) => {
    return state?.user?.user?.usercode;
  });
  const username = useSelector((state) => {
    return state?.user?.user?.username;
  });
  const userId = useSelector((state) => {
    return state.user.user.id;
  });

  const getConversations = async () => {
    // setLoading(true);
    try {
      if (user) {
        const data = await Axios.get(
          `https://restapis.myconfessionz.com/api/conversations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConversation(data.data.conversations);
        console.log(data);
        setLoading(false);
      } else {
        const data = await Axios.get(
          `https://restapis.myconfessionz.com/api/conversations`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setConversation(data.data.conversations);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      // navigate("/homepage");
    }
  };

  useEffect(() => {
    getConversations();
  }, []);
  return (
    <div>
      <div className="left w-[30vw] h-screen bg-[#ff000026] pt-[100px]">
        <h3 className="text-center">Conversations</h3>

        <div className="flex flex-col h-[60vh] items-center justify-center">
          <h5>No Conversations yet</h5>
          <p>
            Click{" "}
            <span className="font-bold cursor-pointer hover:text-[red] transition">
              here
            </span>{" "}
            to start a new conversation
          </p>
        </div>
      </div>
    </div>
  );
};
