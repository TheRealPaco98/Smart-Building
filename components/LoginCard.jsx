import LoginButton from "@components/LoginButton";

const LoginCard = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <span className="text-5xl mb-5">👋🏻</span>
          <div className="w-80 mb-10">
            <h2 className="card-title text-secondary text-5xl">
              Hello,
              <br /> Sign Up for Access your dashboard
            </h2>
          </div>
          <div className="card-actions justify-center">
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
