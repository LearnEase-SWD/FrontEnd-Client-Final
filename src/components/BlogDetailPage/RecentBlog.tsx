import { BiCategory } from "react-icons/bi";
import { TiUserOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

type Props = {
  blog_id?: string;
  name?: string;
  created_at?: Date;
  user_name?: string;
  description?: string;
};

export const RecentBlog = ({ blog_id, name, user_name, description }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (blog_id) {
      navigate(`/blog/${blog_id}`);
    }
  };
  return (
    <div
      className="w-1/2 border rounded-lg lg:px-6 lg:py-4 p-2 cursor-pointer mt-2"
      onClick={handleClick}
    >
      <div className="flex-grow">
        <h2 className="text-base font-semibold mb-4 overflow-ellipsis overflow-hidden whitespace-nowrap transition group-hover:text-[#FFAB2D]">
          {name}
        </h2>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex items-center text-sm">
            <TiUserOutline className="mr-1 text-orange-500" size={20} />
            {user_name}
          </div>
          <div className="flex items-center">
            <BiCategory className="mr-1 text-orange-500" size={18} />
            {description}
          </div>
        </div>

      </div>
    </div>
  );
};
