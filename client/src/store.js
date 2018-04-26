import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allArticles: []
  },
  mutations: {
    setAllArticles: function (state, articles) {
      state.allArticles = articles
    },

    setNewArticle: function (state, article) {
      state.allArticles.push(article)
    }
  },
  actions: {
    signUp: function (context, payload) {
      axios.post('http://localhost:3000/users/signup', payload)
        .then((res) => {
          localStorage.setItem('token', res.data.token)
        })
        .catch((err) => {
          console.log(err)
          alert('sorry, theres an error in our system. Please try again in couple of minutes')
        })
    },

    signIn: function (context, payload) {
      axios.post('http://localhost:3000/users/signin', payload)
        .then((res) => {
          localStorage.setItem('token', res.data.token)
        })
        .catch((err) => {
          console.log(err)
          alert('sorry, theres an error in our system. Please try again in couple of minutes')
        })
    },

    getAllarticles: function (context) {
      axios.get('http://localhost:3000/articles/all')
        .then((res) => {
          let articles = res.data.articles
          context.commit('setAllArticles', articles)
        })
        .catch((err) => {
          console.log(err)
          alert('sorry, theres an error in our system. Please try again in couple of minutes')
        })
    },

    saveNewArticle: function (context, newArticle) {
      axios.post('http://localhost:3000/articles/add', {token: localStorage.getItem('token'), article: newArticle})
        .then((res) => {
          let article = res.data.articles
          context.commit('setNewArticle', article)
        })
        .catch((err) => {
          console.log(err)
          alert('sorry, theres an error in our system. Please try again in couple of minutes')
        })
    }
  }
})
