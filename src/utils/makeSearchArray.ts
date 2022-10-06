import { IUploadedFile } from "./interfaces";

/**
 * Производит поиск среди исходного массива файлов
 * 
 * @param uploadedFile 
 * @param text 
 * @returns Array
 */
const makeSearchArray = (uploadedFile: FileList, text: string) => {
  return new Promise<IUploadedFile[]>((resolve, reject) => {
    let tempArr: IUploadedFile[] = [];
    for (let i = 0; i < uploadedFile?.length; i++) {
      if (uploadedFile[i].name.indexOf(text) !== 0) {
        continue;
      }
      const fileObject: IUploadedFile = {
        name: uploadedFile[i].name,
        type: "file",
        priority: 2,
        info: uploadedFile[i],
      };
      tempArr.push(fileObject);
    }
    resolve(tempArr)
  });
};

export default makeSearchArray;
