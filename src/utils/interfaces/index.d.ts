export interface IUploadedFilesFolder {
  name: string;
  type: "folder";
  priority: number;
  inner: IInnerArray;
}
export interface IUploadedFile {
  name: string;
  type: "file";
  priority: number;
  info: File;
}
export type IInnerArray = Array<IUploadedFilesFolder | IUploadedFile>;

