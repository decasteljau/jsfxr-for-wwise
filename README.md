# jsfxr for Wwise

****

## Overview

jsfxr is sound effect generator, which uses presets to generate randomized sounds. Generated sound can be imported directory to Wwise without the need to manually save files on hard disk.

## To Install

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/decasteljau/jsfxr-for-wwise.git
# Go into the repository
cd jsfxr-for-wwise
# Install dependencies
npm install
# Compile Typescript
tsc -p .
# Run the app
npm start
```

## Importing sounds to Wwise

jsfxr-for-wwise works with Wwise 2017.1.x and up.

First, ensure WAAPI is enabled in Wwise:
 - menu **Project/Preferences**
 - Check **Enable Wwise Authoring API**
 - Click **OK**
 - Restart Wwise

Then, open a Wwise Project. Note that every imported sound will be in the **Default Work Unit**.

To import sound to Wwise:
 - Start jsfxr
 - Generate a sound
 - Click the **Send to Wwise** button OR press **W**

Note: The first **Send to Wwise** is pressed, it can takes up to 10 seconds.

## jsfxr

The original implementation is available here:
[jsfxr on github](https://github.com/grumdrig/jsfxr)

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
