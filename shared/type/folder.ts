export interface Folder {
  folderId: number;
  folderName: string;
  coverImg: string;
  postCount: number;
  default: boolean;
}

export interface FolderSuccessResponse {
  folderId: number;
  folderName: string;
}
