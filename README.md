## Installation
Clone project and do following:

```
yarn
```
After you have installed dependcies, follow instructions:

https://facebook.github.io/react-native/docs/getting-started.html (Build Projects with Native Code)

### PLugins to install (VSCode)

- Flow Language Support
- vscode-flow-ide
- Note: You should set workspace preference to disable default syntax validation from Visual Studio Code: `"javascript.validate.enable": false`.

## Running app

### ios
```
react-native run-ios
```
### android
```
react-native run-android
```
## Testing

We use Jest runner for unit tests, and Detox with Jest runner for E2E mobile testing.

### Jest
```
yarn test:unit
```
For updating snapshots:
```
yarn test:unit:update
```
### Detox

For running E2E tests on Android you will need to have installed Android Studio and Android Virtiaul Device - Nexus 5X API 25.

#### Running debug tests

#### iOS
```
yarn test:ios:debug
```
#### Android
```
yarn test:android:debug
```

#### Running release tests

#### iOS
```
yarn test:ios:release
```
#### Android
```
yarn test:android:release
```

## Systems

Information about our systems.

### Staging
* Backend:
  * URL: https://staging.ohmygreen.com/api
* Mobile:
  * Deploys[branch]: develop
  * Distribution: HockeyApp staging

### Production
* Backend:
  * URL: https://production.ohmygreen.com/api (you can find it in bitrise in ENV VARS)
* Mobile:
  * Deploys[branch]: master (or which branch you choose in bitrise)
  * Distribution: HockeyApp production

# Deployment and versioning

## Deployment

The deployment is done in two steps:

1. Tag the commit (for example if you use SourceTree - it is easy to do that there) which you want to deploy

![tag in sourcetree](https://github.com/ohmygreen/nintendo-app/blob/develop/documentation/tag.PNG?raw=true)

2. Select tag (in Bitrise), which you pushed in the previous step

![selecting tag in bitrise](https://github.com/ohmygreen/nintendo-app/blob/develop/documentation/bitrise.PNG?raw=true)

NOTE: For the iOS and Android Bitrise will set version of app regarding the tag.

## CodePush Deployment

### Staging

#### Staging iOS

```
code-push release-react Oh-My-Green/Nintendo-App-iOS ios -p "./ios/nintendoapp/Info.plist" --targetBinaryVersion "*" --deploymentName Staging --mandatory true --description "Staging iOS update with new bundle"
```

#### Staging Android

```
code-push release-react Oh-My-Green/Nintendo-App-Android android --targetBinaryVersion "*" --deploymentName Staging --mandatory true --description "Staging Android update with new bundle"
```

### Production

CodePush deployment is done automatically on production when you do deploy-production build in Bitrise.