
const getDate = () => {
    let currentDate = new Date()
    return currentDate.toLocaleDateString() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
}


module.exports = getDate
