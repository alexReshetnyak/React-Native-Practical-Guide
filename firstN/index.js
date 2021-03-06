// * to reload device set live reload (ctrl + m) or press rr

// * to resolve watchers issue use:  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

// * Debug: react-devtools /// Debug JS Remotely better to use react-native-debbuger

// * NativeBase.io - cross platform UI library

// * firebase init to init cloud functions
// * cd functions npm i
// * firebase deploy - to deploy changes

// * auto link packages:
// * # install
// * yarn add react-native-webview
// * cd ios && pod install && cd .. # CocoaPods on iOS needs this extra step
// * # run
// * yarn react-native run-ios
// * yarn react-native run-android

// * Instructions how to fix google maps for android:
// * 1) Android Studio -> search SDK manager -> SDK tools -> install Google play services
// * 2) Enable your google api key
// * 3) Change user permissions to get current location in android -> src -> main -> AndroidManifest
// * 4) (RN >= 0.60) https://github.com/react-native-community/react-native-maps/pull/3106/files
// * 5) Android Studio -> search AVD manager -> create new device with different version of android (optional)

// * git-secret to safe api keys
// * 1) brew install git-secret
// * 2) gpg --full-generate-key
// * 3) git-secret init  and add key from  user/.gnupg/openpgp-revocs.d  to  ./.gitsecret/keys
// * 4) git-secret tell -m
// * 5) add hideMe.js file to .gitignore
// * 6) git secret add ./path/to/hideMe.js
// * 7) git secret hide
// * 8) git rm --cached hide.me 
// * 9) git secret reveal to restore file
// * 10) second pc: gpg --armor --export mail@gmail.com > homeKey.asc
// * 11) import this key into first pc gpg setup: gpg --import ./homeKey.asc
// * 12) add second pc to repo: git secret tell nail@gmail.com
// * 13) re-encrypt the files: git secret reveal; git secret hide -d

// * To create apk for debug follow this steps:
// * 1) run in project folder: react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
// * 2) cd android && ./gradlew clean
// * 3) ./gradlew assembleDebug


import "./App";
