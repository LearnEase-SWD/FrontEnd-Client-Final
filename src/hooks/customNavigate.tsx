import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const navigateTo = (
    path: string,
    newTab?: boolean,
    e?: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (newTab) {
      window.open(path, "_blank");
    } else {
      window.scrollTo({ top:0, behavior: "instant"})
      navigate(path);
    }
  };

  return navigateTo;
};
