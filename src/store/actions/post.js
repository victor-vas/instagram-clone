import axios from 'axios';

import {SET_POSTS, CREATING_POST, POST_CREATED} from './actionTypes';
import {setMessage} from './message';

export const addPost = post => {
  return (dispatch, getState) => {
    dispatch(creatingPost());

    axios({
      url: 'uploadImage',
      baseURL: 'https://us-central1-lambe-victor.cloudfunctions.net',
      method: 'post',
      data: {
        image: post.image.base64,
      },
    })
      .then(res => {
        post.image = res.data.imageUrl;

        axios
          .post(`/posts.json?auth=${getState().user.token}`, {...post})
          .then(res => {
            dispatch(fetchPosts());
            dispatch(postCreated());
          })
          .catch(error => {
            dispatch(
              setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado',
              }),
            );
          });
      })
      .catch(error => {
        dispatch(
          setMessage({
            title: 'Erro',
            text: 'Ocorreu um erro inesperado',
          }),
        );
      });
  };
};

export const addComment = payload => {
  return (dispatch, getState) => {
    axios
      .get(`/posts/${payload.postId}.json`)
      .then(res => {
        const comments = res.data.comments || [];

        comments.push(payload.comment);
        axios
          .patch(
            `/posts/${payload.postId}.json?auth=${getState().user.token}`,
            {comments},
          )
          .then(res => {
            dispatch(fetchPosts());
          })
          .catch(error => {
            dispatch(
              setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado',
              }),
            );
          });
      })
      .catch(error => {
        dispatch(
          setMessage({
            title: 'Erro',
            text: 'Ocorreu um erro inesperado',
          }),
        );
      });
  };
};

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    payload: posts,
  };
};

export const fetchPosts = () => {
  return dispatch => {
    axios
      .get('/posts.json')
      .then(res => {
        const rawPosts = res.data;
        const posts = [];

        for (let key in rawPosts) {
          posts.push({
            ...rawPosts[key],
            id: key,
          });
        }

        dispatch(setPosts(posts.reverse()));
      })
      .catch(error => {
        dispatch(
          setMessage({
            title: 'Erro',
            text: 'Ocorreu um erro inesperado',
          }),
        );
      });
  };
};

export const creatingPost = () => {
  return {
    type: CREATING_POST,
  };
};

export const postCreated = () => {
  return {
    type: POST_CREATED,
  };
};
