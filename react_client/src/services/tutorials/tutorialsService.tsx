import { Tutorial } from "../../entities/tutorial.entity";
import { apiClient } from "../apiClient";
import { getPaginationHeaders } from "../pagination/pagination.helper";


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

export const getTutorialsOrderedByModificationDate = async (pageNumber: number, pageSize: number, token: string) => {
    let params = getPaginationHeaders(pageNumber, pageSize, token);
    return (await apiClient.get("/Tutorial/GetTutorialsOrderedByModificationDate", params)).data as Tutorial[];
}