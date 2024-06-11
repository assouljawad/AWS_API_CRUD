"use client";
import React, { useState } from "react";
import {
  InitiateAuthCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import toast from "react-hot-toast";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
function Login({
  setissignuppage,
  setisforgotpage,
  setisloginpage,
  setresendusername,
  setisAuth,
}) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handellogin = async () => {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
        ClientId: clientId,
      });
      await client.send(command);
      toast.success("logged successfully");
      setisAuth(true);
      setisloginpage(false);
      setresendusername(username)
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center bg-zinc-200">
      <div className="bg-white w-2/6 flex flex-col p-10 items-center justify-center gap-5 rounded-xl h-[400px]">
        <h1 className="font-bold text-2xl">Login</h1>
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
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button
          className="bg-green-600 w-full p-1 text-white font-bold rounded"
          onClick={handellogin}
        >
          Login
        </button>
        <div className="flex gap-2 items-center">
          <span
            className="text-[12px] text-blue-700 cursor-pointer"
            onClick={() => {
              setisforgotpage(true);
              setisloginpage(false);
            }}
          >
            Forgot password
          </span>
          |
          <span
            className="text-[12px] text-blue-700 cursor-pointer"
            onClick={() => {
              setisforgotpage(false);
              setisloginpage(false);
              setissignuppage(true);
            }}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
