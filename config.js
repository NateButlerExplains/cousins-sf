// Cousins Trip settings. Fill these in to switch features on; empty means "not connected yet".
window.TRIP_CONFIG = {
  // Form 1, "Who's in?" (private). From its pre-filled link.
  rsvp: { action: 'https://docs.google.com/forms/d/e/1FAIpQLSdjyIXNtrPLK198ZCBKxmIEmjDE1WFXRQiWbw2CBrZxNyNi0g/formResponse', nameEntry: 'entry.504245730', answerEntry: 'entry.175341530' },
  // Form 2, "Vote" (anonymous). From its pre-filled link.
  vote: { action: 'https://docs.google.com/forms/d/e/1FAIpQLSfO0YpNmuv91-GDAFWZZMMWWsQI_Q-UIQZCu4IP37N4IRrzKw/formResponse', cruiseEntry: 'entry.1167462199', dinnerEntry: 'entry.356278943' },
  // Published CSV link of the Vote form's response sheet (for live results).
  voteCsv: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ56-b6bSvNMjGKDfEfGOuudO_fY9DyCHWumt6JIpsJ0DZL3RVcBo1LpMjYyKbWPYeNjRVKcUVxLZpw/pub?gid=749772490&single=true&output=csv',
  // YouTube Music playlist link.
  playlistUrl: '',
  // Google Photos shared album link, for after the trip.
  photosUrl: '',
  // Passcode gate. Leave empty to turn the gate off. This is a hash of the word, not the word itself.
  passcodeHash: '30ntcz'
};
