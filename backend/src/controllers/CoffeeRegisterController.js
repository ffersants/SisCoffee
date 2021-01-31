const connection = require('../database/connection')

async function normalSort() {
    allUserAndPositions = await connection('users')
        .select('name')
        .select('position')

    allUserAndPositions.forEach(async userAndPosition => {
        console.log(userAndPosition.name)
        await connection('users')
            .where('name', '=', userAndPosition.name)
            .update({ position: `${userAndPosition.position + 1}` })
    })

}

module.exports = {
    create: async function (req, res) {
        const { name, section } = req.body;

        const { position, userID } = await connection('users')
            .where('name', name)
            .where('section', section)
            .select('position')
            .select('userID')
            .first();
        console.log(position, userID)
        console.log(position)
        if (position === '1') {
            normalSort()
        }
        res.send('done')
    }
}
