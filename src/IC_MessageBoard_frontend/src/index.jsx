import React from "react";
import { createRoot } from "react-dom/client";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "../../declarations/IC_MessageBoard_backend";
import App from "./components/App";

export let AUTH_PRINCIPAL = "";
export let AUTH_ACTOR;

const root = createRoot(document.getElementById("root"));
let authClient;

async function init() {
    authClient = await AuthClient.create();

    if (await authClient.isAuthenticated())
        handleAuthenticated();
    else
        root.render(<App />);
};

init();

function handleAuthenticated() {
    const identity = authClient.getIdentity();
    AUTH_PRINCIPAL = identity.getPrincipal().toText();
    AUTH_ACTOR = createActor(canisterId, {
        agentOptions: {
            identity,
        },
    });

    root.render(<App />);
}

export const HANDLEAUTH = async () => {
    if (await authClient.isAuthenticated()) {
        await authClient.logout();
        AUTH_PRINCIPAL = "";
        root.render(<App />);
    } else {
        await authClient.login({
            identityProvider: process.env.DFX_NETWORK === "local"
                ? `http://${process.env.INTERNET_IDENTITY_CANISTER_ID}.localhost:4943/`  //For Chrome and Firefox
                // `http://localhost:4943/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`  //For Safari
                : "https://identity.ic0.app",
            onSuccess: () => handleAuthenticated(),
        });
    }
}