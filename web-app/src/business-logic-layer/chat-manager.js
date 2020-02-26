module.exports = function(container) {
    return {
        sendMessage: function(senderId, receiverId, message, callback) {

            if (senderId === '') {
                callback(false, 'senderId must be supplied')
            } else if (receiverId === '') {
                callback(false, 'receiverId must be supplied')
            } else if (message === '') {
                callback(false, 'message must be supplied')
            } else {
        
                const chat = { senderId, content: message, receiverId }

                console.log(chat)
        
                container.chatRepository.create(chat).then(result => {
                    callback(true, result.id)
                }).catch(error => {
                    console.log(error)
                    callback(false, error)
                })
            }
        },
        getAllMyChats: function(userId, callback) {
            if (userId === '') {
                callback(false, 'must supplie userId')
            } else {
                container.chatRepository.getAllMyChats(userId).then(chats => {
                    //console.log(chats)
                    callback(true, chats)
                }).catch(error => {
                    console.log(error)
                    callback(false, 'db error')
                })
            }
        },
        getALlMessagesBychat: function(userId, senderId, callback) {
            if (userId === '') {
                callback(false, 'must supplie userId')
            } else if (senderId === '') {
                callback(false, 'must supplie senderId')
            } else {
                container.chatRepository.getAllMyMessagesByChat(userId, senderId).then(messages => {
                    callback(true, messages)
                }).catch(error => {
                    console.log('johan error')
                    console.log(error)
                    callback(false, 'error db')
                })
            }
        },
        getMyReceivedMessages: function(userId, callback) {

            if (userId === '') {
                callback(false, 'must supplie userId')
            } else {
                container.chatRepository.getAllByReceiverId(userId).then(messages => {
                    callback(true, messages)
                }).catch(error => {
                    console.log(error)
                    callback(false, 'db error')
                })
            }
        }
    }
}