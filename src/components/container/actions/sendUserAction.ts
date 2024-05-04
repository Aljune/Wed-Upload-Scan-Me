import { db ,collection, addDoc, getDocs } from '../../../config/firebaseInitializer';

interface FirestoreTimestamp {
    toDate(): Date;
}

export interface FormData {
    name: string;
    message: string;
    imageUrl?: string[];
    date?: FirestoreTimestamp
}


export const addSendPic = async (data: FormData) => {

    try {
    
        const docRef = await addDoc(collection(db, "sender"), data);

        return {docRef}

    }
    catch (err){
        console.error("Error creating Bases:", err);
        throw new Error("Failed to create bases");
    }
}

export const fethData = async () => {

    try {
    
        const q = collection(db, 'sender'); 
        const querySnapshot = await getDocs(q);

        return {querySnapshot}
    
    }
    catch (err){
        console.error("Error creating Bases:", err);
        throw new Error("Failed to create bases");
    }
}


export const countUser = async () => {
    try {
        const q = collection(db, 'sender'); 
        const querySnapshot = await getDocs(q);
        const count = querySnapshot.size + 1;
        return {count}
    }
    catch (err){
        console.error("Error creating Bases:", err);
        throw new Error("Failed to create bases");
    }
}