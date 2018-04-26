<template>
  <div class="container">
    <h1>Welcome to Hacktiv-Press</h1>
    <div class="col-5">
      <ul class="list-group">
        <a class="list-group-item list-group-item-action" @click="showAllArticles">Show all article</a>
        <a class="list-group-item list-group-item-action">Search article by Author</a>
        <a class="list-group-item list-group-item-action">Search article by Category</a>
        <a class="list-group-item list-group-item-action" v-if="isTokenExist" data-toggle="modal" data-target="#createModal">Create New Article</a>
      </ul>
      <!-- Modal -->
      <div class="modal fade" id="createModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Insert the title of your article">
              </div>
              <div class="form-group">
                <label>Category</label>
                <select class="form-control">
                  <option>News</option>
                  <option>Funny</option>
                  <option>Sports</option>
                  <option>Technology</option>
                </select>
              </div>
              <div class="form-group">
                <label>Content</label>
                <textarea class="form-control" placeholder="Insert the content of your artcile" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="saveNewArticle">Save article</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-7">
      <div>
        <div v-for="(article, index) in allArticles" :key="index">

        </div>
      </div>      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    //HelloWorld
  },
  methods: {
    showAllArticles: function () {
      this.$store.dispatch('getAllarticles')
    },
    saveNewArticle: function () {
      
    },

    isTokenExist: function () {
      localStorage.getItem('token')
    }
  },
  beforeCreate: function () {
    this.$store.dispatch('getAllarticles')
  },
  computed: mapState([
    'allArticles'
  ])
}
</script>
