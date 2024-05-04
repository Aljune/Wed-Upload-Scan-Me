// import { fethData } from './../container/actions/sendUserAction';
import React from 'react';
import { useForm } from 'react-hook-form';
import { addSendPic, countUser, fethData } from '../container/actions/sendUserAction';
import { FileObject as DropzoneFileObject } from 'material-ui-dropzone';

import { firebaseStorage, Timestamp } from '../../config/firebaseInitializer';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate  } from 'react-router-dom';

export interface FirestoreTimestamp {
    toDate(): Date;
}

interface ListItemType {
    avatar: string;
    name: string;
    message: string;
    imageUrl?: [];
    subheader?: string;
}

export interface FormData {
    name: string;
    message: string;
    imageUrl?: [];
    date?: FirestoreTimestamp;
}

const useUploadHook = () => {

    
    const [fileObjects, setFileObjects] = React.useState<DropzoneFileObject[]>([]);

    const [dataEdit, setDataEdit] = React.useState<FormData>({
        name: '',
        message: ''
    });
    const [listItem, setListItem] = React.useState<ListItemType[]>([]);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const navigate = useNavigate ();

    
    const { handleSubmit, control } = useForm({
        defaultValues: {
            name: dataEdit.name,
            message: dataEdit.message,
        },
    });

    const onSaveFile = async (data: FormData) => {
        console.log('onSave', fileObjects);
        const username = data.name.replace(/\s+/g, '-');;

        if(fileObjects.length > 0) {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
          const day = String(currentDate.getDate()).padStart(2, '0');

          const storagePath = `images/sender/${username}/${year}${month}${day}/`;

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
             const dataTest = {
                imageUrl: imageUrls,
                name: data.name,
                message: data.message,
                date: Timestamp
             }
           
            const re = await addSendPic(dataTest);
            if(re.docRef){
                setErrorMessage('');
                navigate('/succesfuly-sent');
            }
            console.log("Image uploaded and saved with ID: ", re);
          } catch (error) {
            console.error("Error adding image document: ", error);
          }
        } else {
            setErrorMessage('Please add photo is required')
        }
  }
    const submit = async (data: FormData) => {

        if (!data.name || !data.message || data.name.trim() === '' || data.message.trim() === '') {
            setErrorMessage('Name and message are required.')
            return;
        }
        const dataTest = {
            name: data.name,
            message: data.message
        };
        await onSaveFile(dataTest);
    }

    const fethDataList = () => {
       const fn = async () => {
        const data = await fethData();
        const dataList: ListItemType[] = [];
            data.querySnapshot.forEach((doc) => {
                const dateTimestamp = doc.data().date;
                const timestampInMillis = dateTimestamp.seconds * 1000 + Math.round(dateTimestamp.nanoseconds / 1000000);
                const date = new Date(timestampInMillis);
                const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric'
                });
                const name = doc.data().name;
                const capitalizedFirstLetter = name.charAt(0).toUpperCase();

                const senderData = {
                    id: doc.id,
                    avatar: capitalizedFirstLetter,
                    name: name,
                    message: doc.data().message,
                    imageUrl: doc.data().imageUrl,
                    subheader: formattedDate
                };
                dataList.push(senderData);
                
                console.log(senderData, 'adasd');
            });

            setListItem(dataList);
       };
       fn().then();
    }
    React.useEffect(fethDataList, []);
  
    const countData = () => {
        const fn = async () => {
            const countUsers = await countUser();
            console.log(countUsers, 'countUsers');
        };
        fn().then();
    }
    React.useEffect(countData, []);

    return {
        submit,
        control,
        handleSubmit,
        setDataEdit,
        fileObjects,
        setFileObjects,
        onSaveFile,
        errorMessage,
        setListItem,
        listItem,
    }
}
export default useUploadHook;
