import axios from 'axios'
const DB_URL = 'https://northcoders-news-jwrc.herokuapp.com/api'

export const retriveArticlesByTopicSlug = (props) => {
  if (props.topic_slug) {
    return axios.get(`${DB_URL}/topics/${props.topic_slug}/articles`)
  } else {
    return axios.get(`${DB_URL}/articles`)
  }
}

export const retriveArticleById = (props) => {
  return axios.get(`${DB_URL}/articles/${props.article_id}`)
}

export const retriveProfile = (props) => {
  return axios.get(`${DB_URL}/users/${props.currentUser}`)
}

export const retriveCommentsByArticle = (props) => {
  return axios.get(`${DB_URL}/articles/${props.article_id}/comments`)
}

export const updateVotesComment = (props, query) => {
  query = query.toLowerCase()
  axios.patch(`${DB_URL}/comments/${props}?vote=${query}`)
}

export const updateVotesArticle = (props, query) => {
  query = query.toLowerCase()
  axios.patch(`${DB_URL}/articles/${props}?vote=${query}`)
}

export const addNewArticle = (props) => {
  axios.post(`${DB_URL}/topics/${props.topic}/articles`, {
    "title": `${props.title}`, "body": `${props.content}`, "created_by": `${props.user_id}`
  })
}

export const addNewComment = (props, id, userId) => {
  axios.post(`${DB_URL}/articles/${id}/comments`, {
    "body": `${props}`, "created_by": `${userId}`
  })
}