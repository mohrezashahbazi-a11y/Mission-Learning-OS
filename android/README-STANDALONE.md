# Standalone Android build

This build is intended to package the Mission Learning OS web application locally inside Android so the installed APK does not depend on GitHub Pages at runtime.

The app should load the bundled application assets from the APK, while network access is used only for features that explicitly require it (such as Google Drive sync).

## Build

Use the Android Gradle project in this directory and assemble a release APK.
