import { authMiddleware } from "@clerk/nextjs";

const myMiddleware = authMiddleware({});

export default myMiddleware;



export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
  };
  