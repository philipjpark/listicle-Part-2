import { pool } from '../config/database.js'
import '../config/dotenv.js'
import playerData from '../data/players.js'

const createPlayersTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS players;

        CREATE TABLE IF NOT EXISTS players (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            height VARCHAR(10) NOT NULL,
            weight VARCHAR(10) NOT NULL,
            position VARCHAR(255) NOT NULL,
            club VARCHAR(255) NOT NULL,
            confederation VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            submittedBy VARCHAR(255) NOT NULL,
            submittedOn TIMESTAMP NOT NULL
        )
    `

//     try {
//         const res = await pool.query(createTableQuery)
//         console.log('🎉 players table created successfully')
//     } catch (err) {
//         console.error('⚠️ error creating players table', err)
//     }
// }

try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 players table created successfully')
} catch (err) {
    console.error('⚠️ error creating players table', err)
}
}

const seedPlayersTable = async () => {
    await createPlayersTable()

    playerData.forEach((player) => {
        const insertQuery = {
            text: 'INSERT INTO players (name, height, weight, position, club, confederation, image, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
        }

        const values = [
            player.name,
            player.height,
            player.weight,
            player.position,
            player.club,
            player.confederation,
            player.image,
            player.submittedBy,
            player.submittedOn
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting player', err)
                return
            }

            console.log(`✅ ${player.name} added successfully`)
        })
    })
}

seedPlayersTable()
