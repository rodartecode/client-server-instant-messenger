// import "./App.css";
// import HttpCall from "./components/HttpCall";
import WebSocketCall from "./components/WebSocketCall";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import CreateChat from "./components/CreateChat";
import { Button, AppBar, Toolbar, Typography, IconButton } from '@mui/material';

function Chatpage() {
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [showCreateChat, setShowCreateChat] = useState(0);
  const [selectedValue, setSelectedValue] = useState([]);

  const showChatClick = () => {
    if (!showChat) {
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  };

  const hideCreateChatClick =(value) => {
    setShowCreateChat(false);
    setSelectedValue(value);
    console.log(value);
  }

  const showCreateChatClick = () => {
    if (!showCreateChat) {
      setShowCreateChat(true);
    } else {
      setShowCreateChat(false);
    }
    console.log("now isssa " + showCreateChat);
    // setShowCreateChat(true);
  }

  useEffect(() => {
    if (showChat) {
      const socket = io("127.0.0.1:5000/", {
        transports: ["websocket"],
        cors: {
          origin: "http://127.0.0.1:3000/",
        },
      });

      setSocketInstance(socket);
      setLoading(false);

      return function disconnect() {
        socket.disconnect();
      };
    }
  }, [showChat]);

  return (
    <div className="App">
      <AppBar sx={{position: 'sticky'}}>
        <Toolbar>
          <Typography variant='h6'>Chat</Typography>
          <IconButton
            sx={{marginLeft: 'auto'}}
            aria-label='close'>
          </IconButton>
          <Button
            variant='contained'
            type='submit'
            sx={{width: '7%'}}
            href='/login'
            color='error'
            onClick={() => {
              sessionStorage.removeItem('Username');
              sessionStorage.removeItem('token');
            }}
          >
          Logout
          </Button>
        </Toolbar>
      </AppBar>
      <br></br>
      <div>
        {/* <HttpCall /> */}
      </div>
          <div>
            {!loading && <WebSocketCall socket={socketInstance} />}
          </div>
          {/* {showCreateChat && <CreateChat setShowCreateChat={setShowCreateChat}/>} */}
          <CreateChat
            selectedValue={selectedValue}
            open={showCreateChat}
            onClose={showCreateChatClick}
          />
          <button onClick={showCreateChatClick}>Create Chat</button>
    </div>
  );
}

export default Chatpage;
