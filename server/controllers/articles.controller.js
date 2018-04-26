const Article = require('../models/articles.model')
const User = require('../models/users.model')
const decodeJwt = require('../helpers/decode-jwt')


module.exports = {
    addArticle: function(req, res){
        let decoded = decodeJwt.decoding(req.body.token);
     
        let new_article = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        }  

        Article.create(new_article)
        .then((article)=>{           

            User.findOne({email: decoded.email})
            .then((user)=>{
                user.articles.push(article);
                
                user.save()
                .then((user)=>{
                    res.status(200).json({
                        message: 'success create new article',
                        articles: article
                    })
                })                               
            })
            
        })        
        .catch((error)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
        
    },

    getAllArticle: function(req, res){
        Article.find({})
        .then((article)=>{
            res.status(200).json({
                message: 'success get all article',
                articles: article
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    getArticleByEmail: function(req, res){
        let email = decodeJwt.decoding(req.body.token).email;
        
        User.findOne({email: email})
        .populate('articles')
        .then((user)=>{
            res.status(200).json({
                message: 'success get articles',
                articles: user.articles
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    getArticleByAuthor: function(req, res){
        
        User.find({name: req.params.name})
        .populate('articles')
        .then((article)=>{
            res.status(200).json({
                message: 'success get articles',
                articles: article
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    getArticleByCategory: function(req, res){
        
        Article.find({category: req.params.category})
        .then((article)=>{
            res.status(200).json({
                message: 'success get articles',
                articles: article
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    updateArticleById: function(req, res){
        
        Article.findByIdAndUpdate(req.body.id, req.body)
        .then((article)=>{
            res.status(200).json({
                message: 'success change article status'
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    deleteArticleById: function(req, res){
        let email = decodeJwt.decoding(req.body.token).email;

        Article.findByIdAndRemove(req.body.id)
        .then(()=>{
            User.findOne({email: email})
            .then((user)=>{
                let article_index = user.articles.indexOf(req.body.id)
                user.articles = user.articles.slice(article_index, 1)
                user.save()
                .populate('articles')
                .then((user)=>{
                    res.status(200).json({
                        message: 'success delete article',
                        article: user.articles
                    })
                })
            })            
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    }
}