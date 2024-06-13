"use client";
import React, { useState } from "react";
import {
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import toast, { Toaster } from "react-hot-toast";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

function Validation({ resend_username, setisloginpage, setisvalidationpage }) {
  const [username, setusername] = useState("");
  const [confirmationCode, setconfirmationCode] = useState("");
  const handelConfirm = async () => {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: clientId,
        Username: resend_username,
        ConfirmationCode: confirmationCode,
      });
      await client.send(command);
      toast.success("Regestered successfully");
      setisloginpage(true);
      setisvalidationpage(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handelResendcode = async () => {
    try {
      const command = new ResendConfirmationCodeCommand({
        ClientId: clientId,
        Username: resend_username,
      });

      await client.send(command);
      toast.success("Verification code sent successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center bg-zinc-200">
      <div className="bg-white w-2/6 flex flex-col p-10 items-center justify-center gap-5 rounded-xl h-[400px]">
        <h1 className="font-bold text-2xl">Email Confirmation</h1>
        <input
          className="bg-zinc-200 p-2 rounded w-full"
          type="text"
          placeholder="Username"
          disabled
          value={resend_username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <input
          className="bg-zinc-200 p-2 rounded w-full"
          type="text"
          placeholder="Confirmation Code"
          onChange={(e) => {
            setconfirmationCode(e.target.value);
          }}
        />
        <button
          className="bg-green-600 w-full p-1 text-white font-bold rounded"
          onClick={handelConfirm}
        >
          Confirm
        </button>
        <span
          className="cursor-pointer text-blue-600"
          onClick={handelResendcode}
        >
          Resend the confirmation code.
        </span>
      </div>
    </div>
  );
}

export default Validation;
