import React from 'react';
import { DropzoneDialogBase } from 'material-ui-dropzone';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { FileObject as DropzoneFileObject } from 'material-ui-dropzone';
import {Button} from '@mui/material';

const FileUpload = () => {
    const [open, setOpen] = React.useState(false);
    const [fileObjects, setFileObjects] = React.useState<DropzoneFileObject[]>([]);

    const dialogTitle = () => (
        <>
          <span>Upload file</span>
          <IconButton
            style={{right: '12px', top: '8px', position: 'absolute'}}
            onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </>
      );

    return (
       <>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Add Image
            </Button>
            <DropzoneDialogBase
                dialogTitle={dialogTitle()}
                acceptedFiles={['image/*']}
                fileObjects={fileObjects}
                cancelButtonText={"cancel"}
                submitButtonText={"submit"}
                maxFileSize={2147483647}
                filesLimit={2147483647}
                open={open}
                onAdd={(newFileObjs: any[]) => {
                console.log('onAdd', newFileObjs);
                setFileObjects(prevFileObjects => [...prevFileObjects, ...newFileObjs]);
                }}
                onDelete={(deleteFileObj: any) => {
                console.log('onDelete', deleteFileObj);
                setFileObjects(prevFileObjects => prevFileObjects.filter(obj => obj !== deleteFileObj));
                }}
                onClose={() => setOpen(false)}
                onSave={() => {
                console.log('onSave', fileObjects);
                setOpen(false);
                }}
                showPreviews={true}
                showFileNamesInPreview={true}
            />
       </>
    )
}
export default FileUpload;