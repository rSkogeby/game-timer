# Game Timer

## Get started

```zsh
  npm ci
  npm run configure
  npm start
```

## Publish

```zsh
  npm run publish
```

## Debugging production build

```zsh
  expo build:ios --release-channel prod -t simulator

  🚨 If the build is not installable on your simulator because of "... is damaged and can't be opened.", please run:
xattr -rd com.apple.quarantine /path/to/your.app
```
