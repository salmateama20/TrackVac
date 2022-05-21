import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/trackvac-api',
})
// home 
export const initHome = () => api.get(`/home`)
//reviews 
export const getAllCities = () => api.get(`/reviews`)
export const getAllDistricts = (cityID) => api.get(`/reviews/${cityID}`)
export const getPlacesArray = () => api.get(`/place/placesarray`)
export const getAllReviews = (cityID, placeID) => api.get(`/reviews/${cityID}/${placeID}`)
export const addReview = (review, placeID) => api.post(`/reviews/${placeID}`, review)
export const updateVote = (vote, reviewID) => api.put(`/reviews/vote/${reviewID}`, vote)
export const updateReport = (reviewID) => api.put(`/reviews/report/${reviewID}`)
export const validateUser = (userInfo) => api.post(`/reviews/validation`, userInfo)
// questions 
export const getAllCitiesQuestions = () => api.get(`/questions`)
export const getAllDistrictsQuestions = (cityID) => api.get(`/questions/${cityID}`)
export const getAllQuestions = (cityID, placeID) => api.get(`/questions/${cityID}/${placeID}`)
export const addQuestion = (question, placeID) => api.post(`/questions/${placeID}`, question)
export const addReply = (reply, questID) => api.post(`/questions/addreply/${questID}`, reply)
export const updateVoteQuestion = (vote, questID) => api.put(`/questions/vote/${questID}`, vote)

//to doo 
//validation


//admin 
export const adminHome = () => api.get(`/admin/home`)
export const adminLogout = () => api.get(`/admin/logout`)
export const adminValidate = (adminInfo) => api.post(`/admin/validate`, adminInfo)
export const adminReviews = () => api.get(`/admin/reviews`)
export const adminQuestions = () => api.get(`/admin/questions`)
export const deleteReview = (reviewID) => api.delete(`/admin/reviews/${reviewID}`)
export const deleteQuestion = (questID) => api.delete(`/admin/question/${questID}`)
export const deletePlace = (placeID) => api.delete(`/admin/place/${placeID}`)
export const addPlace = (cityID, name) => api.post(`admin/place/${cityID}`, name)


const apis = {
    initHome,
    getAllCities,
    getAllDistricts,
    getPlacesArray,
    getAllReviews,
    addReview,
    updateVote,
    updateReport,
    validateUser,
    getAllCitiesQuestions,
    getAllDistrictsQuestions,
    getAllQuestions,
    addQuestion,
    addReply,
    updateVoteQuestion,
    adminHome, adminLogout,
    adminValidate, adminReviews, adminQuestions,
    deleteReview, deleteQuestion, deletePlace,
    addPlace
}

export default apis