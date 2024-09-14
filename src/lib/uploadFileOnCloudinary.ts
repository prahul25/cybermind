import cloudinary from "./clodinary";

type UploadResponse = {
    url: string;
  };

export const uploadImage = async(file:File, folder:string): Promise<UploadResponse> =>{
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer)
    return new Promise(async(resolve,reject) =>{
        cloudinary.uploader.upload_stream({
            resource_type:"auto",
            folder:folder
        }, (err, res) => {
            if (err) {
              reject(err.message);
            } else if (res) {
              const { url } = res as { url: string };
              resolve({ url });
            } else {
              reject("No response from Cloudinary");
            }
          }
        ).end(bytes);
    })
}