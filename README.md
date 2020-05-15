# atomizer

![preview](https://github.com/dallinw/atomizer/raw/master/assets/darktheme.gif)

atomizer is a fully featured synthesizer and sequencer. design a single measure node, and give it effects, filters, envelope, and automation. you can then link it into the network to define where it will play in the sequence, and copy it infinitely with as many variations as you need.

## feature highlights

### responsive view
![responsive](https://github.com/dallinw/atomizer/raw/master/assets/responsive.png)

on desktop, view the entire network while you create or edit nodes. on mobile, flip between screens easily.

### add notes
![notes](https://github.com/dallinw/atomizer/raw/master/assets/player.gif)

define the notes for your node. if the node is playing, the active note will be highlighted.

### design your node
![design](https://github.com/dallinw/atomizer/raw/master/assets/node_designer.png)

adjust tons of synth parameters to your liking.

### automation
![q](https://github.com/dallinw/atomizer/raw/master/assets/q_automation.png)
![volume](https://github.com/dallinw/atomizer/raw/master/assets/volume_automation.png)

use interactive graphs to automate parameters and change their values across the measure.

### clone
![clone](https://github.com/dallinw/atomizer/raw/master/assets/copy.png)

once you've created a node, you can mutate it infinitely by copying its contents into another node.

### edit the network
![edit](https://github.com/dallinw/atomizer/raw/master/assets/edit.png)

use the toolbar to select different edit modes, load and save your network, and adjust the view. the network operates on a simple algorithm: unconnected nodes will be played on every measure, chained nodes will be iterated across as measures pass.

### effects
![effects](https://github.com/dallinw/atomizer/raw/master/assets/effects_panel.png)

coming soon!

# let's make some music!


## full feature list
### player
  * play, pause, stop
  * variable tempo
  * master volume
  * key
  * disposition (major, minor, chromatic)
  * mute / solo selected nodes
  * drag and drop to reposition

### nodes
  * select element
  * copy from existing element
  * pitch
    * grid to define notes to play
    * snap to mode
    * variable base rhythm (sixteenth note to whole note)
    * select octave
    * clear notes
  * automation
    * automate any of the following: volume, pan, high pass filter frequency, high pass filter Q, low pass filter frequency, low pass filter Q
    * intuitively double click and drag to add and edit automation graph
  * volume
  * pan
  * waveforms
    * select from any of: sine, triangle, sawtooth, square
  * ADSR envelope (2 seconds max)
  * high pass filter
    * frequency
    * q
  * low pass filter
    * frequency
    * q

## editor
  * file
    * save network
    * save as
    * load network
    * create new network
    * delete network
  * edit 
    * add node
    * select all
    * delete selected
    * edit edge
  * mode
    * pointer
    * multiselect
    * add edge
  * view
    * organize
    * fit
  * drag and drop to reposition
  
### settings
  * enable/disable hotkeys
  * light and dark theme
  * restore defaults

### account
  * sign up
  * log in
  * reset password
  * delete account

### effects
  * not yet implemented :-)
  
### more to come...

# boilerplate

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
