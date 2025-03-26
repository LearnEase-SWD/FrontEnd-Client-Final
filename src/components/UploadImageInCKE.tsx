import { API_UPLOAD_FILE } from "../constants/api/upload";

function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file: any) => {
            body.append("file", file); 
            body.append("upload_preset", "edumaster1"); 

            fetch(`${API_UPLOAD_FILE}`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.secure_url) {
                  resolve({
                    default: data.secure_url,
                  });
                } else {
                  reject("Error uploading file");
                }
              })
              .catch((error) => {
                reject(error);
              });
          });
        });
      },
    };
  }

  export function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }