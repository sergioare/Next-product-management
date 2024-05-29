import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  StorageReference,
} from "firebase/storage";
import { storage } from "../firebase.config";

const storageName = "imagesTest/{0}";
const metaDataMIME = {
  contentType: "image/jpeg",
};
const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.7;

export function calculateSize(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

class ImagesService {
  async upload(id: string, images: string[]): Promise<string[]> {
    // const storageRef = ref(storage, storageName.replace("{0}", instituteId))
    const promises: Promise<string[]>[] = [];
    const filesImages = await this.urlsToFiles(images);
    filesImages.map((file) => {
      const fileStorageRef = storageName.replace("{0}", id);

      const storageRef = ref(storage, fileStorageRef);

      const compressedImagesPromise = this.optimizedImages(storageRef, file);
      promises.push(compressedImagesPromise);
    });
    try {
      const allUploadedImages = await Promise.all(promises);
      const uploadedImages = allUploadedImages.flat();

      return uploadedImages;
    } catch (error) {
      console.error("Error uploading images:", error);
    }

    return [];
  }

  async urlsToFiles(urls: string[]) {
    const filePromises = urls.map(async (url, index) => {
      // Si la URL es una imagen en base 64
      if (/^data:image\/[a-z]+;base64,/.test(url)) {
        const base64Data = url.split(",")[1];
        const binaryData = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        const file = new File([uint8Array], "imagen.png", {
          type: "image/png",
        });
        return file;
      } else {
        // Si la URL es una web
        const response = new File([url], `archivo${index}.png`, {
          type: "image/png",
        });
        return response;
      }
    });
    const files = await Promise.all(filePromises);
    return files;
  }

  private async optimizedImages(
    storageRef: StorageReference,
    file: File
  ): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onerror = function () {
        URL.revokeObjectURL(this.src);
        reject(new Error("Cannot load image"));
      };
      img.onload = function () {
        URL.revokeObjectURL((this as HTMLImageElement).src);
        // calculate new width and height
        const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);

        //convert canvas to blob with indicated quality

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Error compressing image"));
              return;
            }

            //upload Blob to Firebase Storage
            const uploadTask = uploadBytesResumable(
              storageRef,
              blob,
              metaDataMIME
            );
            uploadTask.on(
              "state_changed",
              // (snapshot)=>{},
              null,
              (error) => {
                console.error(error);
                reject(new Error("Error uploading compressed image"));
              },

              async () => {
                try {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );

                  // console.log('File available at', downloadURL);

                  // console.log(compressedImageProps)
                  resolve([downloadURL]);
                } catch (error) {
                  console.error("Error getting download URL:", error);
                  reject(new Error("Error getting download URL"));
                }
              }
            );
          },
          MIME_TYPE,
          QUALITY
        );
      };
    });
  }
}
export default new ImagesService();
