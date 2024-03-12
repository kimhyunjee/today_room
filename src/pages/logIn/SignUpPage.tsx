import React from "react";
import { Button } from "@/components/ui/button";
import LogIn from "@/components/auth/LogInForm";
import { auth } from "@/lib/firebase/firebase.config";

const SignUpPage = () => {
  return (
    <>
      <LogIn />
    </>
  );
};

export default SignUpPage;
