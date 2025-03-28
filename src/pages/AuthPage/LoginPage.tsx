import GoogleLoginButton from "../../components/GoogleLoginButton";
import { Player } from "@lottiefiles/react-lottie-player";

const Loginpage: React.FC = () => {
    return (
        <div className="w-full lg:flex lg:h-[35rem] lg:flex-row lg:rounded-lg mt-12 overflow-hidden shadow-xl">
            <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center">
                <Player
                    src={`https://lottie.host/d08bd2de-f201-41ed-9ee3-cf8484903ca6/G0I0mLw1Np.json`}
                    loop
                    autoplay
                    className="h-44 w-full md:h-60 lg:h-full"
                />
            </div>

            <div className="w-full bg-white p-10 lg:w-1/2 lg:p-16 flex flex-col justify-center">
                <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">
                    Login
                </h1>

                <div className="flex justify-center">
                    <GoogleLoginButton />
                </div>
            </div>
        </div>
    );
};

export default Loginpage;