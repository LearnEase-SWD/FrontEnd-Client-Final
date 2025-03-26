import { Empty } from "antd";

interface EmptyDataProps {
  message: string;
  description: string;
}

const EmptyData = ({ message, description }: EmptyDataProps) => (
  <Empty
    description={
      <div>
        <p className="text-gray-600 mb-2">{message}</p>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    }
  />
);

export default EmptyData;
