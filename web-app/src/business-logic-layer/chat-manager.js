let container = null

/**
 * 
 * @param {*} senderId 
 * @param {*} receiverId 
 * @param {*} message 
 */
function sendMessage(senderId, receiverId, message) {
    return new Promise((resolve, reject) => {
        const data = { senderId, content: message, receiverId }

        container.chatRepository.create(data)
            .then(result => resolve(result.id))
            .catch(error => reject(error))
    })
}

/**
 * 
 * @param {*} userId 
 */
function getReceivedMessagesByUser(userId) {
    return new Promise((resolve, reject) => {
        container.chatRepository.getAllByReceiverId(userId)
            .then(messages => resolve(messages))
            .catch(error => reject(error))
    })
}

/**
 * 
 * @param {*} userId 
 */
function getAllChatsByUser(userId) {
    return new Promise((resolve, reject) => {
        container.chatRepository.getAllMyChats(userId)
            .then(messages => resolve(messages))
            .catch(error => reject(error))
    })
}

/**
 * 
 * @param {*} userId 
 * @param {*} senderId 
 */
function getAllMessagesByChat(userId, senderId) {
    return new Promise((resolve, reject) => {
        container.chatRepository.getAllMessagesByChat(userId, senderId)
            .then(messages => resolve(messages))
            .catch(error => reject(error))
    })
}

module.exports = function(_container) {
    container = _container
    return {
        sendMessage,
        getReceivedMessagesByUser,
        getAllChatsByUser,
        getAllMessagesByChat
    }
}