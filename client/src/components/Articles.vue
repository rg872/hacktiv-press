<template>
  <div>
    <div v-for="(article, index) in allArticles" :key="index">
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://0ikodomeo.files.wordpress.com/2013/12/wpid-image.jpg" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">{{ article.title }}</h5>
        <p>{{ article.category }}</p>
        <a class="btn btn-danger" data-toggle="modal" :data-target="'#delete' +index">Delete</a>
        <a class="btn btn-warning" data-toggle="modal" :data-target="'#update' +index">Update</a>
        <a class="btn btn-primary" data-toggle="modal" :data-target="'#detail' +index">See Detail</a>
        </div>        
    </div>
    <!-- Modal DELETE-->
      <div class="modal fade" :id="'#delete' +index" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete article</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <h3>Are you sure to delete this article</h3>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="deleteArticle(index)">Yes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal UPDATE-->
      <div class="modal fade" :id="'#update' +index" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Update Article</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Insert the title of your article" v-model="article.title">
              </div>
              <div class="form-group">
                <label>Category</label>
                <select class="form-control" v-model="article.category">
                  <option>News</option>
                  <option>Funny</option>
                  <option>Sports</option>
                  <option>Technology</option>
                </select>
              </div>
              <div class="form-group">
                <label>Content</label>
                <textarea class="form-control" placeholder="Insert the content of your artcile" rows="3" v-model="article.content"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateArticle(index)">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal DETAIL-->
      <div class="modal fade" :id="'#detail' +index" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ article.title }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <img src="https://0ikodomeo.files.wordpress.com/2013/12/wpid-image.jpg"/>
               <h6>{{ article.category }}</h6>
               <p>{{ article.content }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</div> 
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'articles',
    data: function () {
        return {
            
        }
    },
    methods: {
      deleteArticle: function (index) {
          let id = this.allArticles[index]._id
          this.$store.dispatch('getAllarticles')
      },
      
      updateArticle: function (index) {
          let updateArticle = this.allArticles[index]
          this.$store.dispatch('getAllarticles')
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

<style>

</style>
