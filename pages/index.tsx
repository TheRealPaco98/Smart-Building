import Header from "@components/Header";
import Dashboard from "@components/Dashboard";
import LoginCard from "@components/LoginCard";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="mx-16">
      <Header />
      <main>{session ? <Dashboard /> : <LoginCard />}</main>
    </div>
  );
}
