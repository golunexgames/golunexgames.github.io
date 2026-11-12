# golunexgames.github.io

Website of Golunex Games, served by GitHub Pages from the `main` branch.

- `/` studio page (both games) · `/twicetold/` and `/wiserio/` game pages
- `/twicetold/privacy/` privacy policy (EN, `#tr` Türkçe): the privacy URL in Google Play and App Store Connect
- `/twicetold/terms/` terms of use (EN, `#tr` Türkçe)
- `/twicetold/delete-data/` data deletion steps: the "delete account" URL for Google Play
- Screenshots: Twicetold `assets/shot-*.jpg`, Wiserio `assets/wshot-*.jpg` (720×1280, from the current builds)
- `/wiserio/privacy/`, `/wiserio/terms/` and `/wiserio/delete-data/`: Wiserio's store URLs; `/wiserio/r/` opens a friend-room link in the app; old `/wisewhere/*` paths redirect
- Icons and banner: `favicon.svg`, `favicon.ico`, `favicon-48/96/192.png`, `apple-touch-icon.png`, `assets/golunex-logo-512.png`, `assets/og.png` (1200×630) are rendered from `../golunex-brand/v2/site.html` by `render-site.sh` there; don't edit the PNGs by hand
- `app-ads.txt` authorises our AdMob publisher id (pub-8910225224900746) to sell ads in our apps

Plain HTML and one stylesheet; no build step. Preview locally with `python3 -m http.server`.
