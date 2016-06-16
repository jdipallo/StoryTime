var mic, recorder, soundFile;

/* this is for the p5 library - at the moment is is calling this function
/* in the global namespace and is calling setup() on pageLoad. I will change this
/* later to be able to call the mic setup from a local function */
function setup() {
  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  // soundFile = new p5.SoundFile();
  soundFile = new p5.SoundFile();
}