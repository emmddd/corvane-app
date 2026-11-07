# Corvane

A clickable mobile banking app prototype. Plain HTML, CSS and JavaScript — no build step.

**Sample data only.** Nothing connects to a real bank; everything is saved in the browser on your device.

## Screens
- **Accounts** — total, quick actions, account cards, recent activity, search
- **Account detail** — balance and transaction history
- **Transfer** — move money between your accounts
- **Pay bill** — pay saved payees or add a new one
- **Edit balances** — set starting balances (logged as adjustments)
- **Transaction** — tap any transaction to edit or delete it (balance updates)
- **More → Customize** — upload a logo, change the app name and accent colour, edit account names, the last 4 digits and balances, add or remove accounts
- **Offers & lending promo** — swipeable ad cards and a lending card on the home screen; edit their text under More → Customize
- **Help Centre & Provide feedback** — FAQ and feedback screens at the bottom of the home screen
- **More → Export / Import setup** — share a customized setup with your team as a file

## Design
Liquid Glass styling (translucent tab bar, top bar and search with blur and highlights), a sliding tab indicator, direction-aware screen transitions (View Transitions API, with a fallback), animated figures, safe-area support for notch/Dynamic Island, light mode only (stays light when the phone is in dark mode), and reduced-motion support. A small **Demo** label stays on screen because this is a prototype with sample data.

## Run it
Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Publish with GitHub Pages
Repo **Settings → Pages → Deploy from a branch → `main` / root**. On your phone, open the Pages link and use *Add to Home Screen* to install it like an app.
