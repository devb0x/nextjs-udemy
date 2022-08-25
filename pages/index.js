import React, {Fragment} from "react"
import Head from "next/head"
import { MongoClient } from "mongodb"

import MeetupList from "../components/meetups/MeetupList"

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'a first meetup',
//     image: 'https://gratisography.com/wp-content/uploads/2022/05/gratisography-heavenly-free-stock-photo-1170x775.jpg',
//     address: 'Some address 5, 1234 Some City',
//     description: 'This is a random meetup'
//   },
//   {
//     id: 'm2',
//     title: 'a second meetup',
//     image: 'https://gratisography.com/wp-content/uploads/2022/05/gratisography-heavenly-free-stock-photo-1170x775.jpg',
//     address: 'Some address 5, 1234 Some City',
//     description: 'This is a random meetup'
//   },
//   {
//     id: 'm3',
//     title: 'a third meetup',
//     image: 'https://gratisography.com/wp-content/uploads/2022/05/gratisography-heavenly-free-stock-photo-1170x775.jpg',
//     address: 'Some address 5, 1234 Some City',
//     description: 'This is a random meetup'
//   }
// ]

function Homepage(props) {

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

// export async function getServerSideProps(context) {
//   // Code here always run on server on every request, not on client side
//
//   const req = context.req
//   const res = context.res
//
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  // fetch data from an API
  // Code here will not be run on client side

  const client = await MongoClient.connect("mongodb+srv://react:jYxFZqNUoX95qsyN@cluster0.oye83bg.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find().toArray()

  await client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  }
}

export default Homepage