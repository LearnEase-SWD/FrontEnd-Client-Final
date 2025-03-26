const LoginToView = () => {
  return (
    <div className="h-[40vh] mt-20 flex flex-col items-center">
      <div className="flex gap-2 text-3xl font-bold">
        <div>You have to login to view the course detail.</div>
        <a href="/login" className="text-orange-500 hover:underline">
          Login now
        </a>
      </div>
      <div className="flex gap-2 text-xl mt-2">
        <div>Don't have an account?</div>
        <a href="/signup" className="text-orange-500 hover:underline">
          Register here
        </a>
      </div>
    </div>
  );
};

export default LoginToView;
