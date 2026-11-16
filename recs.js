/* Recommendations: ideas that didn't make the main schedule.
   Add more by adding items to a section, or a whole new section. "where" adds a "Take me there" link.
   "img" is a direct photo link; "wiki" pulls the lead photo from that Wikipedia article (e.g. 'Lombard_Street_(San_Francisco)').
   Family members can also add picks (and photos) from the + button on each sub-page; those live in the trackers sheet. */
window.TRIP_RECS = [
  {
    id: 'places', tab: 'Places', title: 'Places to see', icon: '\u{1F5FA}️',
    lead: 'Worth a stop if you have free time.',
    items: [
      { img: 'img/recs/lombard-street.jpg', title: 'Lombard Street', text: 'The famous zigzag block of flowers and hairpin turns. Walk down it or watch the cars wind through.', where: 'Lombard Street, San Francisco, CA', facts: ["The famous crooked block runs between Hyde and Leavenworth Streets.", "It has 8 hairpin turns and is one-way, downhill only.", "The curves were added in 1922 to make the steep hill safer to drive."], tips: ["Go early in the morning, before the crowds.", "For the classic photo, stand at the bottom on Leavenworth and look up.", "The Powell–Hyde cable car stops right at the top."] },
      { img: 'img/recs/ocean-beach.jpg', title: 'Ocean Beach', text: 'Wide open beach on the Pacific side. Photos, a slow walk, or family games in the sand.', where: 'Ocean Beach, San Francisco, CA', facts: ["About 3.5 miles of beach along the city’s Pacific edge.", "The water stays cold all year and the rip currents are strong, so it’s for walking, not swimming."], tips: ["July is often foggy and windy. Bring a jacket.", "Sunset is the best time to go.", "Lands End trail and the Sutro Baths ruins are nearby at the north end."] },
      { img: 'img/recs/union-square.jpg', title: 'Union Square', text: 'Shopping, coffee and treats in the middle of downtown.', where: 'Union Square, San Francisco, CA', facts: ["The tall column is the Dewey Monument, honoring a U.S. Navy victory in 1898.", "Big department stores and shops surround the square."], tips: ["Powell Street station (BART) is a short walk away.", "The Powell Street cable car lines start a few blocks down at Powell & Market."] },
      { img: 'img/recs/chinatown-shops.jpg', title: 'Chinatown shops', text: 'Fortune cookies, little shops and lots of photo spots along Grant Avenue.', where: 'Grant Ave, Chinatown, San Francisco, CA', facts: ["One of the oldest Chinatowns in North America, dating to the 1850s.", "The Dragon Gate at Grant Avenue and Bush Street is the main entrance."], tips: ["Walk Grant Avenue for shops and photos, and Stockton Street for local markets.", "Bring some cash for the small shops.", "Find the fortune cookie factory in Ross Alley."] },
      { img: 'img/recs/fishermans-wharf-shops.jpg', title: 'Fisherman’s Wharf shops', text: 'Walk the waterfront, browse the shops and grab a snack.', where: 'Fisherman’s Wharf, San Francisco, CA', facts: ["Home to Pier 39, the Musée Mécanique arcade and classic sourdough bakeries."], tips: ["Get clam chowder in a sourdough bread bowl.", "Musée Mécanique is free to walk in. Bring quarters for the old arcade games.", "Go early or late in the day to beat the crowds."] },
      { img: 'img/recs/cable-car-turnaround.jpg', title: 'Cable car turnaround', text: 'Watch the crew turn the cable cars by hand at Powell & Market, where the Powell–Hyde line starts.', where: 'Powell St & Market St, San Francisco, CA', facts: ["The crew turns each car around by hand on a turntable.", "San Francisco’s cable cars are the last manually operated cable car system in the world.", "They’re a National Historic Landmark."], tips: ["The line at Powell & Market can be long. Boarding a few stops up the line is often faster.", "The Powell–Hyde line has the best bay views.", "Stand on the outside running board for the full experience, and hold on."] }
    ]
  },
  {
    id: 'photos', tab: 'Photo shots', title: 'Photo shots', icon: '\u{1F4F8}',
    lead: 'The pictures we don’t want to miss.',
    items: [
      { title: 'We made it!', text: 'First family picture at the house the night we arrive.', facts: [], tips: ["Use a phone timer or a small tripod so everyone is in it.", "Tall people in back, kids up front."] },
      { img: 'img/recs/golden-gate-viewpoints.jpg', title: 'Golden Gate viewpoints', text: 'Group photos and bridge shots with the bay behind us.', where: 'Golden Gate Bridge Welcome Center, San Francisco, CA', facts: ["The bridge opened in 1937 and is about 1.7 miles long.", "The color is called International Orange."], tips: ["Battery Spencer in the Marin Headlands gives the classic postcard view.", "Crissy Field and Fort Point are great close-up spots on the city side.", "Fog often rolls in during July, so check before heading out."] },
      { img: 'img/recs/waterfront-at-wharf.jpg', title: 'Waterfront at the wharf', text: 'Pier 39, the sea lions and the bay.', where: 'Pier 39, San Francisco, CA', facts: ["The sea lions started gathering at Pier 39 around 1990 and have stayed ever since.", "Pier 39 is free to walk around."], tips: ["The sea lions lounge on the docks on the west side of Pier 39.", "You get a great view of Alcatraz from the end of the pier."] },
      { title: 'Dressed up, before the cruise', text: 'The official family picture, everyone in their cruise-night best, before we head out.', facts: [], tips: ["Take it before we leave the house, while everyone still looks fresh.", "Golden-hour light is the most flattering.", "Assign one person to organize the group."] },
      { img: 'img/recs/golden-gate-from-boat.jpg', title: 'Golden Gate from the boat', text: 'The bridge as the backdrop during the dinner cruise.', facts: ["Passing under the bridge on the water is one of the best views of it."], tips: ["Head to the outside deck before the boat reaches the bridge.", "It gets windy on the water. Bring a layer.", "Shoot wide to fit the whole bridge in."] },
      { img: 'img/recs/skyline-after-sunset.jpg', title: 'Skyline after sunset', text: 'City lights from the water once the sun goes down.', facts: ["The pointed tower is the Transamerica Pyramid, one of the city’s best-known buildings."], tips: ["Use your phone’s night mode and hold steady against a railing.", "The blue sky just after sunset makes the best photos."] },
      { title: 'Last family picture', text: 'One more all together on Sunday morning before we head home.', facts: [], tips: ["Do it before anyone packs the car.", "Take a serious one, then a silly one."] }
    ]
  },
  {
    id: 'food', tab: 'Food', title: 'Food & treats', icon: '\u{1F355}',
    lead: 'Easy wins for a big group.',
    items: [
      { img: 'img/recs/pizza-and-wings-night.jpg', title: 'Pizza & wings night', text: 'Keep the first night easy: pizza, wings, salad and dessert at the house. Square Pie Guys is a fun SF pick, or local Daly City takeout.', where: 'Square Pie Guys, San Francisco, CA', facts: ["Square Pie Guys is known for Detroit-style square pizza with crispy cheese edges."], tips: ["Order ahead for a big group.", "Get a few plain cheese pizzas for the kids."] },
      { img: 'img/recs/big-breakfast-at-the-house.jpg', title: 'Big breakfast at the house', text: 'Eggs, bacon or sausage, pancakes or waffles, fruit, coffee and juice.', facts: [], tips: ["Keep pancakes warm in the oven on low while you cook the rest.", "Cut the fruit the night before.", "Set it up as a buffet so everyone eats on their own time."] },
      { img: 'img/recs/dessert-and-family-time.jpg', title: 'Dessert & family time', text: 'A sweet wind-down at the house after a long day.', facts: [], tips: ["Pick up dessert earlier in the day so nobody has to go back out.", "Pair it with a game or music trivia."] }
    ]
  },
  {
    id: 'games', tab: 'Game night', title: 'Game night', icon: '\u{1F3B2}',
    lead: 'For a night in at the house.',
    items: [
      { img: 'img/recs/family-feud.jpg', title: 'Family Feud, family edition', text: 'Our own questions about us.', facts: [], tips: ["Send the family a quick survey before the trip so the answers come from us.", "Split into two teams and pick a host.", "A buzzer or a bell makes it feel real."] },
      { img: 'img/recs/spades.jpg', title: 'Spades', text: 'Partners, trash talk, the usual.', facts: ["Played by 4 people in 2 teams of partners, 13 cards each.", "Spades are always trump.", "Teams bid how many books they’ll win."], tips: ["Agree on house rules before you start: nil bids, jokers and reneging.", "Keep score on paper so there’s no arguing later."] },
      { img: 'img/recs/uno.jpg', title: 'Uno', text: 'Easy for every age.', facts: ["A standard deck has 108 cards.", "Forget to say “Uno” with one card left, and you draw two."], tips: ["Agree on house rules before you start, like stacking draw cards.", "Easy for every age."] },
      { img: 'img/recs/dominoes.jpg', title: 'Dominoes', text: 'Slap them down.', facts: ["A standard double-six set has 28 tiles."], tips: ["With 4 players, play as partners.", "Bring a set from home, since the house may not have one."] },
      { img: 'img/recs/taboo.jpg', title: 'Taboo', text: 'Fast and loud.', facts: ["Get your team to guess the word without saying any of the forbidden words on the card."], tips: ["Use a timer for each round.", "Mix up the teams between rounds."] },
      { img: 'img/recs/grab-the-mic.jpg', title: 'Grab the Mic', text: 'Music game night: the song plays, grab the mic and finish the lyric before anyone else.', facts: [], tips: ["Make a playlist of family favorites ahead of time.", "One person runs the music and judges who grabbed it first.", "Use a real mic or a hairbrush, whatever’s handy."] },
      { img: 'img/recs/music-trivia.jpg', title: 'Music trivia', text: 'Name that song.', facts: [], tips: ["Play the first few seconds of a song and race to name it.", "Mix in songs from every generation in the room."] },
      { img: 'img/recs/family-trivia.jpg', title: 'Family trivia', text: 'Who knows the family best?', facts: [], tips: ["Questions about family stories, birthdays and who did what.", "Collect questions from everyone before the trip."] },
      { img: 'img/recs/kids-vs-adults.jpg', title: 'Kids vs. adults', text: 'Pick any game and split the room.', facts: [], tips: ["Pick games where kids have an edge, like Uno or charades.", "Loser team does the dishes."] }
    ]
  },
  {
    id: 'style', tab: 'Cruise style', title: 'Cruise night style', icon: '✨',
    lead: 'The night everybody dresses up.',
    items: [
      { img: 'img/recs/ladies.jpg', title: 'Ladies', text: 'Dresses, jumpsuits or dressy pants.', facts: [], tips: ["Bring a wrap or light jacket for the deck.", "Comfortable shoes help on the boat."] },
      { img: 'img/recs/gents.jpg', title: 'Gents', text: 'Slacks, polos or button-downs.', facts: [], tips: ["Bring a jacket or sweater for the deck.", "Shoes with grip help on the boat."] },
      { img: 'img/recs/the-finishing-touch.jpg', title: 'The finishing touch', text: 'Gold accessories encouraged.', facts: [], tips: ["Gold accessories tie the family photo together."] },
      { img: 'img/recs/bring-a-layer.jpg', title: 'Bring a layer', text: 'The bay gets chilly after sunset.', facts: ["San Francisco summers are cool, and it gets colder on the water after sunset."], tips: ["Pack a light jacket or sweater for every outing."] }
    ]
  },
  {
    id: 'tips', tab: 'Good to know', title: 'Good to know', icon: '\u{1F4A1}',
    lead: 'Little things that make the day smoother.',
    items: [
      { img: 'img/recs/cable-car-fares.jpg', title: 'Cable car fares', text: 'Lines get long in summer. Buy fares ahead in the MuniMobile app or with a Clipper card.', facts: ["Cable cars run on three lines: Powell–Hyde, Powell–Mason and California Street.", "You can pay with the MuniMobile app or a Clipper card."], tips: ["Buy your fare in the app before you board. It’s faster.", "Check MuniMobile for the current price and for day passes."] },
      { img: 'img/recs/bart-into-the-city.jpg', title: 'BART into the city', text: 'The house is close to BART, which can be easier than several cars for a city day.', facts: ["BART runs from Daly City station into downtown San Francisco."], tips: ["Get off at Powell Street for Union Square and the cable cars, or Embarcadero for the waterfront.", "Pay with Clipper, including Clipper on your phone’s wallet.", "It can be faster than driving and parking for a big group."] },
      { img: 'img/recs/alcatraz.jpg', title: 'Alcatraz, if you really want it', text: 'Plan 2½–3 hours and book early, since summer tickets sell out. We’ll see it from the cruise either way.', facts: ["Alcatraz was a federal prison from 1934 to 1963.", "The only ferries to the island leave from Pier 33."], tips: ["Book weeks ahead for July, since tickets sell out.", "The cellhouse audio tour is included and worth it.", "Wear comfortable shoes. It’s an uphill walk from the dock."] }
    ]
  }
];
