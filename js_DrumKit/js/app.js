// Play sound
function playingSound(e) {
  // Select audio element with a data-key attribute equal to event keycode
  const audio = document.querySelector(`audio[data-key = "${e.keyCode}"]`);

  //   Select the key element
  const key = document.querySelector(`.key[data-key = "${e.keyCode}"]`);

  //   If there is no audio element attached stop the function from running
  if (!audio) return;

  //   rewind to start
  audio.currentTime = 0;

  audio.play();

  key.classList.add('playing');
}

function removeTransition(e) {
  // Skip if it is not a transform
  if (e.propertyName !== 'transform') return;

  // Remove class 'playing' to the key element
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
// Listen for a transitionened event on each key

keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);
});

// Listening on the window for event listener
window.addEventListener('keydown', playingSound);
