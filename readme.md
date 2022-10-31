# Game Timer

## Publish

```zsh
  npx eas-cli@latest build:configure
  npx eas-cli@latest build --platform=ios
  npx eas-cli@latest submit
```

## Debugging production build

```zsh
  expo build:ios --release-channel prod -t simulator

  🚨 If the build is not installable on your simulator because of "... is damaged and can't be opened.", please run:
xattr -rd com.apple.quarantine /path/to/your.app
```
