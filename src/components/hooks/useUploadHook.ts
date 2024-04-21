import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
    name: string;
    message: string;
  }

const useUploadHook = () => {
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

    const submit = async (data: FormData) => {
        const dataTest = {
            name: data.name,
            message: data.message
        };
        console.log(dataTest,'test'); 
    }
    return {
        submit,
        control,
        handleSubmit,
        setDataEdit,
    }
}
export default useUploadHook;