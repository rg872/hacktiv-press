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
          alert('maaf ada kesalahan, silahkan tunggu beberapa waku lagi')
        })
    },

    signIn: function (context, payload) {
      axios.post('http://localhost:3000/users/signin', payload)
        .then((res) => {
          localStorage.setItem('token', res.data.token)
        })
        .catch((err) => {
          console.log(err)
          alert('maaf ada kesalahan, silahkan tunggu beberapa waku lagi')
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
          alert('maaf ada kesalahan, silahkan tunggu beberapa waku lagi')
        })
    }
  }
})
