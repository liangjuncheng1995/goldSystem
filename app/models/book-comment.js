const util = require('util')
const axios  = require('axios')
const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op} = require('sequelize')

class Comment extends Model {
    // constructor() {
    //     super()
    // }
    static async addComment(bookID, content) {
        
        const comment = await Comment.findOne({
            where : {
                book_id: bookID,
                content
            }
        })
        if(!comment) {
            return await Comment.create({
                book_id: bookID,
                content,
                nums: 1
            })
        } else {
            return await comment.increment('nums', {
                by: 1
            })
        }
    }

    static async getComments(bookID) {
        const comments = await Comment.findAll({
            where: {
                book_id: bookID
            }
        })
        return comments
    }

    toJSON() {
        // this.dataValues
        // console.log(this.dataValues)
        return {
            content: this.getDataValue('content'),
            nums: this.getDataValue('nums')
        }
    }
}

// Comment.prototype.exclude = ['book_id','id']


Comment.init({
    content: Sequelize.STRING(12),
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    book_id: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'comment'
})

module.exports = {
    Comment
}