<template>
  <div>
    <div class="card" style="width: 18rem;" v-for="(article, index) in allArticles" :key="index">
        <img class="card-img-top" src="https://0ikodomeo.files.wordpress.com/2013/12/wpid-image.jpg" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">{{ article.title }}</h5>
        <p>{{ article.category }}</p>
        <a class="btn btn-primary">See Detail</a>
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
