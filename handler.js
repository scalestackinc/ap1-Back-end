"use strict";

const connectToDatabase = require('./db');
function HTTPError (statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports.healthCheck = async (event) => {
  await connectToDatabase;
  console.log('Connection successful.');
  return {
    statusCode: 200,
    body: JSON.stringify({ mesqsage: 'Connection successful.' })
  };
}

// module.exports.create = async (event) => {
//   try {
//     const { Note } = await connectToDatabase()
//     const note = await Note.create(JSON.parse(event.body))
//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*"
//       },
//       body: JSON.stringify(note)
//     }
//   } catch (err) {
//     return {
//       statusCode: err.statusCode || 500,
//       headers: { 'Content-Type': 'text/plain' },
//       body: 'Note Created and inserted to database.'
//     }
//   }
// }

// module.exports.getOne = async (event) => {
//   try {
//     const { Note } = await connectToDatabase()
//     const note = await Note.findById(event.pathParameters.id)
//     if (!note) throw new HTTPError(404, `Note with id: ${event.pathParameters.id} was not found`)
//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*"
//       },
//       body: JSON.stringify(note)
//     }
//   } catch (err) {
//     return {
//       statusCode: err.statusCode || 500,
//       headers: { 'Content-Type': 'text/plain' },
//       body: err.message || 'Could not fetch the Note.'
//     }
//   }
// }

// module.exports.getAll = async () => {
//   try {
//     const { Note } = await connectToDatabase()
//     const notes = await Note.findAll()
//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*"
//       },
//       body: JSON.stringify(notes)
//     }
//   } catch (err) {
//     return {
//       statusCode: err.statusCode || 500,
//       headers: { 'Content-Type': 'text/plain' },
//       body: 'Could not fetch the notes.'
//     }
//   }
// }

// module.exports.update = async (event) => {
//   try {
//     const input = JSON.parse(event.body)
//     const { Note } = await connectToDatabase()
//     const note = await Note.findById(event.pathParameters.id)
//     if (!note) throw new HTTPError(404, `Note with id: ${event.pathParameters.id} was not found`)
//     if (input.title) note.title = input.title
//     if (input.description) note.description = input.description
//     await note.save()
//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*"
//       },
//       body: JSON.stringify(note)
//     }
//   } catch (err) {
//     return {
//       statusCode: err.statusCode || 500,
//       headers: { 'Content-Type': 'text/plain' },
//       body: err.message || 'Could not update the Note.'
//     }
//   }
// }

// module.exports.destroy = async (event) => {
//   try {
//     const { Note } = await connectToDatabase()
//     const note = await Note.findById(event.pathParameters.id)
//     if (!note) throw new HTTPError(404,
//     await note.destroy()
//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*"
//       },
//       body: JSON.stringify(note)
//     }
//   } catch (err) {
//     return {
//       statusCode: err.statusCode || 500,
//       headers: { 'Content-Type': 'text/plain' },
//       body: err.message || 'Could destroy fetch the Note.'
//     }
//   }
// }
