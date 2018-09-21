import axios from 'axios'
const DB_URL = 'https://northcoders-news-jwrc.herokuapp.com/api'

const withErrorHandling = (func) => {
  return ((...args) => {
    return func(...args).catch(err => err)
  })
}


export const retriveArticlesByTopicSlug = withErrorHandling((props) => {
  if (props.topic_slug) {
    return axios.get(`${DB_URL}/topics/${props.topic_slug}/articles`)
  } else {
    return axios.get(`${DB_URL}/articles`)
  }
})

export const retriveArticleById = withErrorHandling((props) => {
  return axios.get(`${DB_URL}/articles/${props.article_id}`)
})

export const retriveProfile = withErrorHandling((props) => {
  return axios.get(`${DB_URL}/users/${props.currentUser}`)
})

export const retriveUsers = withErrorHandling(() => {
  return axios.get(`${DB_URL}/users`);
})

export const retriveCommentsByArticle = withErrorHandling((props) => {
  return axios.get(`${DB_URL}/articles/${props.article_id}/comments`)
})

export const updateVotesComment = withErrorHandling((props, query) => {
  query = query.toLowerCase()
  axios.patch(`${DB_URL}/comments/${props}?vote=${query}`)
})

export const updateVotesArticle = withErrorHandling((props, query) => {
  query = query.toLowerCase()
  axios.patch(`${DB_URL}/articles/${props}?vote=${query}`)
})

export const addNewArticle = withErrorHandling((props) => {
  axios.post(`${DB_URL}/topics/${props.topic}/articles`, {
    "title": `${props.title}`, "body": `${props.content}`, "created_by": `${props.user_id}`
  })
})

export const addNewComment = withErrorHandling((newComment, articleId, userId) => {
  return axios.post(`${DB_URL}/articles/${articleId}/comments`, {
    "body": `${newComment}`, "created_by": `${userId}`
  })
})

export const deleteComment = withErrorHandling((commentId) => {
  return axios.delete(`${DB_URL}/comments/${commentId}`)
})