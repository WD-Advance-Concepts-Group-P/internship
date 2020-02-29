const express = require('express')
const router = express.Router()
const csurf = require('csurf')
const csrfProtection = csurf()
const authHelper = require('../../util/auth-helper')

const container = require('../../main')
const chatManager = container.resolve('chatManager')

router.get('/chats', authHelper.isAuthenticated, function(request, response) {

    chatManager.getAllMyChats(request.session.user.id, function(status, chatsOrError) {
        if (status) {
            var model = {
                Chats: chatsOrError,
            }
            response.render("chat/chats.hbs", model)
        } else {
            response.send(chatsOrError)
        }
    })
})

router.route('/chat/:id')
    .all(authHelper.isAuthenticated)
    .get(csrfProtection, function(request, response, next) {
        chatManager.getALlMessagesBychat(request.session.user.id, request.params.id, function(status, errorOrMessages) {
            if (status) {   
                var model = {
                    MyMessages: errorOrMessages[1],
                    Chats: errorOrMessages[0],
                    csrfToken: request.csrfToken()
                }
        
                response.render("chat/chat-messages.hbs", model)
            } else {
                console.log(errorOrMessages)
                response.send('error')
            }
        })
    })
    .post(csrfProtection, function(request, response, next) {
        chatManager.sendMessage(request.session.user.id, parseInt(request.params.id), request.body.message, function(status, errorOrId) {
            if (status) {
                response.redirect('/chat/'+request.params.id)
                response.send('yes' + errorOrId)
            } else {
                response.send('no ' + errorOrId)
            }
        })
    })


router.route('/send/chat/:receiver_id')
    .all(authHelper.isAuthenticated)
    .get(csrfProtection, function(request, response, next) {
        response.render("chat/send-chat-messages.hbs", {csrfToken: request.csrfToken()})
    })
    .post(csrfProtection, function(request, response, next) {
        chatManager.sendMessage(request.session.user.id, request.params.receiver_id, request.body.message, function(status, errorOrId) {
            if (status) {
                response.redirect('/chat/'+request.params.receiver_id)
            } else {
                response.send('no ' + errorOrId)
            }
        })
    })

module.exports = router