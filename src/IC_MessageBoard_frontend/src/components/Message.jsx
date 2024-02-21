import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import { Principal } from "@dfinity/principal";
import { AUTH_PRINCIPAL } from "../index";

export default function Message(props) {
  return (
    <div className="message">
      <h1>{props.title}</h1>
      <Divider />
      <p>{props.content}</p>
      {(AUTH_PRINCIPAL.length > 0 && AUTH_PRINCIPAL == props.publisherID) ?
        <Button
          onClick={() => props.onDelete(props.id)}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}>
          Delete
        </Button>
        :
        <Alert style={{ justifyContent: "center", fontSize: 14 }} icon={false} severity="info">
          publisher ID:{" "}
          <span style={{ fontWeight: "bolder" }}>
            {props.publisherID}
          </span>
        </Alert>
      }
    </div>
  );
}