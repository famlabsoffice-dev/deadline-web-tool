# DEADLINE Token Experiment - TODO

## Datenbankschema & Backend
- [x] Datenbankschema für Timer, Transaktionen und Token-Metriken aktualisieren
- [x] Drizzle-Migrationen generieren und durchführen
- [x] Query-Helfer in server/db.ts für Timer und Metriken hinzufügen
- [x] tRPC-Prozeduren für Timer-Abfragen, Metrik-Updates und Transaction-Feed implementieren

## Frontend UI
- [x] Countdown-Timer-Komponente mit Neon-Rot-Design erstellen
- [x] Token-Metriken-Dashboard-Komponente entwickeln
- [x] Transaction-Feed-Komponente für Live-Aktivität erstellen
- [x] Info- und Social-Media-Komponente implementieren
- [x] Responsive Grid-Layout für Desktop und Mobile aufbauen

## WebSocket & Live-Daten
- [x] Cloudflare Worker für Solana On-Chain-Tracking (getSignature) implementiert
- [ ] WebSocket-Integration für Echtzeit-Transaktionsfeed einrichten
- [ ] Real-time Timer-Updates via WebSocket implementieren
- [ ] Pump.fun WebSocket API Integration (falls nötig)

## Design & Styling
- [x] Neon-Rot-Farbschema und Dark-Theme konfigurieren
- [x] Countdown-Timer-Ziffern exakt nach Referenzbild gestalten
- [x] Responsive Breakpoints für Mobile/Tablet/Desktop definieren

## Tests & Validierung
- [x] Vitest-Tests für tRPC-Prozeduren schreiben
- [ ] Frontend-Komponenten-Tests schreiben
- [ ] WebSocket-Integration testen
- [ ] Responsive Design testen

## GitHub & Deployment
- [ ] GitHub-Repository erstellen
- [ ] Code zu GitHub pushen
- [ ] README mit Setup-Anweisungen schreiben
