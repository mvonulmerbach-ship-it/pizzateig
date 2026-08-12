# 🍕 Pizzaiolo – Teigrechner

Kleine Web-App für neapolitanischen Pizzateig. Läuft komplett im Browser, ohne Server, ohne Tracking, offline nutzbar.

**Live:** https://mvonulmerbach-ship-it.github.io/pizzateig/

## Was die App macht

- **Rechner** – Mengen für Mehl, Wasser, Salz und Hefe aus Ballenzahl, Ballengewicht, Hydration und Salzanteil. Die Hefemenge wird aus Küchentemperatur und Gärzeit berechnet, nicht aus einer festen Rezeptangabe.
- **Zeitplan** – Rückwärtsrechnung ab dem gewünschten Backzeitpunkt: wann kneten, wann in den Kühlschrank, wann ballen, wann den Ofen anwerfen.
- **Belag** – Die Teigballen werden auf Pizzasorten verteilt, jede Sorte wahlweise rossa oder bianca. Daraus entsteht die Einkaufsliste mit benötigten Packungen.
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

### Belag

Jede Sorte bekommt eine Stückzahl und einen Boden (rossa = geschälte Tomaten, bianca = Crème fraîche). Die App summiert über alle Sorten und rundet auf ganze Packungen auf.

| Sorte | Belag |
|---|---|
| Margherita | Mozzarella + Parmesan |
| 4 Käse | Mozzarella + Parmesan + Gorgonzola + Taleggio |
| Salami | Mozzarella + Parmesan + Salami |
| Spezial | Mozzarella + Parmesan + Gorgonzola + Salami |
| Freie Sorte | frei zusammenstellbar |

Dazu zehn gängige Sorten unter „Weitere Sorten": Prosciutto, Prosciutto e Funghi, Funghi, Diavola, Capricciosa, Verdure, Parma e Rucola, Bufala, Boscaiola und Fiorentina. Fisch, Meeresfrüchte und Hawaii sind bewusst nicht dabei. Die Grammangaben dieser zehn sind Richtwerte, keine Erfahrungswerte — anders als die Werte in der Tabelle unten.

Salami wird global auf Minischeiben oder normale Scheiben gestellt und gilt dann für Salami und Spezial gemeinsam.

Ergiebigkeiten, alles Erfahrungswerte aus der eigenen Praxis:

| Zutat | Packung | reicht für | pro Pizza |
|---|---|---|---|
| Geschälte Tomaten | 400 g (Dose) | 3 Pizzen | 133 g |
| Crème fraîche | 200 g | 3 Pizzen | 67 g |
| Mozzarella (Galbani) | 125 g (Ballen) | 1,5 Pizzen | 83 g |
| Parmesan | 200 g | 10–12 Pizzen | 18 g |
| Gorgonzola | 200 g | 5 Pizzen | 40 g |
| Taleggio | 200 g | 4 Pizzen | 50 g |
| Salami, Minischeiben | – | – | 10 Scheiben |
| Salami, normale Größe | – | – | 5–6 Scheiben |

Die Käsemengen gelten je Pizza, auf der dieser Käse tatsächlich liegt. Alle Werte lassen sich in der App unter „Mengen anpassen" überschreiben; die Änderungen bleiben auf dem Gerät gespeichert.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | komplette App, Single File (HTML, CSS, JS) |
| `manifest.webmanifest` | PWA-Manifest für „Zum Startbildschirm hinzufügen" |
| `sw.js` | Service Worker, network first mit Cache-Fallback |
| `icon-*.png` | App-Icons 192 px, 512 px und maskable |

## Auf dem Handy installieren

Seite in Chrome öffnen → Menü → „Zum Startbildschirm hinzufügen". Die App startet danach im Vollbild mit eigenem Icon und funktioniert auch ohne Netz.
