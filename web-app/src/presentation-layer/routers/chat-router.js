const express = require('express')
const router = express.Router()
const csurf = require('csurf')
const csrfProtection = csurf()
const authHelper = require('../../util/auth-helper')

const container = require('../../main')
const chatManager = container.resolve('chatManager')

router.get('/chats', authHelper.isAuthenticated, function(request, response) {
    chatManager.getMyReceivedMessages(request.session.user.id, function(status, messagesOrError) {
        if (status) {
            console.log(messagesOrError)
            var model = {
                Chats: messagesOrError,
            }
    
            response.render("chat/chat-messages.hbs", model)
        } else {
            response.send('error')
        }
    })
})

router.route('/chat/:receiver_id')
    .all(authHelper.isAuthenticated)
    .get(csrfProtection, function(request, response, next) {
        response.render("chat/send-chat-messages.hbs", {csrfToken: request.csrfToken()})
    })
    .post(csrfProtection, function(request, response, next) {
        chatManager.sendMessage(request.session.user.id, parseInt(request.params.receiver_id), request.body.message, function(status, errorOrId) {
            if (status) {
                response.send('yes' + errorOrId)
            } else {
                response.send('no ' + errorOrId)
            }
        })
    })

module.exports = router