const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");
const { Storage } = require("@google-cloud/storage");

const googleCloudConfig = {
  projectId: "react-native-first-app-37e81",
  keyFileName: "firebase-adminsdk.json"
};
const googleCloudStorage = new Storage(googleCloudConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = JSON.parse(request.body);

    fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
      console.log(err);
      return response.status(500).json({ error: err });
    });

    // const bucket = googleCloudStorage.bucket(googleCloudConfig.projectId + '.appspot.com');
    const bucket = googleCloudStorage.bucket('gs://react-native-first-app-37e81.appspot.com/');
    const uuid = UUID();

    console.log('Bucket not exist error check:', bucket);
    
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
        console.log('Log 5');
        console.log('File', file);
        console.log('Bucket name', bucket.name);
        console.log('uuid', uuid);

        console.log('IMAGE:', fs.readFileSync("/tmp/uploaded-image.jpg"));
        
        if (!err) {
          response.status(201).json({
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
  });
});
