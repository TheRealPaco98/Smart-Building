import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <span className="mr-2">{session.user.email}</span>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button className="btn btn-secondary" onClick={() => signIn()}>
        Login
      </button>
    </>
  );
}
