"use client";
import React, { useState } from "react";
import {
  SignUpCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import toast, { Toaster } from "react-hot-toast";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
function Signup({
  setissignuppage,
  setisforgotpage,
  setisloginpage,
  setisvalidationpage,
  setresendusername,
}) {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handelsginup = async () => {
    try {
      const command = new SignUpCommand({
        ClientId: clientId,
        Username: username,
        Password: password,
        UserAttributes: [{ Name: "email", Value: email }],
      });
      await client.send(command);
      setresendusername(username);
      setissignuppage(false);
      setisvalidationpage(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  bg-zinc-200">
      <div className="bg-white w-2/6 flex flex-col p-10 items-center justify-center gap-5 rounded-xl h-[400px]">
        <h1 className="font-bold text-2xl">Sign up</h1>
        <input
          className="bg-zinc-200 p-2 rounded w-full"
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
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
          onClick={handelsginup}
        >
          Sign up
        </button>
        <div className="flex gap-2 items-center">
          <span
            className="text-[12px] text-blue-700 cursor-pointer"
            onClick={() => {
              setisforgotpage(true);
              setisloginpage(false);
              setissignuppage(false);
            }}
          >
            Forgot password
          </span>
          |
          <span
            className="text-[12px] text-blue-700 cursor-pointer"
            onClick={() => {
              setisforgotpage(false);
              setisloginpage(true);
              setissignuppage(false);
            }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
export default Signup;
