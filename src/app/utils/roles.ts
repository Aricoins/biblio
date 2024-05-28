import { useClerk } from "@clerk/clerk-react";

export default function Home() {
  const clerk = useClerk();

  return clerk.user
};