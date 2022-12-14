#!/usr/bin/env bash -e
# idea borrowed from https://medium.com/@andr3wjack/versioning-react-native-apps-407469707661
# (obvs has a few modifications for our workflow)

PROJECT_DIR="./ios/nintendoapp"
INFOPLIST_FILE="Info.plist"
INFOPLIST_DIR="${PROJECT_DIR}/${INFOPLIST_FILE}"

PACKAGE_VERSION=$(
  cat package.json | 
  grep version | 
  head -1 | 
  awk -F: '{ print $2 }' | 
  sed 's/[\",]//g' | 
  tr -d '[[:space:]]'
)



BUILD_NUMBER=$(/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "${INFOPLIST_DIR}")
BUILD_NUMBER=$(($BUILD_NUMBER + 1))



PARSED_VERSION=$(echo $PACKAGE_VERSION | perl -ne 'print "$1.$2" if /([0-9]+)\.([0-9]+)\.([0-9])*$/g')

APP_DISPLAY_NAME="RA ${PARSED_VERSION}"


# Update plist with new values
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${PACKAGE_VERSION#*v}" "${INFOPLIST_DIR}"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $BUILD_NUMBER" "${INFOPLIST_DIR}"
/usr/libexec/PlistBuddy -c "Set :CFBundleName ${APP_DISPLAY_NAME}" "${INFOPLIST_DIR}"

git add "${INFOPLIST_DIR}"