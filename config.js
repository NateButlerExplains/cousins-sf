// Cousins Trip settings. Fill these in to switch features on; empty means "not connected yet".
window.TRIP_CONFIG = {
  // Form 1, "Who's in?" (private). From its pre-filled link.
  rsvp: { action: '', nameEntry: '', answerEntry: '' },
  // Form 2, "Vote" (anonymous). From its pre-filled link.
  vote: { action: '', cruiseEntry: '', dinnerEntry: '' },
  // Published CSV link of the Vote form's response sheet (for live results).
  voteCsv: '',
  // YouTube Music playlist link.
  playlistUrl: '',
  // Google Photos shared album link, for after the trip.
  photosUrl: '',
  // Passcode gate. Leave empty to turn the gate off. This is a hash of the word, not the word itself.
  passcodeHash: '30ntcz'
};
