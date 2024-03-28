const baseUrl = "https://api.themoviedb.org/3/"
const key = "80f15f710a7f682ab448785640a02c7f"

const getUrl = (endpoint, params) => {
    const qs = new URLSearchParams(params);
    return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;

};

export default { getUrl };


