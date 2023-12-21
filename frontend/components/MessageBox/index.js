import { Message } from "@/components";
import { useEffect, useState, useRef } from "react";
import { useAxios, useAuth } from "@/hooks";
export default function MessageBox({ me, setCurrentChat, user }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [ws, setWs] = useState(null);
  const { auth } = useAuth();
  const { api } = useAxios(auth?.access_token);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };
  const chatBoxRef = useRef(null); // Ref for the chat box element
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    api
      .get(`/user/chat-history/${me.username}/${user.username}`)
      .then((res) => {
        const new_data = res.data.map((d) => {
          return {
            type: d.sender_id === me.username ? "me" : "other",
            message: d.content,
            time: new Date(d.message_time),
          };
        });

        setMessages(new_data);
      })
      .catch((err) => console.log(err));
    const newWs = new WebSocket(
      `ws://localhost:8000/api/v1/chat/private/${me.username}`
    ); // Adjust URL and client_id as needed
    setWs(newWs);

    // Connection opened
    newWs.addEventListener("open", function (event) {
      console.log("WebSocket connection opened:", event);
    });

    // Listen for messages from the server
    newWs.addEventListener("message", function (event) {
      const newMessage = JSON.parse(event.data);

      newMessage["type"] = "other";
      newMessage["time"] = new Date(newMessage["time"]);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Handle errors
    newWs.addEventListener("error", function (event) {
      console.error("WebSocket error:", event);
    });

    return () => {
      newWs.close();
    };
  }, [user]);

  const sendMessage = () => {
    if (ws && messageInput) {
      const currentDate = new Date();
      const message = {
        receiver_user_id: user.username,
        message: messageInput,
        time: currentDate,
      };
      ws.send(JSON.stringify(message));
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "me",
          message: messageInput,
          time: currentDate,
        },
      ]);
      setMessageInput(""); // Clear the input after sending
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <div className="flex  flex-col col-span-6 space-y-3 grid grid-rows-6 p-5">
      <div className="flex place-content-between items-center row-span-1 bg-[#31304D] ">
        <div className="flex gap-5 items-center ">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            style={{ width: "50px", height: "50px" }}
          >
            <title>Profile</title>
            <path
              id="User_Circle"
              data-name="User Circle"
              d="M12.5,25A12.5,12.5,0,1,1,25,12.5,12.51,12.51,0,0,1,12.5,25ZM4.75,21a11.48,11.48,0,0,0,15.5,0c-.69-1.58-2.71-2.42-4.34-3.09S14,16.3,14,15.5a3,3,0,0,1,.93-2.12,3.41,3.41,0,0,0,1.14-2.64A3.51,3.51,0,0,0,12.5,7,3.44,3.44,0,0,0,9,10.74a3.35,3.35,0,0,0,1.08,2.64A3,3,0,0,1,11,15.5c0,.8-.22,1.7-1.84,2.36S5.44,19.41,4.75,21ZM12.5,6a4.5,4.5,0,0,1,4.57,4.74,4.38,4.38,0,0,1-1.48,3.39A2,2,0,0,0,15,15.5c0,.44,0,.94,1.21,1.44,1.68.7,3.82,1.59,4.78,3.31a11.5,11.5,0,1,0-17,0C5,18.53,7.1,17.64,8.7,17,10,16.44,10,15.92,10,15.5a2,2,0,0,0-.56-1.37A4.36,4.36,0,0,1,8,10.74,4.41,4.41,0,0,1,12.5,6Z"
              fill="#B6BBC4"
            ></path>
          </svg>
          <div>
            <p className="font-extrabold opacity-75 tracking-wide">
              {user.name + " " + user.surname}
            </p>
          </div>
        </div>
        <svg
          onClick={() => {
            setCurrentChat("");
          }}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 50 50"
          enableBackground="new 0 0 50 50"
          xmlSpace="preserve"
          className="hover:cursor-pointer"
          width="24"
          height="24" // Adjust the size as needed
        >
          <path
            className="fill-white"
            d="M9.016,40.837c0.195,0.195,0.451,0.292,0.707,0.292c0.256,0,0.512-0.098,0.708-0.293l14.292-14.309 l14.292,14.309c0.195,0.196,0.451,0.293,0.708,0.293c0.256,0,0.512-0.098,0.707-0.292c0.391-0.39,0.391-1.023,0.001-1.414 L26.153,25.129L40.43,10.836c0.39-0.391,0.39-1.024-0.001-1.414c-0.392-0.391-1.024-0.391-1.414,0.001L24.722,23.732L10.43,9.423 c-0.391-0.391-1.024-0.391-1.414-0.001c-0.391,0.39-0.391,1.023-0.001,1.414l14.276,14.293L9.015,39.423 C8.625,39.813,8.625,40.447,9.016,40.837z"
          ></path>
        </svg>
      </div>
      <div className="grid grid-rows-7  row-span-5">
        <div
          ref={chatBoxRef}
          className=" overflow-y-auto max-h-[500px] row-span-6 space-y-2 bg-[#443C68] rounded-xl opacity-50"
        >
          {messages.map((message, index) => {
            const currentHour = String(message.time.getHours()).padStart(
              2,
              "0"
            );
            const currentMinute = String(message.time.getMinutes()).padStart(
              2,
              "0"
            );
            return (
              <Message
                content={{
                  type: message?.type,
                  name: message?.type === "me" ? me.name : user.name,
                  surname: message?.type === "me" ? me.surname : user.surname,
                  content: message?.message,
                  time: currentHour + ":" + currentMinute,
                }}
              />
            );
          })}
        </div>
        <div className="row-span-1 h-[100px] flex mt-8 bg-[#31304D]">
          <div className="flex w-full h-1/2 ">
            <input
              type="text"
              value={messageInput}
              ref={inputRef}
              onKeyDown={handleKeyDown}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full opacity-75 focus:opacity-100 text-black flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-md ml-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <svg
                version="1.1"
                id="Icons"
                className="w-7 h-6"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
              >
                <style type="text/css">
                  {`.st10{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;}
              .st11{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}
              .st21{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
              .st31{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}
              .st41{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:3;}`}
                </style>
                <polygon
                  className="st10"
                  points="28.6,3.4 3.4,12.6 15.1,16.9 19.4,28.6 "
                ></polygon>
                <line
                  className="st10"
                  x1="20.6"
                  y1="11.4"
                  x2="15.1"
                  y2="16.9"
                ></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
