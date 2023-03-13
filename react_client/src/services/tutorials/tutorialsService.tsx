import { Tutorial } from "../../entities/tutorial.entity";
import { apiClient } from "../apiClient";


const tokenConfig = {
    headers: {
        Authorization: ''
    }
};

export const getPublishedTutorialsOrderedByPublishDate = async () => {
    return await apiClient.get(`/tutorial/getpublishedtutorialsorderedbypublishdate`);
}

export const getTutorialByTitleAsync = async (title:string) => {
    return (await apiClient.get(`/tutorial/gettutorialbytitle?title=${title}`)).data as Tutorial;
}