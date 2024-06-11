"use client";
import React, { useState } from "react";
import {
  ConfirmForgotPasswordCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import toast from "react-hot-toast";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

function ConfirmForgotPassword({
  setisloginpage,
  setisConfirmForgotPasswordpage
}) {
  const [username, setusername] = useState("");
  const [confirmationCode, setconfirmationCode] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const handelConfirmForgotPassword = async () => {
    try {
      const command = new ConfirmForgotPasswordCommand({
        ClientId: clientId,
        Username: username,
        ConfirmationCode: confirmationCode,
        Password: newPassword
      });
      await client.send(command);
      toast.success("Password changed successfully");
      setisloginpage(true)
      setisConfirmForgotPasswordpage(false)
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center bg-zinc-200">
      <div className="bg-white w-2/6 flex flex-col p-10 items-center justify-center gap-5 rounded-xl h-[400px]">
        <h1 className="font-bold text-2xl">Reset Password</h1>
        <input
          className="bg-zinc-200 p-2 rounded w-full"
          type="text"
          placeholder="Username"
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
        <input
          className="bg-zinc-200 p-2 rounded w-full"
          type="password"
          placeholder="New Password"
          onChange={(e) => {
            setnewPassword(e.target.value);
          }}
        />
        <button
          className="bg-green-600 w-full p-1 text-white font-bold rounded"
          onClick={handelConfirmForgotPassword}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmForgotPassword;
