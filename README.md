# Keepsake box

A private Next.js keepsake box — unlock with a password, then open the letter, cards, cassette, ticket, and photos inside.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Set the password

Create / edit `.env.local`:

```
KEEPSAKE_PASSWORD=Ilovemomo
SESSION_SECRET=replace-with-a-long-random-string
```

Restart the dev server after changing env vars.

## Personalise content

Edit one file:

```
src/content/keepsake-content.ts
```

There you can change:

- the letter text
- `spotifyPlaylistUrl`
- concert date / venue
- ordered memory card filenames
- three photo filenames

## Add your images

Private assets stay **outside** `/public` so they require the unlock cookie:

| What | Folder | Example |
| --- | --- | --- |
| Memory cards | `private/cards/` | `card-1.svg`, `our-trip.jpg` |
| Photo prints | `private/photos/` | `photo-1.jpg` |

Update the filenames in `keepsake-content.ts` to match. Placeholder SVGs are included so every interaction works on first run.

## Notes

- Wrong password keeps the lid closed and shows: “That didn’t open it. Try again?”
- Cassette opens the Spotify URL in a new tab, or shows “Playlist coming soon” if empty
- Card gallery supports swipe, arrow buttons, keyboard arrows, Escape, and a live counter
