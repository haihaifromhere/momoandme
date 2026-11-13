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
  letter: `Everything I've known about love is because of the people around me, but everything I've known about comfort and sweetness is just from you. I never knew that I would ever be able to carry so much love and passion for one singular being until I met you (and maybe D2). But I think that's the best part of being involved with someone as amazing as you.

Your patience with me, your rage baiting, your smile, your motivation, your handsome face, and the way you look at me all make me feel so grateful I get to call you my pookie. Thank you for coming into my life when I least expected it and making this the most important year for me, and showing me that everything I want in life indeed starts and ends with you.

This past year has been such a sweet feeling to experience. It has been such a blessing to know you, learn about you, and love you. I will always remember when we first met at Canada's Wonderland. The first thing I noticed about you was your cute eyes. I also noticed the softness and kindness in them. I'll never forget when you stayed up late with me because I was staying late for Hamna LOL.

It's hard to pinpoint specific words for you because genuinely there are so many things I feel for you, and I fear the words will never be able to explain it all. Mohamed, you are my favourite person to talk to, look to, think about, hug and kiss, and annoy muhahaha.

In the beginning, I will say I was scared of everything related to relationships, but you make loving so easy. You give me hope that I never thought I would have. You fill my heart with so much happiness and joy, and you always leave my heart anticipating the future of spending forever with you. And although you ragebait me a lot, you are my peace when it gets chaotic.

You motivate me to go farther and to push my limits. You have a light in you that lights up every room you walk into, and you know how to make people feel seen and heard.

I just want to make you the happiest you've been. I want to make you feel safe and comforted. I want to be there when you need a shoulder to rest on. I want to be the one to hold you forever. In a small amount of time, you have become my home, my safe place, and the love of my life.

On your good days, I want to be there to celebrate all your wins, and even on your hard days, I want to be right beside you, reminding you that you are stronger than you think. You have been the person to make my heavy days feel light, and whenever I'm with you, it feels like you and me were always meant to be.

I adore so much about you. Your presence, your thoughtfulness and how you try to remember things that are important to me, the way you give your heart, your selflessness, the way you think of others' needs, and the way you make trust and love come so easy. I adore your desire to learn and to succeed. I already know that you will do big things, pookie, and you will move mountains.

On February 14th, 2025, I actually wrote a note to future me. In that note, I had talked about how everyone would tell me that it'll happen when I least expect it. And in that note, I had said that I believe that when the time is right, I'll seek you out and you'll come to me with simple ease.

And almost a few months after writing this, I met you, and everything I had written in that letter was always about you. (I also did say that I would take you up in my pocket and keep you forever hehehehaah.)

There is absolutely nothing I would change about our love story. Everything leading up to this year has been something to cherish and something I want to hold forever.

Thank you for loving me, and thank you for letting me love.

I love you so so much, pookie. Happy one year anniversary, and to many more. ♡`,

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
