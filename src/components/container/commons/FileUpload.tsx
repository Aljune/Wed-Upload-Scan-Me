import React from 'react';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { FileObject as DropzoneFileObject } from 'material-ui-dropzone';

export interface FileUploadProps {
  fileObjects: DropzoneFileObject[];
  setFileObjects: React.Dispatch<React.SetStateAction<DropzoneFileObject[]>>;
}

const FileUpload = (props: FileUploadProps) => {

    const addImage = (newFileObjs: DropzoneFileObject[]) => {
      console.log('onAdd', newFileObjs);
      props.setFileObjects(prevFileObjects => [...prevFileObjects, ...newFileObjs]);
    }
    console.log(props.fileObjects, 'fileObjects');

    return (
       <>
           
            <DropzoneAreaBase
                dropzoneText={"Drag and drop an image here or click"}
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
