import React from 'react';
import { useForm } from 'react-hook-form';
import { addSendPic, countUser } from '../container/actions/sendUserAction';
import { FileObject as DropzoneFileObject } from 'material-ui-dropzone';

import { firebaseStorage, db ,collection, addDoc } from '../../config/firebaseInitializer';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface FormData {
    name: string;
    message: string;
}

const useUploadHook = () => {

    const [fileObjects, setFileObjects] = React.useState<DropzoneFileObject[]>([]);

    // const [upload, setUpload] = React.useState<boolean>(false);
    const [dataEdit, setDataEdit] = React.useState<FormData>({
        name: '',
        message: ''
    });

    const { handleSubmit, control } = useForm({
        defaultValues: {
            name: dataEdit.name,
            message: dataEdit.message,
        },
    });

     const onSaveFile = async () => {
         if(fileObjects.length > 0) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
            const day = String(currentDate.getDate()).padStart(2, '0');
  
            // Construct the storage path with the current date
            const storagePath = `images/sender/${year}${month}${day}/`;
  
            const imageUrls = [];
            for (const fileObj of fileObjects) {
              const filePath = storagePath + fileObj.file.name;
              const storageRef = ref(firebaseStorage, filePath);
              await uploadBytes(storageRef, fileObj.file);
              const imageUrl = await getDownloadURL(storageRef);
              console.log(imageUrl, 'imageUrls')
              imageUrls.push(imageUrl);
            }
            console.log(imageUrls, 'imageUrls');
            try {
              const docRef = await addDoc(collection(db, "images"), {
                imageUrl: imageUrls,
              });
              console.log("Image uploaded and saved with ID: ", docRef.id);
            } catch (error) {
              console.error("Error adding image document: ", error);
            }
          }
        // setUpload(false);
          
    }

    const submit = async (data: FormData) => {
        const dataTest = {
            name: data.name,
            message: data.message
        };
        

       const re = await addSendPic(dataTest);
        if(re.docRef) {
             await onSaveFile();
        }
       // setUpload(true);
        console.log(re.docRef, countUser,'test'); 
    }

    console.log(fileObjects, 'fileObjects');

    const countData = () => {
        const fn = async () => {
            const countUsers = await countUser();
            console.log(countUsers, 'countUsers');
        };
        fn().then();
    }
    React.useEffect(countData, []);

   
    // const uploadFileImage = () => {
    //     const fn = async () => {
    //        await onSaveFile();
    //     };
    //     fn().then();
    // }

    // React.useEffect(uploadFileImage,[]);

    return {
        submit,
        control,
        handleSubmit,
        setDataEdit,
        fileObjects,
        setFileObjects,
    }
}
export default useUploadHook;
