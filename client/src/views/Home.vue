<template>
  <div class="container">
    <h1>Welcome to Hacktiv-Press</h1>
    <div class="row">
      <div class="col-5">
      <ul class="list-group">
        <a class="list-group-item list-group-item-action" v-if="isTokenExist" data-toggle="modal" data-target="#createModal">Create New Article</a>
        <br><br><br>
        <h5>Filter Articles By:</h5>
        <div class="form-group">
          <label></label>
          <select class="form-control" v-model="filterBy">
            <option>All</option>
            <option>Author</option>
            <option>Category</option>
          </select>
        </div>
        <div class="form-group" v-if="filterBy === 'Author'">
          <label>Author</label>
          <input type="text" class="form-control" placeholder="Insert the title of your article" v-model="filterValue">
        </div>
        <div class="form-group" v-else-if="filterBy === 'Category'">
          <label>Category</label>
          <select class="form-control" v-model="filterValue">
            <option>News</option>
            <option>Funny</option>
            <option>Sports</option>
            <option>Technology</option>
          </select>
        </div>
        <button type="button" class="btn btn-primary" @click="setFilter">Begin Filter</button>
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
                <input type="text" class="form-control" placeholder="Insert the title of your article" v-model="title">
              </div>
              <div class="form-group">
                <label>Category</label>
                <select class="form-control" v-model="category">
                  <option>News</option>
                  <option>Funny</option>
                  <option>Sports</option>
                  <option>Technology</option>
                </select>
              </div>
              <div class="form-group">
                <label>Content</label>
                <textarea class="form-control" placeholder="Insert the content of your artcile" rows="3" v-model="content"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="saveNewArticle">Save article</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-7 d-flex flex-wrap">
       <Articles></Articles> 
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Articles from '@/components/Articles.vue'

export default {
  name: 'home',
  components: {
    Articles
  },
  data: function () {
    return {
      title: '',
      category: '',
      content: '',
      isTokenExist: false,
      filterBy: 'All',
      filterValue: ''
    }
  },
  methods: {
    saveNewArticle: function () {
      let newArticle = {
        title : this.title,
        category: this.category,
        content: this.content
      }

        this.$store.dispatch('saveNewArticle', newArticle)
    },
    showAllArticles: function () {
      this.$store.dispatch('getAllarticles')
    },
    setFilter: function () {

      if (this.filterBy === 'All') {
        this.$store.dispatch('getAllarticles')        
      } else if (this.filterBy === 'Author') {
        this.$store.dispatch('getAllarticlesByAuthor', this.filterValue) 
      } else if (this.filterBy === 'Category') {
        this.$store.dispatch('getAllarticlesByCategory', this.filterValue) 
      }
    }
  },
  mounted: function () {
    if (localStorage.getItem('token')) {
        this.isTokenExist = true
      }
  }
}
</script>

<style>

</style>

