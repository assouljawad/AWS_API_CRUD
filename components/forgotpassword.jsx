'use client'
import React, { useState } from 'react'
import {
  ForgotPasswordCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import toast from "react-hot-toast";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

function Forgotpassword({ setissignuppage, setisforgotpage, setisloginpage, setisConfirmForgotPasswordpage }) {
  const [Username, setUsername ] = useState('')

const handelforgotpassword = async  () =>{
  try {
    const command = new ForgotPasswordCommand({
      ClientId: clientId, 
      Username: Username
    });
    await client.send(command);
    toast.success("A verification code is sent to your Email");
    setisConfirmForgotPasswordpage(true)
    setisforgotpage(false)
  } catch (error) {
    toast.error(error.message);
  }

}


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-200">
      <div className="bg-white w-2/6 flex flex-col p-10 items-center justify-center gap-5 rounded-xl h-[400px]">
        <h1 className="font-bold text-2xl">Reset Password</h1>
        <input
          className="bg-zinc-200 p-2 rounded w-full"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button className="bg-green-600 w-full p-1 text-white font-bold rounded" onClick={handelforgotpassword}>
          Reset
        </button>
        <div className="flex gap-2 items-center">
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

export default Forgotpassword;