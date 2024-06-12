import React from 'react';
import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return <SignUp routing="hash" />;
}