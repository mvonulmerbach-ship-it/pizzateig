# CLAUDE.md – 🍕 Pizzaiolo – Teigrechner (`pizzateig`)

@~/Nextcloud/Claude/Projekte/MiniApps/REGELN.md

Die Regeln oben (REGELN.md) gelten für jede Session in diesem Repo, dazu das Mini-App-Muster aus den CLAUDE-Anweisungen. Hier steht nur, was **diese** App betrifft.

## Diese App

- **Live:** https://mvonulmerbach-ship-it.github.io/pizzateig/ · Beschreibung und Abweichungen: `README.md`
- **Familie:** Rechner · Geschwister: `damwild_rechner` – Änderungen an gemeinsamen Teilen dort mitziehen (REGELN §4)
- **Version:** `CACHE` in `sw.js` – bei jeder Änderung hochzählen; die Zahl steht nur dort.
- Rechenmodell (Hefe nach Temperatur und Gärzeit, Stützstellen) steht im README; nach jeder Änderung mindestens zwei Referenzwerte nachrechnen.
- Vorbild-App des Mini-App-Musters (mit `wein-lern-app`).

## Abschluss (DoD nach REGELN §2)

UI-Prüfung im Repo-Ordner, erwartet „UI-PRUEFUNG GRUEN“ (kein Befund der Schwere ≥ 2), danach die Bildschirmfotos aus dem genannten Ordner ansehen:

```powershell
& "$env:LOCALAPPDATA\Mietverwaltung\venv\Scripts\python.exe" "$env:USERPROFILE\Nextcloud\Claude\Projekte\App-Design-Datenbank\Werkzeuge\ui_pruefen.py" .
```

Am Ende Summary und Description für dieses Repo als eigene Codeblöcke; committet und gepusht wird von Max.
