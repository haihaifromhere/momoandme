/**
 * src/content/keepsake-content.ts
 * --------------------------------
 * Edit this one file to personalise the box.
 *
 * Private images go in:
 *   /private/cards/   ← memory card illustrations
 *   /private/photos/  ← instant photo prints
 * Do NOT put private images in /public.
 */

export const keepsakeContent = {
  /** Shown on the folded letter. Supports line breaks. */
  letter: `[Add my letter here]`,

  /**
   * Full Spotify playlist / album / track URL.
   * Leave empty to show “Playlist coming soon”.
   */
  spotifyPlaylistUrl:
    "https://open.spotify.com/playlist/53P9hz2vO9OmW6OajeMCJu?si=rBEfpp2nTJm5dJJdnmAudA&utm_source=copy-link&pi=5qolFX1fS7G5C",

  concert: {
    artist: "Daniel Caesar",
    date: "August 3rd",
    venue: "Scotiabank Arena",
  },

  /** Label on the card stack in the open box */
  memoryCardsTitle: "A bet on memory lane",

  /** Cover shown on top of the stack (not part of the swipe gallery) */
  memoryCardsCover: "a-bet-on-memory-lane.svg",

  /**
   * Memory card illustrations in gallery order.
   * Files live in /private/cards/
   */
  memoryCards: [
    "01-amusement-park.png",
    "02-bowling.png",
    "03-shared-music.png",
    "04-holding-hands.png",
    "05-winter-pizza.png",
    "06-panda-selfie.png",
    "07-medal-celebration.png",
    "08-dance-arcade.png",
  ],

  /** Captions shown under each memory card (same order as memoryCards). */
  memoryCardCaptions: [
    "The day we first met at Canada's Wonderland, and somehow you got me Gooner. Fun fact: I came home and slept with him for a whole week straight before Hamna started catching on. Little did I know that you would be replacing him one day:)",
    "Our first date at the arcade, where I kept beating you at practically every game... sigh, good times. No tea, all shade.",
    "After grabbing dinner in Toronto, we shared my headphones on the way back. My favourite part of that night wasn't even dinner, it was learning more about you through music, discovering your favourite songs, and getting to know you a little better, one song at a time. I'm feeling so maternal right now.",
    "Somewhere around that time was today!! The day you asked me to be your girlfriend. AHHHH. And although it caught me a little off guard at first, looking back, there's absolutely nothing I would change about it!!! I'm so happy it was you.",
    "I'll always cherish the times you walked me home and made sure I was warm, especially all the little memories we made along the way. Somehow, even the simplest walks became moments I never wanted to end.",
    "Hehe it's so cute seeing you be a mini me sometimes. Especially when we did face masks together and you wore that silly little panda headband. It genuinely made my whole week and reminded me how much I love all the small and silly moments with you. ♡",
    "One of my favourite parts of loving you has been getting to celebrate your wins, big or small. Seeing you happy and proud of yourself makes me just as happy. I'll always be right there, cheering you on and rooting for you, pookie.",
    "You always bring out the little kid in me. And although we didn't get to grow up together, I know for a fact little me would've definitely come knocking on your door asking you to play. I think she would've loved you just as much as I do now.",
  ],

  /**
   * Instant photo prints.
   * Files live in /private/photos/
   */
  photos: ["photo-1.jpg", "photo-2.jpg", "photo-3.jpg", "photo-4.jpg"],
} as const;

export type KeepsakeContent = {
  letter: string;
  spotifyPlaylistUrl: string;
  concert: {
    artist: string;
    date: string;
    venue: string;
  };
  memoryCardsTitle: string;
  memoryCardsCover: string;
  memoryCards: string[];
  memoryCardCaptions: string[];
  photos: string[];
};

/** Safe payload sent to the client after unlock */
export function getClientKeepsakeContent(): KeepsakeContent {
  return {
    letter: keepsakeContent.letter,
    spotifyPlaylistUrl: keepsakeContent.spotifyPlaylistUrl,
    concert: { ...keepsakeContent.concert },
    memoryCardsTitle: keepsakeContent.memoryCardsTitle,
    memoryCardsCover: keepsakeContent.memoryCardsCover,
    memoryCards: [...keepsakeContent.memoryCards],
    memoryCardCaptions: [...keepsakeContent.memoryCardCaptions],
    photos: [...keepsakeContent.photos],
  };
}
