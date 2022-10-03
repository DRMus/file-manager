export interface IUploadedFilesFolder {
  name: string;
  type: string;
  inner: IInnerArray;
}
export interface IUploadedFile {
  name: string;
  type: string;
  info: File;
}
export type IInnerArray = Array<IUploadedFilesFolder | IUploadedFile>;

