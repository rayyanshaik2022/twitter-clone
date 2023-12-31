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

const splitByHashAndAt = (str) => {
  if (!str) {
    return [];
  }
  const regex = /(@\w+|#\w+)|(\S+)/g;
  return str.split(regex);
};

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  // for background triggers you must return a value/promise
  return admin
    .firestore()
    .collection("Users")
    .doc(user.uid)
    .set({
      uid: user.uid,
      displayName: user.displayName,
      username: generateString(5),
      joinDate: new Date(),
      liked: [],
      comments: [],
      posts: [],
      location: "Earth",
      photoURL: user.photoURL,
      following: [],
      followers: [],
      usernameChange: false,
    });
});

exports.newComment = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only an authorized user can access this"
    );
  }

  // data = {
  //   author: {
  //     id: "",
  //     username: ""
  //   },
  //   post: {
  //     id: "",
  //   },
  //   textContent: ""
  // }

  const commentDate = new Date();
  const commentRef = await admin.firestore().collection("Comments").add({
    authorId: context.auth.uid,
    authorUsername: data.author.username,
    datePosted: commentDate,
    postId: data.post.id,
    textContent: data.textContent,
  });

  // Add comment to post
  const updatePostRef = await admin
    .firestore()
    .collection("Posts")
    .doc(data.post.id)
    .update({
      comments: admin.firestore.FieldValue.arrayUnion(commentRef.id),
    });

  // Add comment to user
  const updateUserRef = await admin
    .firestore()
    .collection("Users")
    .doc(context.auth.uid)
    .update({
      comments: admin.firestore.FieldValue.arrayUnion(commentRef.id),
    });

  return {
    id: commentRef.id,
    authorId: context.auth.uid,
    authorUsername: data.author.username,
    datePosted: commentDate,
    textContent: data.textContent,
  };
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

  const splitText = splitByHashAndAt(data.textContent);
  for (i in splitText) {
    let word = splitText[i];
    if (word && word.startsWith("#")) {
      let docRef = await admin
        .firestore()
        .collection("Hashtags")
        .doc(word)
        .get();
      if (docRef && docRef.exists) {
        let hashRef = await admin
          .firestore()
          .collection("Hashtags")
          .doc(word)
          .update({
            hashtag: word,
            posts: admin.firestore.FieldValue.arrayUnion(postRef.id),
            postCount: admin.firestore.FieldValue.increment(1),
          });
      } else {
        let hashRef = await admin
          .firestore()
          .collection("Hashtags")
          .doc(word)
          .set({
            hashtag: word,
            posts: [postRef.id],
            postCount: 1,
          });
      }
    }
  }

  return {
    id: postRef.id,
    authorId: data.author.id,
    authorUsername: data.author.username,
    comments: [],
    datePosted: postDate,
    likes: 0,
    textContent: data.textContent,
  };
});

exports.likePost = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only an authorized user can access this"
    );
  }

  // data = {
  //   post: {id: ""},
  //   author: {id: ""}
  // }

  const userRef = await admin
    .firestore()
    .collection("Users")
    .doc(context.auth.uid)
    .get();
  const userData = userRef.data();

  // Unlike post
  if (userData.liked.includes(data.post.id)) {
    // Updated liked list for user
    const updateUserRef = await admin
      .firestore()
      .collection("Users")
      .doc(data.author.id)
      .update({
        liked: admin.firestore.FieldValue.arrayRemove(data.post.id),
      });

    // Update post like count
    const postRef = await admin
      .firestore()
      .collection("Posts")
      .doc(data.post.id)
      .update({
        likes: admin.firestore.FieldValue.increment(-1),
      });

    return { likeStatus: -1 };
  } else {
    // Like post
    // Updated liked list for user
    const updateUserRef = await admin
      .firestore()
      .collection("Users")
      .doc(data.author.id)
      .update({
        liked: admin.firestore.FieldValue.arrayUnion(data.post.id),
      });

    // Update post like count
    const postRef = await admin
      .firestore()
      .collection("Posts")
      .doc(data.post.id)
      .update({
        likes: admin.firestore.FieldValue.increment(1),
      });
    return { likeStatus: -2 };
  }
});

