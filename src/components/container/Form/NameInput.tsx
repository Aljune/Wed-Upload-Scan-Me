import {Control, Controller, FieldValues, Path, PathValue} from "react-hook-form";
import {TextField} from '@mui/material';

interface NameInputField {
    name: string | null | undefined;
}

interface NameInputProps<T extends FieldValues & NameInputField> {
    control?: Control<T>
}

const NameInput = <T extends FieldValues & NameInputField>(props: NameInputProps<T>) => {
  
    return (

        <Controller
            name={'name' as Path<T & NameInputField>}
            defaultValue={"" as PathValue<T, Path<T & NameInputField>>}
            control={props.control}
            render={({field}) => (
                <TextField value={field.value} onChange={field.onChange} fullWidth={true} id="outlined-basic" label="Name" variant="outlined" />
            )}
        />
    )
} 
export default NameInput;