import React from 'react';
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (<div style={{display: "flex", justifyContent: "center", backgroundColor: "black"}}> <SignIn routing="hash" /></div>);
}