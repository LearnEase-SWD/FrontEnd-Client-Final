import "./Loading.css";
import logoLoading from "../../assets/icon-web.png";
const CustomLoading = () => {
  return (
    <div className="w-full, h-screen">
      <div className="loading-page">
        <img className="img-logo-loading" src={logoLoading} alt="" />
        <div className="name-container">
          <div className="logo-name">Learn Ease</div>
        </div>
        <div className="sub-logo">Conquer Knowledge, Conquer the Future!</div>
      </div>
    </div>
  );
};

export default CustomLoading;
