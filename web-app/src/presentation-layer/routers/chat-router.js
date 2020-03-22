const express = require('express')
const router = express.Router()
const csurf = require('csurf')
const csrfProtection = csurf()
const authHelper = require('../../util/auth-helper')

const container = require('../../main')
const chatManager = container.resolve('chatManager')

router.get('/chats', authHelper.isAuthenticated, (request, response) => {

    chatManager.getAllChatsByUser(request.session.user.id)
        .then(chats => {
            const model = {
                chats: chats,
            }

            response.render("chat/chats.hbs", model)
        })
        .catch(error => {
            console.log(error)
        })
})

router.route('/chat/:id')
    .all(authHelper.isAuthenticated)
    .get(csrfProtection, (request, response, next) => {

        chatManager.getAllMessagesByChat(request.session.user.id, request.params.id)
            .then(result => {
                const model = {
                    messages: result[0],
                    chats: result[1],
                    csrfToken: request.csrfToken()
                }

                response.render("chat/chat-messages.hbs", model)
            })
            .catch(error => {
                console.log(error)
            })
    })
    .post(csrfProtection, (request, response, next) => {

        chatManager.sendMessage(request.session.user.id, parseInt(request.params.id), request.body.message)
            .then(() => {
                response.redirect('/dashboard/chat/' + request.params.id)
            })
            .catch(error => {
                console.log(error)
            })
    })


router.route('/chat/send/:receiver_id')
    .all(authHelper.isAuthenticated)
    .get(csrfProtection, (request, response, next) => {
        response.render("chat/send-chat-messages.hbs", {csrfToken: request.csrfToken()})
    })
    .post(csrfProtection, (request, response, next) => {

        chatManager.sendMessage(request.session.user.id, request.params.receiver_id, request.body.message)
            .then(() => {
                response.redirect('/dashboard/chat/' + request.params.receiver_id)
            })
            .catch(error => {
                console.log(error)
            })
    })

module.exports = router