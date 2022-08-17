import axios from 'axios';
const backendLink = process.env.REACT_APP_BACKEND_URL + '/api/v1';

export async function getAllQuizes({limit, page}){
    return axios.get(`${backendLink}/quiz?limit=${limit}&page=${page}`);
}

export async function getQuizById({id}){    
    return axios.get(`${backendLink}/quiz/id/${id}`);
}

export async function getQuizesByIds({ids}){
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quiz/ids/${JSON.stringify(ids)}`);
}

export async function getQuizesByAuthor({authorId}){
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quiz/author/${authorId}`);
}

export async function getQuizesByTags({tags}){
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quiz/tags/${JSON.stringify(tags)}`);
}

export async function updateQuiz(quizId, newData){
    let formData = new FormData();
    for (let elem in newData) {
        formData.append(elem, newData[elem]);
    }
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quiz/${quizId}`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export async function addQuiz(){
    
}

export async function deleteQuiz(id){
    return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quiz/${id}`, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}