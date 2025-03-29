import {
  MdOutlineAccessTimeFilled,
  MdAccountCircle,
  MdInsertChart,
  MdAutoStories,
} from "react-icons/md";
import { capitalizeFirstLetter } from "../../utils/capitalize";

type Props = {
  time: number;
  level: string;
  lessons: number;
};
export const CourseSummary = ({
  time,
  level,
  lessons
}: Props) => {
  return (
    <div className="absolute w-full mt-4 lg:text-xl bg-white flex shadow-lg py-4 lg:px-8 rounded-lg justify-center">
      <div className="w-1/4 flex lg:flex-row flex-col items-center justify-center font-jost font-light gap-2 lg:px-4">
        <MdOutlineAccessTimeFilled height={16} fill="#FF782D" />
        {Math.ceil(time / 60)} Hours
      </div>
      <div className="w-[1px] h-full bg-slate-200 min-h-[45px] min-w-[1px]"></div>
      
      <div className="w-[1px] h-full bg-slate-200 min-h-[45px] min-w-[1px]"></div>
      <div className="w-1/4 flex lg:flex-row flex-col items-center justify-center font-jost font-light gap-2 lg:px-4">
        <MdInsertChart height={16} fill="#FF782D" />
        {capitalizeFirstLetter(level)} <span className="lg:block hidden">levels</span>
      </div>
      <div className="w-[1px] h-full bg-slate-200 min-h-[45px] min-w-[1px]"></div>
      <div className="w-1/4 flex lg:flex-row flex-col items-center justify-center font-jost font-light gap-2">
        <MdAutoStories height={16} fill="#FF782D" />
        {lessons} Lessons
      </div>
    </div>
  );
};
