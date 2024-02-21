import React, { useEffect, useState } from "react";
import Header from "./Header";
import Message from "./Message";
import CreateArea from "./CreateArea";
import { IC_MessageBoard_backend } from "../../../declarations/IC_MessageBoard_backend";
import { AUTH_PRINCIPAL, AUTH_ACTOR } from "../index";

export default function App() {
  const [messages, setMessages] = useState([]);

  function publishMessage(newMessage) {
    newMessage.publisherID = AUTH_PRINCIPAL;
    AUTH_ACTOR.publishMessage(newMessage.title, newMessage.content)
    setMessages(prevMessages => [newMessage, ...prevMessages]);
  }

  useEffect(() => {
    displayMessages();
  }, []);

  async function displayMessages() {
    const receivedMessages = await IC_MessageBoard_backend.getAllMessages();
    setMessages(receivedMessages);
  }

  function deleteMessage(id) {
    AUTH_ACTOR.removeMessage(id);
    setMessages(prevMessages => {
      return prevMessages.filter((message, index) => index !== id);
    });
  }

  return (
    <div>
      <Header />
      {AUTH_PRINCIPAL.length > 0 && <CreateArea onPublish={publishMessage} />}
      <div className="messageContainer">
        {messages.map((message, index) => {
          return (
            <Message
              key={index}
              id={index}
              title={message.title}
              content={message.content}
              publisherID={message.publisherID}
              onDelete={deleteMessage}
            />
          );
        })}
      </div>
    </div>
  );
}