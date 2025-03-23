CIRP-Dashboard
Ein Dashboard für Cloud Incident Response zur Bewältigung von Cybersicherheitsvorfällen in cloudbasierten IT-Umgebungen.
Beschreibung
Das CIRP-Dashboard (Cyber Incident Response Plan) wurde entwickelt, um Sicherheitsteams bei der effektiven Bewältigung von Sicherheitsvorfällen in Cloud-Umgebungen zu unterstützen. Es integriert etablierte Frameworks wie SANS und NIST und erweitert diese um cloud-spezifische Aspekte.
Hauptfunktionen

Strukturierte Übersicht über aktuelle Vorfälle
Integrierte Playbooks mit maßgeschneiderten Methoden für verschiedene Cloud-Provider (AWS, Azure, Google Cloud)
Berücksichtigung des geteilten Verantwortungsmodells für IaaS-, PaaS- und SaaS-Umgebungen
Lückenlose Nachverfolgung und Dokumentation von Vorfällen
Integrationen mit wichtigen Tools wie Slack, Jira, Microsoft Teams und PagerDuty

Technologien

React
TypeScript
React Router
Inline CSS

Voraussetzungen

Node.js (Version 16 oder höher)
npm (normalerweise mit Node.js installiert)

Installation

Repository klonen
bashKopierengit clone https://github.com/dein-username/cirp-dashboard.git

In das Projektverzeichnis wechseln
bashKopierencd cirp-dashboard

Abhängigkeiten installieren
bashKopierennpm install

Anwendung starten
bashKopierennpm start

Das Dashboard ist nun unter http://localhost:3000 verfügbar

Nutzung
Das Dashboard ist in verschiedene Bereiche gegliedert:

Übersicht: Zeigt alle aktuellen Vorfälle und ihren Status
Vorfälle: Detaillierte Ansicht einzelner Vorfälle
Playbooks: Anleitungen für verschiedene Arten von Sicherheitsvorfällen
Ressourcen: Wichtige Kontakte und Tools
Einstellungen: Konfiguration des Dashboards

Zukünftige Erweiterungen

Integration mit echten Cloud-Provider-APIs
Backend-System mit Datenbankanbindung
Echtzeit-Benachrichtigungen
Erweitertes Berechtigungskonzept
Automatisierte Playbook-Aktionen
Kontakt
Isa Zoch - isa.zoch@web.de
Projektlink: https://github.com/Iselgaardine/cirp-dashboard

################################################################
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
