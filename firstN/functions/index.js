// * firebase deploy - ro ship code to remote firebase server

const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");
const { Storage } = require("@google-cloud/storage");

const googleCloudConfig = {
  projectId: "react-native-first-app-37e81",
  keyFileName: "firebase-adminsdk.json"
};
const googleCloudStorage = new Storage(googleCloudConfig);
admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-adminsdk.json'))
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    console.log('REQUEST:', request);
    
    if (
      !request.headers.authorization || 
      !request.headers.authorization.startsWith('Bearer ')
    ) {
      console.log('No token present');
      return response.status(403).json({ error: 'Unauthorized', success: false });
    }

    const idToken = request.headers.authorization.split('Bearer ')[1];
    admin.auth().verifyIdToken(idToken)
      .then(decodedToken => {
        const body = JSON.parse(request.body);

        fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
          console.log(err);
          return response.status(500).json({ success: false, error: err });
        });
    
        const bucket = googleCloudStorage.bucket(googleCloudConfig.projectId + '.appspot.com');
        const uuid = UUID();

        console.log('Start upload image to bucket');
        
        bucket.upload(
          "/tmp/uploaded-image.jpg",
          {
            uploadType: "media",
            destination: "places" + uuid + ".jpg",
            metadata: {
              metadata: {
                contentType: "image/jpg",
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          (err, file) => {
            if (!err) {
              console.log('Image uploaded');
              response.status(201).json({
                success: true,
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/" +
                  bucket.name +
                  "/o/" +
                  encodeURIComponent(file.name) +
                  "?alt=media&token=" +
                  uuid
              });
            } else {
              console.log(err);
              response.status(500).json({ error: err });
            }
          }
        );
        return;
      })
      .catch(err => {
        console.log('Token is invalid ' + err);
        response.status(403).json({ error: 'Unauthorized' }); 
      });
    return null;
  });
});
