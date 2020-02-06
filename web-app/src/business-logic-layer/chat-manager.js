const chatRepository = require('../data-access-layer-SQL/chat-repository')

exports.sendMessage = function(sendId, reciveId, message, callback){

    if (sendId === '') {
        callback(false, 'sendId must be supplied')
    } else if (reciveId === '') {
        callback(false, 'reciveId must be supplied')
    } else if (message === '') {
        callback(false, 'message must be supplied')
    } else {
        chatRepository.sendMessage(sendId, reciveId, message, function(error, id) {
            if (error === null) {
                callback(true, null)
            } else {
                callback(false, 'db error')
            }
        })
    }

}