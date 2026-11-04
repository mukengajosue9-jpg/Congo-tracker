# CONGO STAR TRACKER — version 0.1

Prototype web responsive / PWA pour les visites publiques annoncées et événements publics en République démocratique du Congo.

## Fichiers
- `index.html` : structure du site.
- `styles.css` : interface responsive.
- `app.js` : carte, filtres et formulaire de proposition.
- `manifest.webmanifest` et `sw.js` : installation PWA sur Android et cache de base.
- `icons/icon.svg` : icône.

## Tester
Ouvrir `index.html` dans un navigateur pour examiner l'interface. La carte et les polices distantes demandent une connexion Internet.
Pour installer comme application Android, publier le dossier sur un hébergement HTTPS (GitHub Pages convient), ouvrir l'adresse dans Chrome Android puis choisir « Installer l'application » ou « Ajouter à l'écran d'accueil ».

## Important
La version 0.1 est une démonstration front-end. Les propositions sont stockées uniquement dans le navigateur via localStorage : elles ne sont pas transmises à une équipe et ne sont pas visibles par les autres visiteurs. Il faudra ensuite créer une API, une base de données, une authentification administrateur et une procédure de vérification des sources avant la mise en production.

Le projet ne suit pas les personnes ni leurs avions en direct. Publier uniquement des annonces publiques, confirmées et non sensibles. Ne jamais exposer d'itinéraires privés, d'adresses personnelles ou de positions en temps réel.
