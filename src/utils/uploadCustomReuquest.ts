import { UploadProps } from "antd";
import { API_UPLOAD_FILE } from "../constants/api/upload";
import { hideLoadingOverlay, showLoadingOverlay } from "./loadingOverlay";
import { handleNotify } from "./handleNotify";
import { RcFile } from 'antd/es/upload/interface';


export const uploadCustomRequest:UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
        showLoadingOverlay();
  
        const formData = new FormData();
        formData.append('file', file as RcFile);
  
        const response = await fetch(API_UPLOAD_FILE, {
          method: 'POST',
          body: formData,
          headers: {
          },
        });
  
        if (!response.ok) {
          throw new Error('Upload failed');
        }
  
        const data = await response.json();
        if (onSuccess && onSuccess(data, file)) handleNotify("Upload successful!", "Your file has been uploaded.", 'success');
      } catch (error) {
        if (onError) {
          handleNotify("Upload failed", "There was an error uploading your file.", 'error');
          console.log(error)
        }
      } finally {
        hideLoadingOverlay();
      }
    
}
