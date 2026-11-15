// Cousins Trip settings. Fill these in to switch features on; empty means "not connected yet".
window.TRIP_CONFIG = {
  // Form 1, "Who's in?" (private). From its pre-filled link.
  rsvp: { action: 'https://docs.google.com/forms/d/e/1FAIpQLSdjyIXNtrPLK198ZCBKxmIEmjDE1WFXRQiWbw2CBrZxNyNi0g/formResponse', nameEntry: 'entry.504245730', answerEntry: 'entry.175341530' },
  // Form 2, "Vote" (anonymous). From its pre-filled link.
  vote: { action: 'https://docs.google.com/forms/d/e/1FAIpQLSfO0YpNmuv91-GDAFWZZMMWWsQI_Q-UIQZCu4IP37N4IRrzKw/formResponse', cruiseEntry: 'entry.1167462199', dinnerEntry: 'entry.356278943' },
  // Published CSV link of the Vote form's response sheet (for live results).
  voteCsv: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ56-b6bSvNMjGKDfEfGOuudO_fY9DyCHWumt6JIpsJ0DZL3RVcBo1LpMjYyKbWPYeNjRVKcUVxLZpw/pub?gid=749772490&single=true&output=csv',
  // YouTube Music playlist link.
  playlistUrl: 'https://youtu.be/sIQMnh5teuI?si=zaOkGLneMNseAWnn',
  // Google Photos shared album link, for after the trip.
  photosUrl: 'https://photos.app.goo.gl/uXtkppLQwA47Uo4u7',
  // Flights form ("Cousins Trip: Flights"). From its pre-filled link + the published CSV of its sheet.
  flights: {
    action: 'https://docs.google.com/forms/d/e/1FAIpQLSd6FyEjCNbDOplu_ybVNHx9Z8yzEHz80H2pDdZuGPBp76CsBw/formResponse',
    entries: { name: 'entry.1733835951', arrAirport: 'entry.1905659587', arrDate: 'entry.1670464706', arrTime: 'entry.265497829', arrFlight: 'entry.306724696',
               depAirport: 'entry.342429616', depDate: 'entry.2092554577', depTime: 'entry.1098740039', depFlight: 'entry.991840690' },
    csv: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_DQ6Cl0nIQNLyGzeZ6vG2lggeYGpCKgpbtYxm4rurN7ehvtZb8owOH99HXgUKRxxSkHUAC74CmMOL/pub?gid=1504606241&single=true&output=csv'
  },
  // CARTO basemap key for the map page (CARTO keys are meant to be used in the browser).
  cartoKey: 'cb1_5980_1_5f1902b93a960f2bc86759a5',
  // Passcode gate. Leave empty to turn the gate off. This is a hash of the word, not the word itself.
  passcodeHash: '30ntcz'
};