exports.updateProfile = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only an authorized user can access this"
    );
  }

  const userRef = await admin
    .firestore()
    .collection("Users")
    .doc(context.auth.uid)
    .get();
  const userData = userRef.data();

  const username = userData.username;
  const displayName = userData.displayName;
  const location = userData.location;
  const hasChangedUsername = userData.usernameChange;
  data.username = data.username.toLowerCase();
  let response = {};

  // data = {
  //   username: "",
  //   displayName: "",
  //   location: "",
  // }

  // Update user location
  if (
    data.location.length <= 32 &&
    data.location.length >= 1 &&
    data.location != location
  ) {
    const updateUserLocationRef = await admin
      .firestore()
      .collection("Users")
      .doc(context.auth.uid)
      .update({
        location: data.location,
      });

    response.location = true;
  }

  // Update user display name
  if (
    data.displayName.length <= 20 &&
    data.displayName.length >= 1 &&
    data.displayName != displayName
  ) {
    const updateUserDisplayNameRef = await admin
      .firestore()
      .collection("Users")
      .doc(context.auth.uid)
      .update({
        displayName: data.displayName,
      });

    response.displayName = true;
  }

  if (
    !hasChangedUsername &&
    data.username != username &&
    data.username.length >= 3 &&
    data.username.length <= 16 &&
    /^[a-zA-Z0-9]+$/.test(data.username)
  ) {
    // First check if any other user has this username
    const collectionRef = admin.firestore().collection("Users");
    const query = collectionRef.where("username", "==", data.username);
    const snapshot = await query.count().get();
    if (snapshot.data().count >= 1) {
      return {
        invalid: "This username is already in use",
      };
    }

    // Update username
    const updateUserDisplayNameRef = await admin
      .firestore()
      .collection("Users")
      .doc(context.auth.uid)
      .update({
        username: data.username,
        usernameChange: true,
      });

    // Updating username entails changing all post and comment data as well
    userData.posts.forEach(async (postId) => {
      await admin.firestore().collection("Posts").doc(postId).update({
        authorUsername: data.username,
      });
    });

    userData.comments.forEach(async (commentId) => {
      await admin.firestore().collection("Comments").doc(commentId).update({
        authorUsername: data.username,
      });
    });

    response.username = true;
  } else {
    response.invalid = "Invalid input";
  }

  return response;
});

exports.followUser = functions.https.onCall(async (data, context) => {
  // data = {
  //   user: {id: ""}
  // }

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only an authorized user can access this"
    );
  }

  if (context.auth.uid == data.user.uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "A user cannot follow themselves"
    );
  }

  const userRef = await admin
    .firestore()
    .collection("Users")
    .doc(context.auth.uid)
    .get();
  const userData = userRef.data();

  // unfollow user
  if (userData.following.includes(data.user.uid)) {
    // remove follow user
    const updateUserRef = await admin
      .firestore()
      .collection("Users")
      .doc(context.auth.uid)
      .update({
        following: admin.firestore.FieldValue.arrayRemove(data.user.uid),
      });

    // remove user as follower to followee
    const updateFolloweeRef = await admin
      .firestore()
      .collection("Users")
      .doc(data.user.uid)
      .update({
        followers: admin.firestore.FieldValue.arrayRemove(context.auth.uid),
      });
  } else {
    // follow user
    const updateUserRef = await admin
      .firestore()
      .collection("Users")
      .doc(context.auth.uid)
      .update({
        following: admin.firestore.FieldValue.arrayUnion(data.user.uid),
      });

    // Add user as follower to followee
    const updateFolloweeRef = await admin
      .firestore()
      .collection("Users")
      .doc(data.user.uid)
      .update({
        followers: admin.firestore.FieldValue.arrayUnion(context.auth.uid),
      });
  }
});
