# futuparty

Event app with a picture feed from users, authentication with invitation codes, info about event and profiles.

## Prerequisites

**Node**: v11.4.0

### iOS with XCode

1. `yarn install`
2. `yarn start`
3. Add `/your-project-folder/ios/` to Xcode
4. <kbd>▶ Run & build</kbd>, app should start on simulator / device

### Android Studio

If you don't have Android Studio, you can get it from [android.com](https://developer.android.com/studio/).

1. `yarn install`
2. `yarn start`
3. Open `/your-project-folder/android/`
4. On the bottom of Android Studio, wait that it it finishes syncing, loading, etc. You might need to install something, Studio will tell you about it.

### Post-install

`user` -table has `invitation_code` you can use to login (assuming you have [set up server](https://github.com/futurice/event-app-backend/tree/futuparty18))

### Used workarounds

- https://github.com/wix/react-native-navigation/issues/4293#issuecomment-437576595

  - Build System needs to be legacy one

- app/build.gradle implementation has `implementation "com.android.support:design:${rootProject.ext.supportLibVersion}"` added to fix some error

### Environment variables

```
# App uses this key + suffix to create storage key:values
APP_STORAGE_KEY=futuparty

# App saves images to this folder on end-users phone
APP_IMAGES_PATH=futuparty
```

### Navigation flow

Please visit `screens.js`. The chart references those containers.

```
Initial
├── SignIn
└── Feed ───────Info ───────Profile
    ├── Comment ├── Food    ├── Licenses
    └── Post    └── Program ├── Terms
                            └── Privacy
```

## Todo

- Rewrite backend
- Scrollable tab view library "react-native-scrollable-tab-view-universal" is not very popular, but "react-native-scrollable-tab-view" was broken currently on Android. Can be implemented without a library fairly simply too.
- react-native-dotenv --> dotenv
- `Info.plist` last permissions might not be needed
- `AndroidManifest.xml` android.permission.WRITE_EXTERNAL_STORAGE might not be needed
- react-native-navigation animations
- `TopBar.js` elements work properly with only one child for some reason.
