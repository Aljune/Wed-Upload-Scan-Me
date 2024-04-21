import {Control, Controller, FieldValues, Path, PathValue} from "react-hook-form";
import {TextField} from '@mui/material';

interface MessageInputtField {
    message: string | null | undefined;
}

interface MessageInputProps<T extends FieldValues & MessageInputtField> {
    control?: Control<T>
}

const MessageInput = <T extends FieldValues & MessageInputtField>(props: MessageInputProps<T>) => {
  
    return (

        <Controller
            name={'message' as Path<T & MessageInputtField>}
            defaultValue={"" as PathValue<T, Path<T & MessageInputtField>>}
            control={props.control}
            render={({field}) => (
                <TextField minRows={4} multiline={true} value={field.value} onChange={field.onChange} fullWidth={true} id="outlined-basic" label="Greetings" variant="outlined" />
            )}
        />
    )
} 
export default MessageInput;