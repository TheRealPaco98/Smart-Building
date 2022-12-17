import LoginButton from "@components/LoginButton";
import { useSession } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">DIGITAL TWIN</a>
      </div>
      {session && (
        <div className="navbar-end">
          <LoginButton />
        </div>
      )}
    </header>
  );
};

export default Header;
