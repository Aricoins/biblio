import React from 'react';
import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (<div style={{display: "flex", justifyContent: "center", backgroundColor: "black"}}> <SignUp routing="hash" /></div>);
}