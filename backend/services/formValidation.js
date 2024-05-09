const noEmptyFields = (data) => {
    for (let field in data) {
        if (data[field].trim() === "") {
            return false
        }
    }
    return true
}

module.exports = { noEmptyFields }