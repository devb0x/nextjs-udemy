import { MongoClient } from "mongodb"

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const client = await MongoClient.connect("mongodb+srv://react:jYxFZqNUoX95qsyN@cluster0.oye83bg.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const result = await meetupsCollection.insertOne(data)

    console.log(result)

    await client.close()

    res.status(201).json({ message: 'Meetup inserted!' })
  }
}

export default handler