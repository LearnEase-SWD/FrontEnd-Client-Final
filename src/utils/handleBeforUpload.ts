import { GetProp, UploadProps } from "antd";
import { handleNotify } from "./handleNotify";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "video/mp4";
  if (!isJpgOrPng) {
    handleNotify("Error", `You can only upload MP4 file!`, "error");
  }
  return isJpgOrPng ;
};
