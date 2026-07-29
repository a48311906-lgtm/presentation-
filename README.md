# Hotel Kreston Heights website

Open `index.html` in a browser to see the site. It includes a hero, hotel listings, amenities, gallery, a room/tariff comparison section, an FAQ accordion and a contact section.

- Click a property photo (or a "Photos & tariff" card) to open its photo gallery and tariff panel.
- Use the **Compare & tariff** section to switch between Indore Sch 78 and Bhopal and see room rates side by side.
- The **FAQ** section uses click-to-expand cards (no extra clicks needed to browse — just tap a question).

## Before publishing, update these

- **Bhopal tariff is a placeholder.** The rates in `script.js` (`hotels.bhopal.tariffs`) and in the Compare section of `index.html` (`#compare-panel-bhopal`) are sample numbers only, flagged on-page as "Sample rates — confirm before publishing." Replace them with your real Bhopal rates, then remove the `isPlaceholderTariff: true` line in `script.js` and the `<span class="compare-note">` note in `index.html` once confirmed.
- **Both properties now use real photos** (in the `images/` folder — room, dining/seating and bathroom shots), used for their property cards and modal galleries.
- **The general site gallery, hero and about-section photos are still stock placeholders** (they're shared across both properties rather than tied to one). Send over a few more photos if you'd like these swapped too — otherwise they're fine to leave as generic atmosphere shots.
- Double-check the hotel amenities, the FAQ answers (check-in times, cancellation policy, pet policy, etc.), and the property addresses.
- Confirm the phone number, email and WhatsApp number if they change.

To put it online, upload `index.html`, `style.css`, `interactive.css` and `script.js` together to any web host.
