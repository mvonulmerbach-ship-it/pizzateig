# 🍕 Pizzaiolo – Teigrechner

Kleine Web-App für neapolitanischen Pizzateig. Läuft komplett im Browser, ohne Server, ohne Tracking, offline nutzbar.

**Live:** https://mvonulmerbach-ship-it.github.io/pizzateig/

## Was die App macht

- **Rechner** – Mengen für Mehl, Wasser, Salz und Hefe aus Ballenzahl, Ballengewicht, Hydration und Salzanteil. Die Hefemenge wird aus Küchentemperatur und Gärzeit berechnet, nicht aus einer festen Rezeptangabe.
- **Zeitplan** – Rückwärtsrechnung ab dem gewünschten Backzeitpunkt: wann kneten, wann in den Kühlschrank, wann ballen, wann den Ofen anwerfen.
- **Wissen** – Hydration und maximale Gärdauer nach Eiweißgehalt des Mehls, Einkaufsliste für stärkere Mehle, Fehlerdiagnose.

## Rechenmodell

Trockenhefe in Gramm je 1000 g Mehl bei Raumtemperaturführung:

```
y(T, t) = y₇(T) · (7 / t)^b(T)
```

`y₇(T)` ist die Hefemenge für 7 Stunden Gesamtgärzeit, `b(T)` der Zeitexponent. Beide werden zwischen fünf Stützstellen interpoliert:

| Temperatur | y₇ | b |
|---|---|---|
| 19 °C | 0,80 g | 0,944 |
| 22 °C | 0,60 g | 1,125 |
| 25 °C | 0,45 g | 1,221 |
| 28 °C | 0,30 g | 1,306 |
| 31 °C | 0,20 g | 1,306 |

Die Stützstellen stammen aus den gängigen Gärtabellen. Bei Kühlschrankführung ist die Hefemenge fest (24 h → 1,0 g, 36 h → 0,8 g, 48 h → 0,7 g je kg Mehl); die Raumtemperatur steuert dort nur die Dauer der Ballengare.

Wassertemperatur nach der üblichen Formel `2 × Zielteigtemperatur − Mehltemperatur − Knetzuschlag` mit 23 °C Zielteigtemperatur und einem Knetzuschlag von 2 °C (Hand), 4 °C (Küchenmaschine) oder 6 °C (Spiralkneter).

Frischhefe = Trockenhefe × 3.

**Alle Werte sind Richtwerte.** Mehl, tatsächliche Teigtemperatur und Küchenklima verschieben das Ergebnis spürbar. Im Zweifel entscheidet der Ballen, nicht die Uhr.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | komplette App, Single File (HTML, CSS, JS) |
| `manifest.webmanifest` | PWA-Manifest für „Zum Startbildschirm hinzufügen" |
| `sw.js` | Service Worker, network first mit Cache-Fallback |
| `icon-*.png` | App-Icons 192 px, 512 px und maskable |

## Auf dem Handy installieren

Seite in Chrome öffnen → Menü → „Zum Startbildschirm hinzufügen". Die App startet danach im Vollbild mit eigenem Icon und funktioniert auch ohne Netz.
