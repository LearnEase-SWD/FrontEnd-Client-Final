import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaComments } from "react-icons/fa";
import { useCustomNavigate } from "../hooks/customNavigate";
import { IoArrowUpOutline } from "react-icons/io5";

const GeneralLayout = () => {
  const navigate = useCustomNavigate();
  
  // const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // // Handle scroll event to show/hide navbar with slide and fade effect
  // const handleScroll = () => {
  //   if (typeof window !== "undefined") {
  //     if (window.scrollY > lastScrollY) {
  //       setIsNavbarVisible(false); // Scrolling down
  //     } else {
  //       setIsNavbarVisible(true); // Scrolling up
  //     }
  //     setLastScrollY(window.scrollY);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [lastScrollY]);

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className="div">
      {/* Navbar section */}
      <div
        className={`w-full h-16 left-0 flex items-center bg-white shadow fixed z-50 transition-all duration-300 ease-in-out ${"opacity-100 translate-y-0"}`}
      >
        <Navbar />
      </div>

      {/* Content section */}
      <div className="flex justify-center overflow-hidden pt-16">
        <div className="md:w-[85%] w-[95%]">
          <Outlet />
        </div>
      </div>

      {/* Footer section */}
      <div className="w-full bg-gray-50">
        <Footer />
      </div>

      {/* Fixed Chat Bubbles */}
      <div className="fixed bottom-4 left-4 flex flex-col gap-2 sm:gap-4">
        {/* Zalo Chat */}
        <a
          href="https://id.zalo.me/account?continue=https%3A%2F%2Fchat.zalo.me%2F"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white py-3 sm:p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <span className="font-bold text-sm sm:text-lg">Zalo</span>
        </a>
        {/* Instructor Chat */}
        <button className="bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center" onClick={()=>{navigate("/message")}}>
          <FaComments size={24} className=" hidden sm:block" />
          <FaComments size={18} className=" sm:hidden" />

        </button>
        <button onClick={backToTop}>
          <div className=" sm:w-12 sm:h-12 w-8 h-8 rounded-full bottom-10 right-2 sm:right-4 hover:scale-110 transition duration-500 bg-orange-500 fixed justify-center flex items-center z-50">
            <IoArrowUpOutline size={36} color="white" className=" hidden sm:block" />
            <IoArrowUpOutline size={22} color="white" className=" sm:hidden " />

          </div>
        </button>
      </div>
    </div>
  );
};

export default GeneralLayout;
