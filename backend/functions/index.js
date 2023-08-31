const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  // for background triggers you must return a value/promise
  return admin
    .firestore()
    .collection("Users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      username: generateString(5),
      joinDate: new Date(),
      liked: [],
      comments: [],
      posts: [],
      location: "Earth",
    });
});

exports.newPost = functions.https.onCall(async (data, context) => {
  if (!context.auth || context.auth.uid != data.author.id) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only an authorized user can access this"
    );
  }

  // Create new post
  // Add post to user

  const postDate = new Date();
  const postRef = await admin.firestore().collection("Posts").add({
    authorId: data.author.id,
    authorUsername: data.author.username,
    comments: [],
    datePosted: postDate,
    likes: 0,
    textContent: data.textContent,
  });

  const updateUserRef = await admin
    .firestore()
    .collection("Users")
    .doc(data.author.id)
    .update({
      posts: admin.firestore.FieldValue.arrayUnion(postRef.id),
    });

  return {
    authorId: data.author.id,
    authorUsername: data.author.username,
    comments: [],
    datePosted: postDate,
    likes: 0,
    textContent: data.textContent,
  };
});

// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // EDIT BELOW HERE ---->

// // The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const { logger } = require("firebase-functions");
// const { onRequest } = require("firebase-functions/v2/https");
// const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// // The Firebase Admin SDK to access Firestore.
// const { initializeApp } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// initializeApp();

// // Take the text parameter passed to this HTTP endpoint and insert it into
// // Firestore under the path /messages/:documentId/original
// exports.addmessage = onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await getFirestore()
//     .collection("messages")
//     .add({ original: original });
//   // Send back a message that we've successfully written the message
//   res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });

// // Listens for new messages added to /messages/:documentId/original
// // and saves an uppercased version of the message
// // to /messages/:documentId/uppercase
// exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
//   // Grab the current value of what was written to Firestore.
//   const original = event.data.data().original;

//   // Access the parameter `{documentId}` with `event.params`
//   logger.log("Uppercasing", event.params.documentId, original);

//   const uppercase = original.toUpperCase();

//   // You must return a Promise when performing
//   // asynchronous tasks inside a function
//   // such as writing to Firestore.
//   // Setting an 'uppercase' field in Firestore document returns a Promise.
//   return event.data.ref.set({ uppercase }, { merge: true });
// });

// exports.createNewUser = functions.auth.user().onCreate((user) => {
//   const db = getFirestore();
//   return db.collection("Users").doc(user.uuid).set({
//     myfield: "123",
//   });
// });
