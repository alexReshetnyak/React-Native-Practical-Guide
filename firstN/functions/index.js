const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');

const googleCloudConfig = {
  projectId: 'react-native-first-app-37e81',
  keyFileName: 'firebase-adminsdk.json'
};
const googleCloudStorage = require('@google-cloud/storage')(googleCloudConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = JSON.parse(request.body);
    fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
      console.log(err);
      return response.status(500).json({ error: err });
    });

    const bucket = 
  });

  response.send("Hello from Firebase!");
});
