import React, { useEffect, useRef, useState } from "react";
import style from "../styles/Socket.module.css";
import { AuthContext } from "@/lib/auth/AuthContext";
import { useContext } from "react";

// export const getServerSideProps = async (ctx) => {
//   const user = await fetch(
//     `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/auth/getByID`,
//     {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Credentials": true,
//         Cookie: ctx.req.headers.cookie,
//       },
//     }
//   );

//   const content = await user.json();
//   return {
//     props: { data: content },
//   };
// };

const WebSock = ({ role }) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const { data } = useContext(AuthContext);
  function connect() {
    socket.current = new WebSocket("ws://localhost:4000");

    console.log("data: " + data);
    if (role && role == 0) {
      setUsername("USER");
    } else if (role && role == 1) {
      setUsername("ADMIN");
    } else if (role && role == 2) {
      setUsername("DELIVERY");
    }

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("Socket закрыт");
    };
    socket.current.onerror = () => {
      console.log("Socket произошла ошибка");
    };
  }

  const sendMessage = () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <div className={style.center}>
        <div className={style.form}>
          <h3 className={style.question}>Enter the chat?</h3>
          {/* <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Введите ваше имя"
          /> */}
          <button onClick={connect}>Enter</button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.center}>
      <div>
        <div className={style.form}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className={style.messages}>
          {messages.map((mess) => (
            <div key={mess.id}>
              {mess.event === "connection" ? (
                <div className={style.connection_message}>
                  User {mess.username} joined the chat
                </div>
              ) : (
                <div className={style.message}>
                  {mess.username}: {mess.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebSock;
