const paginationParams = {
    headers: {
        Authorization: ''
    },
    params: {
        pageNumber: 1,
        pagesize: 10
    }
}

export function getPaginationHeaders(pageNumber: number, pageSize: number, token: string) {
    paginationParams.headers.Authorization = `Bearer ${token}`;
    paginationParams.params.pageNumber = pageNumber;
    paginationParams.params.pagesize = pageSize;
    return paginationParams;
}