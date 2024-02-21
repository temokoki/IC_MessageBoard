import React from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CampaignIcon from "@mui/icons-material/Campaign";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { AUTH_PRINCIPAL, HANDLEAUTH } from "../index";

export default function Header() {
  return (
    <header>
      <h1>
        <CampaignIcon style={{ fontSize: 40, margin: "0px 10px" }} />
        Public Message Board
      </h1>

      {AUTH_PRINCIPAL.length > 0 ?
        <h1>
          <Alert style={{ padding: "0px 10px", fontSize: 16 }} icon={false} severity="info">
            Your ID:
            <span style={{ margin: "0px 10px", fontWeight: "bold" }}>{AUTH_PRINCIPAL}</span>
            <Button
              onClick={HANDLEAUTH}
              variant="contained"
              startIcon={<LogoutIcon />}>
              Logout
            </Button>
          </Alert>
        </h1>
        :
        <h1>
          <Button
            onClick={HANDLEAUTH}
            variant="contained"
            startIcon={<LoginIcon />}
            size="large"
          >
            Login to Post
          </Button>
        </h1>
      }
    </header>
  );
}