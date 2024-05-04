import React from 'react';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { FileObject as DropzoneFileObject } from 'material-ui-dropzone';

export interface FileUploadProps {
  fileObjects: DropzoneFileObject[];
  setFileObjects: React.Dispatch<React.SetStateAction<DropzoneFileObject[]>>;
}

const FileUpload = (props: FileUploadProps) => {

    const addImage = (newFileObjs: DropzoneFileObject[]) => {
      props.setFileObjects(prevFileObjects => [...prevFileObjects, ...newFileObjs]);
    }

    return (
       <>
            <DropzoneAreaBase
                dropzoneText={"ADD PHOTO"}
                acceptedFiles={['image/*']}
                fileObjects={props.fileObjects}
                maxFileSize={2147483647}
                filesLimit={2}
                onAdd={addImage}
                onDelete={(deleteFileObj: any) => {
                  console.log('onDelete', deleteFileObj);
                  props.setFileObjects(prevFileObjects => prevFileObjects.filter(obj => obj !== deleteFileObj));
                }}
                onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
            />
       </>
    )
}
export default FileUpload;
