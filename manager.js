const file = require("fs")
const user_db = "chats.json"


const read_data = async () => {
    const data = file.readFileSync(user_db, "utf8")
    return JSON.parse(data)
}

const write_data = async (data) => {
    try {
        file.writeFileSync(user_db, data)
        return "complete"
    } catch (error) {
        return null
    }
}

const save_chat = async (chat) => {
    const { group_id, sent, stamp, content } = chat

    let data = await read_data()

    if (data.hasOwnProperty(group_id)) {
        data[group_id].push({
            sent: sent,
            stamp: stamp,
            message: content
        })
    } else {
        data[group_id] = [{
            sent: sent,
            stamp: stamp,
            message: content
        }]
    }

    data = JSON.stringify(data)

    const result = await write_data(data)

    return result ? "200" : "400"
}

const get_chat = async (group_id) => {
    const data = await read_data()

    if (data.hasOwnProperty(group_id)) {
        return data[group_id]
    }

    return "400"
}

exports.save_chat = save_chat
exports.get_chat = get_chat