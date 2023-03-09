import { apiClient } from "../apiClient";


const tokenConfig = {
    headers: {
        Authorization: ''
    }
};

export const getPublishedTutorialsOrderedByPublishDate = async () => {
    return await apiClient.get(`/tutorial/getpublishedtutorialsorderedbypublishdate`);
}