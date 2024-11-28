import { ID } from 'appwrite';
import { storage, databases } from './configDatabase'; 


interface Props {
    file: any
    topic: any
    description: any
}

export const uploadImageAndCreateDocument = async ({ file, topic, description }: Props) => {
    try {
        // Step 1: Upload the file to the storage bucket
        const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;
        const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
        const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
        const fileResponse = await storage.createFile(bucketId, ID.unique(), file);


        // Step 2: Add the document to the database 
        const document = {
            "imageFileId": fileResponse.$id, // Store only the file ID
            "Topic": topic,
            "Description": description,
        };

        const documentResponse = await databases.createDocument(
            databaseId,
            collectionId,
            ID.unique(),
            document
        );

        console.log('Document created:', documentResponse);
    } catch (error: any) {
        console.error('Error uploading image or creating document:', error.message);
    }
};
