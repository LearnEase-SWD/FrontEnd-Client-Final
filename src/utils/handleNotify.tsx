import { notification } from "antd";
export const handleNotify = (message: string, description: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
  notification[type]({
    message: message,
    description: description,
  });
};
