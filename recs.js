/* Recommendations: ideas that didn't make the main schedule.
   Add more by adding items to a section, or a whole new section. "where" adds a "Take me there" link.
   "img" is a direct photo link; "wiki" pulls the lead photo from that Wikipedia article (e.g. 'Lombard_Street_(San_Francisco)').
   Family members can also add picks (and photos) from the + button on each sub-page; those live in the trackers sheet. */
window.TRIP_RECS = [
  {
    id: 'places', tab: 'Places', title: 'Places to see', icon: '\u{1F5FA}️',
    lead: 'Worth a stop if you have free time.',
    items: [
      { img: 'img/recs/lombard-street.jpg', title: 'Lombard Street', text: 'The famous zigzag block of flowers and hairpin turns. Walk down it or watch the cars wind through.', where: 'Lombard Street, San Francisco, CA' },
      { img: 'img/recs/ocean-beach.jpg', title: 'Ocean Beach', text: 'Wide open beach on the Pacific side. Photos, a slow walk, or family games in the sand.', where: 'Ocean Beach, San Francisco, CA' },
      { img: 'img/recs/union-square.jpg', title: 'Union Square', text: 'Shopping, coffee and treats in the middle of downtown.', where: 'Union Square, San Francisco, CA' },
      { img: 'img/recs/chinatown-shops.jpg', title: 'Chinatown shops', text: 'Fortune cookies, little shops and lots of photo spots along Grant Avenue.', where: 'Grant Ave, Chinatown, San Francisco, CA' },
      { img: 'img/recs/fishermans-wharf-shops.jpg', title: 'Fisherman’s Wharf shops', text: 'Walk the waterfront, browse the shops and grab a snack.', where: 'Fisherman’s Wharf, San Francisco, CA' },
      { img: 'img/recs/cable-car-turnaround.jpg', title: 'Cable car turnaround', text: 'Watch the crew turn the cable cars by hand at Powell & Market, where the Powell–Hyde line starts.', where: 'Powell St & Market St, San Francisco, CA' }
    ]
  },
  {
    id: 'photos', tab: 'Photo shots', title: 'Photo shots', icon: '\u{1F4F8}',
    lead: 'The pictures we don’t want to miss.',
    items: [
      { title: 'We made it!', text: 'First family picture at the house the night we arrive.' },
      { img: 'img/recs/golden-gate-viewpoints.jpg', title: 'Golden Gate viewpoints', text: 'Group photos and bridge shots with the bay behind us.', where: 'Golden Gate Bridge Welcome Center, San Francisco, CA' },
      { img: 'img/recs/waterfront-at-wharf.jpg', title: 'Waterfront at the wharf', text: 'Pier 39, the sea lions and the bay.', where: 'Pier 39, San Francisco, CA' },
      { title: 'Dressed up, before the cruise', text: 'The official family picture, everyone in their cruise-night best, before we head out.' },
      { img: 'img/recs/golden-gate-from-boat.jpg', title: 'Golden Gate from the boat', text: 'The bridge as the backdrop during the dinner cruise.' },
      { img: 'img/recs/skyline-after-sunset.jpg', title: 'Skyline after sunset', text: 'City lights from the water once the sun goes down.' },
      { title: 'Last family picture', text: 'One more all together on Sunday morning before we head home.' }
    ]
  },
  {
    id: 'food', tab: 'Food', title: 'Food & treats', icon: '\u{1F355}',
    lead: 'Easy wins for a big group.',
    items: [
      { img: 'img/recs/pizza-and-wings-night.jpg', title: 'Pizza & wings night', text: 'Keep the first night easy: pizza, wings, salad and dessert at the house. Square Pie Guys is a fun SF pick, or local Daly City takeout.', where: 'Square Pie Guys, San Francisco, CA' },
      { img: 'img/recs/big-breakfast-at-the-house.jpg', title: 'Big breakfast at the house', text: 'Eggs, bacon or sausage, pancakes or waffles, fruit, coffee and juice.' },
      { img: 'img/recs/dessert-and-family-time.jpg', title: 'Dessert & family time', text: 'A sweet wind-down at the house after a long day.' }
    ]
  },
  {
    id: 'games', tab: 'Game night', title: 'Game night', icon: '\u{1F3B2}',
    lead: 'For a night in at the house.',
    items: [
      { img: 'img/recs/family-feud.jpg', title: 'Family Feud, family edition', text: 'Our own questions about us.' },
      { img: 'img/recs/spades.jpg', title: 'Spades', text: 'Partners, trash talk, the usual.' },
      { img: 'img/recs/uno.jpg', title: 'Uno', text: 'Easy for every age.' },
      { img: 'img/recs/dominoes.jpg', title: 'Dominoes', text: 'Slap them down.' },
      { img: 'img/recs/taboo.jpg', title: 'Taboo', text: 'Fast and loud.' },
      { img: 'img/recs/grab-the-mic.jpg', title: 'Grab the Mic', text: 'Music game night: the song plays, grab the mic and finish the lyric before anyone else.' },
      { img: 'img/recs/music-trivia.jpg', title: 'Music trivia', text: 'Name that song.' },
      { img: 'img/recs/family-trivia.jpg', title: 'Family trivia', text: 'Who knows the family best?' },
      { img: 'img/recs/kids-vs-adults.jpg', title: 'Kids vs. adults', text: 'Pick any game and split the room.' }
    ]
  },
  {
    id: 'style', tab: 'Cruise style', title: 'Cruise night style', icon: '✨',
    lead: 'The night everybody dresses up.',
    items: [
      { img: 'img/recs/ladies.jpg', title: 'Ladies', text: 'Dresses, jumpsuits or dressy pants.' },
      { img: 'img/recs/gents.jpg', title: 'Gents', text: 'Slacks, polos or button-downs.' },
      { img: 'img/recs/the-finishing-touch.jpg', title: 'The finishing touch', text: 'Gold accessories encouraged.' },
      { img: 'img/recs/bring-a-layer.jpg', title: 'Bring a layer', text: 'The bay gets chilly after sunset.' }
    ]
  },
  {
    id: 'tips', tab: 'Good to know', title: 'Good to know', icon: '\u{1F4A1}',
    lead: 'Little things that make the day smoother.',
    items: [
      { img: 'img/recs/cable-car-fares.jpg', title: 'Cable car fares', text: 'Lines get long in summer. Buy fares ahead in the MuniMobile app or with a Clipper card.' },
      { img: 'img/recs/bart-into-the-city.jpg', title: 'BART into the city', text: 'The house is close to BART, which can be easier than several cars for a city day.' },
      { img: 'img/recs/alcatraz.jpg', title: 'Alcatraz, if you really want it', text: 'Plan 2½–3 hours and book early, since summer tickets sell out. We’ll see it from the cruise either way.' }
    ]
  }
];
