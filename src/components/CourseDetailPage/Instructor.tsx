import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";

interface Instructor {
  email: string;
  name: string;
  google_id: string;
  role: string;
  status: boolean;
  description: string;
  phone_number: string;
  avatar_url: string;
  video_url: string;
  is_verified: boolean;
  token_version: number;
  balance: number;
  balance_total: number;
  bank_name: string;
  bank_account_no: string;
  bank_account_name: string;
  is_deleted: boolean;
  _id: string;
  dob: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

type Props = {
  items: Instructor;
};
export const Instructor = ({ items }: Props) => {
  return (
    <div className="flex gap-5">
      <div className="w-1/4">
        <img
          src={items.avatar_url}
          alt="avatar"
          className="w-full h-auto aspect-square object-cover rounded-xl"
        />
      </div>
      <div className="w-3/4">
        <div className="text-xl font-bold">{items.name}</div>
        <div className="py-4">{items.description}</div>
        <div className="flex gap-2 items-center">
          <MdOutlineLocalPhone className="text-orange-500"/>
          {items.phone_number}
        </div>
        <div className="flex gap-2 items-center">
          <MdOutlineEmail className="text-orange-500"/>
          {items.email}
        </div>
      </div>
    </div>
  );
};
