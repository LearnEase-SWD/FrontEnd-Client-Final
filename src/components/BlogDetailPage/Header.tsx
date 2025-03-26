import { MdAccountCircle, MdCalendarToday } from "react-icons/md";

type Props = {
  title: string;
  date: string;
  creator: string;
};
export const BlogHeader = ({ title, date, creator}: Props) => {
  return (
    <div>
      <div className="text-3xl font-bold">{title}</div>
      <div className="flex items-center gap-4 pt-4">
        <div className="flex items-center">
          <MdAccountCircle size={24} fill="orange" />
          <span className="px-2">{creator}</span>
        </div>
        <div className="flex items-center">
          <MdCalendarToday size={20} fill="orange" />
          <span className="px-2">{date}</span>
        </div>
        {/* <div className="flex items-center">
          <MdComment size={24} fill="orange" />
          <span className="px-2">{comments}</span>
        </div> */}
      </div>
    </div>
  );
};
