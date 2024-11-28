import { useEffect, useState } from "react";
import { databases } from "@/lib/configDatabase";

export const useGetData = () => {
    const [Loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>([]);

    const callApi = async () => {
        setLoading(true);
        try {
            const response = await databases.listDocuments('671f4738000b094f7fbe', '671f4aba0032e914f93b'); 
            setLoading(false);
            setData(response.documents);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }

    };

    useEffect(() => {
        callApi();
    }, []);

    return [Loading, data];
};
