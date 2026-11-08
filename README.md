# BLUE MONDAY

Pixel-artowa gra taktyczna o amerykańskiej policji (HTML5 Canvas, Web Audio). Całość działa w przeglądarce z jednego pliku.

## Uruchomienie
Otwórz `dist/index.html` w przeglądarce (najlepiej Chrome/Edge, ze słuchawkami).

## Budowanie
```bash
./build.sh
```
Skleja pliki z `src/` w `dist/index.html`.

## Scenariusze
- **01 · 214 Oakridge Lane** — patrol 2-Adam-14, rozpoznanie zgłoszenia na przedmieściu.
- **02 · Mile Marker 41** — nocne zatrzymanie drogowe na drodze stanowej.
- **03 · Pine Court, Apt 3B** — sprawdzenie stanu starszej lokatorki.
- **04 · Starlight Motel, Room 12** — barykada w motelu: patrol, negocjacje, potem wejście S.W.A.T.
- **05 · Terminal B** — pozostawiony bagaż na lotnisku.
- **06 · St. Dymphna** — S.W.A.T., odbicie zakładnika w szpitalu psychiatrycznym (zablokowane).

## Struktura `src/`
| Plik | Zawartość |
|---|---|
| `head.html` | HTML, CSS, HUD, ekrany menu |
| `f_scanner.js`, `f_samples.js` | próbki audio (base64): nasłuch policyjny, broń |
| `a_core.js` | stan gry, narzędzia, silnik dźwięku, radio |
| `b_level.js` | mapa szpitala, `buildMap()` |
| `b_core.js` | kafelki, raycasting, pathfinding, rysowanie świata, meble |
| `c_units.js`, `c2_vox.js` | jednostki, broń, rysowanie postaci |
| `d_ai.js` | AI oddziału, przeciwników i cywili, drzwi, peryskop, CCTV |
| `g_ext.js` | scenariusze szpitala, wyposażenie |
| `h_house.js` | poziom 01 (214 Oakridge Lane): mapa, fabuła, klimat |
| `i_frame.js` | rejestr poziomów `LVL`, pogoda, wspólne narzędzia misji patrolowych |
| `l_road.js`, `l_apt.js`, `l_motel.js`, `l_air.js` | misje 02–05 |
| `e_game.js` | start misji, sterowanie, pętla gry, render, HUD, menu |

## Sterowanie (skrót)
WASD — ruch, mysz — celowanie, LPM — strzał, E — interakcja, Q — umiejętność, PPM — rozkazy, F/H — za mną / stój, 1–5 / Tab — zmiana operatora, M — plan, Esc — pauza.
