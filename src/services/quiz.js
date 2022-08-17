import axios from 'axios';
const backendLink = process.env.REACT_APP_BACKEND_URL + '/api/v1';

export async function getAllQuizes({limit, page}){
    return axios.get(`${backendLink}/quiz?limit=${limit}&page=${page}`);
}

export async function getQuizById({id}){    
    return axios.get(`${backendLink}/quiz/id/${id}`);
}

export async function getQuizesByIds({ids, limit, page}){
    return axios.get(`${backendLink}/quiz/ids/${JSON.stringify(ids)}?limit=${limit}&page=${page}`);
}

export async function getQuizesByAuthor({authorId, limit, page}){
    return axios.get(`${backendLink}/quiz/author/${authorId}?limit=${limit}&page=${page}`);
}

export async function getQuizesByTags({tags, limit, page}){
    return axios.get(`${backendLink}/quiz/tags/${JSON.stringify(tags)}?limit=${limit}&page=${page}`);
}

export async function updateQuiz(quizId, newData){
    let formData = new FormData();
    for (let elem in newData) {
        formData.append(elem, newData[elem]);
    }
    return axios.put(`${backendLink}/quiz/${quizId}`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export async function addQuiz(quiz){
    let formData = new FormData();
    for(let key in quiz){
        formData.append(key, JSON.stringify(quiz[key]));
    }
    return axios.post(`${backendLink}/quiz/`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export async function deleteQuiz(id){
    return axios.delete(`${backendLink}/quiz/${id}`, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}