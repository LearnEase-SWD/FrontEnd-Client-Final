import { useState, useEffect } from "react";
import "./LoadingOverlay.css";
// import loadingGif from "./untitled@1x-1.0s-200px-200px.gif";
import loadingGif from "./Animation - 1728462135018.gif";

const LoadingOverlay = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Giả lập việc tải dữ liệu hoặc chuyển trang
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 giây
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <img src={loadingGif} alt="loading..." />
        </div>
      )}
      <div>{!isLoading && "Nội dung trang đã tải xong!"}</div>
    </>
  );
};

export default LoadingOverlay;
