"use client";
import React, { useState } from "react";
import Login from "@/components/login";
import Signup from "@/components/signup";
import Forgotpassword from "@/components/forgotpassword";
import Validation from "@/components/validation";
import Dashboard from "@/components/dashboard";
import ConfirmForgotPassword from "@/components/confirmForgotPassword";
import{ Toaster } from "react-hot-toast";

function Page() {
  const [username, setresendusername] = useState("");
  const [isAuth, setisAuth] = useState(false);
  const [isloginpage, setisloginpage] = useState(true);
  const [issignuppage, setissignuppage] = useState(false);
  const [isforgotpage, setisforgotpage] = useState(false);
  const [isvalidationpage, setisvalidationpage] = useState(false);
  const [isConfirmForgotPasswordpage, setisConfirmForgotPasswordpage] =
    useState(false);
  return (
    <div>
      <Toaster />
      {isloginpage ? (
        <Login
          setissignuppage={setissignuppage}
          setisforgotpage={setisforgotpage}
          setisloginpage={setisloginpage}
          setresendusername={setresendusername}
          setisAuth={setisAuth}
        />
      ) : issignuppage ? (
        <Signup
          setissignuppage={setissignuppage}
          setisforgotpage={setisforgotpage}
          setisloginpage={setisloginpage}
          setisvalidationpage={setisvalidationpage}
          setresendusername={setresendusername}
        />
      ) : isforgotpage ? (
        <Forgotpassword
          setissignuppage={setissignuppage}
          setisforgotpage={setisforgotpage}
          setisloginpage={setisloginpage}
          setisConfirmForgotPasswordpage={setisConfirmForgotPasswordpage}
        />
      ) : isConfirmForgotPasswordpage ? (
        <ConfirmForgotPassword
          setisConfirmForgotPasswordpage={setisConfirmForgotPasswordpage}
          setisloginpage={setisloginpage}
        />
      ) : isvalidationpage ? (
        <Validation
          setisvalidationpage={setisvalidationpage}
          setisloginpage={setisloginpage}
          setissignuppage={setissignuppage}
          resend_username={username}
        />
      ) : isAuth ? (
        <Dashboard
          setisloginpage={setisloginpage}
          setisAuth={setisAuth}
          resend_username={username}
        />
      ) : (
        <Login
          setissignuppage={setissignuppage}
          setisforgotpage={setisforgotpage}
          setisloginpage={setisloginpage}
          setresendusername={setresendusername}
          setisAuth={setisAuth}
        />
      )}
    </div>
  );
}

export default Page;