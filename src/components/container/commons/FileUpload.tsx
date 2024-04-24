import React from 'react';
import { DropzoneDialogBase } from 'material-ui-dropzone';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { FileObject as DropzoneFileObject } from 'material-ui-dropzone';
import {Button} from '@mui/material';
import { firebaseStorage, db } from '../../../config/firebaseInitializer';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import image from '../../../assets/images/banner/wedding-bg.png';

const FileUpload = () => {
    const [open, setOpen] = React.useState(false);
    const [fileObjects, setFileObjects] = React.useState<DropzoneFileObject[]>([]);
    const [image, setImage] = React.useState<File | null>(null);

    const handleImageChange = (e: any) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    const handleUpload = async () => {
      if (image !== null) { // Check if image is not null
        // Upload image to Firebase Storage
        const storageRef = ref(firebaseStorage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
  
        // Get download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);
  
        // Save image data to Firestore
        try {
          const docRef = await addDoc(collection(db, "images"), {
            imageUrl: imageUrl,
            // Add additional fields if needed
          });
          console.log("Image uploaded and saved with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding image document: ", error);
        }
      } else {
        console.error("No image selected");
      }
    };

    const addImage = (newFileObjs: DropzoneFileObject[]) => {
      console.log('onAdd', newFileObjs);
      setFileObjects(prevFileObjects => [...prevFileObjects, ...newFileObjs]);
    }
    const onSaveFile = () => {
      const fn = async () => {
        console.log('onSave', fileObjects);
        if(fileObjects.length > 0) {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
          const day = String(currentDate.getDate()).padStart(2, '0');

          // Construct the storage path with the current date
          const storagePath = `images/${year}${month}${day}/`;

          const imageUrls = [];
          for (const fileObj of fileObjects) {
            const filePath = storagePath + fileObj.file.name;
            const storageRef = ref(firebaseStorage, filePath);
            await uploadBytes(storageRef, fileObj.file);
            const imageUrl = await getDownloadURL(storageRef);
            imageUrls.push(imageUrl);

          }
          try {
            const docRef = await addDoc(collection(db, "images"), {
              imageUrl: imageUrls,
              // Add additional fields if needed
            });
            console.log("Image uploaded and saved with ID: ", docRef.id);
          } catch (error) {
            console.error("Error adding image document: ", error);
          }
         
        }
      };
      fn().then();
      setOpen(false);
    }

    console.log(fileObjects, 'fileObjects');
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
                filesLimit={2}
                open={open}
                onAdd={addImage}
                onDelete={(deleteFileObj: any) => {
                console.log('onDelete', deleteFileObj);
                setFileObjects(prevFileObjects => prevFileObjects.filter(obj => obj !== deleteFileObj));
                }}
                onClose={() => setOpen(false)}
                onSave={onSaveFile}
                showPreviews={true}
                showFileNamesInPreview={true}
            />
       </>
    )
}
export default FileUpload;