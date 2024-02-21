import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import AddIcon from "@mui/icons-material/Add";
import AlertDialog from "./AlertDialog";

export default function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [alertMessage, setAlert] = useState(false)

  const [message, setMessage] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setMessage(prevMessage => {
      return { ...prevMessage, [name]: value };
    });

    event.preventDefault();
  }

  function publishMessage() {
    if (message.title.length < 5) {
      setAlert("Message title is less than 5 characters");
      return;
    }
    else if (message.content.length < 20) {
      setAlert("Message content is less than 20 characters");
      return;
    }

    props.onPublish(message);

    setMessage({
      title: "",
      content: ""
    });
  }

  return (
    <div>
      <form className="publish-message" onSubmit={e => e.preventDefault()}>
        {isExpanded &&
          <input
            name="title"
            placeholder="Title"
            maxLength="50"
            onChange={handleChange}
            value={message.title}
          />
        }
        <textarea onKeyDown={e => { if (e.key === "Enter") e.preventDefault() }}
          name="content"
          placeholder="Post a message..."
          rows={isExpanded ? 3 : 1}
          maxLength="150"
          onClick={() => setExpanded(true)}
          onChange={handleChange}
          value={message.content}
        />
        <Zoom in={isExpanded} {...({ timeout: 500 })}>
          <Fab color="primary" onClick={publishMessage}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
      {alertMessage.length > 0 && <AlertDialog open={true} close={() => setAlert("")} message={alertMessage} />}
    </div>
  );
}