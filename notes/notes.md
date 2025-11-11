# TODO

- Optimization là où c'est possible
  - bundle
  - external resources loading

# Amélioration V2

## Front / Next.js

- gestion du thème de MUI: là j'ai pas utilisé le système de thème de material UI à part pour configurer la police en Roboto, idéallement il faudrait aussi penser la palette de couleurs.

- Rajout de helpers pour chacun des filtres documentant le rôle du filtre en question. Particulièrement pour les filtres de dates qui sont souvent tricky à bien comprendre. Ici expliquer que ça filtre sur created_at et les différents use case: start (>=), end (<=), start + end (between)

- Affichage en mode "sticky" pour la table. Si on a beaucoup de données on va perdre la barre de filtres et le header de la table. Je ne l'ai pas fait pour ne pas trop galérer avec les composant MUI et comment gérer le `top` en sticky qui est complexe, surtout avec une filter bar dont la hauteur n'est pas fixe.

- Probablement un aspect plus responsive pour la table en mode "mobile" mais les contraintes parlait d'un mode desktop donc j'ai juste un peu bossé ça sur la barre de filtres pour la démo

- Un package "ui" (dans `packages/`) pour les composants "briques" élémentaire avec son propre storybook. Ici il y en avait trop peu pour que ça soit justifié et ça aurait alourdit un peu le dev

- plus de tests: je n'ai testé que la FeedFilterBar pour faire la démonstration de comment je testerais un composant mais idéallement il faudrait à minima tester toute les fonctions de librairies sous `apps/web/lib`

- j'étais pas super à l'aise avec NextJS, notemment pour ce qui est du caching et de la gestion des états de chargement, je pense que ça se voit sur comment j'ai structuré ça. Dans une v2 je reprendrais à tête reposée ce sujet pour voir comment faire ça mieux. Là ce qui m'a complexifié la tache c'est que quasiment toute mes routes / segments sont dynamique. Donc j'avais beaucoup de mal à voir comment bénéficier des optimisation de nextjs.

- il y a un cas limite que je n'ai pas réussit à bien gérer: si on modifie à la main l'URL search param "page" avec une valeur trop grosse alors ça provoque un affichage un peu buggué et on peut difficilement revenir au début des events. Y'a plusieurs façon de régler le soucis comme rajouter un système d'actions custom sur le tableau. Ou bien détecter directement ce cas là une fois que les données sont chargées et rediriger l'utilisateur vers la dernière page disponible.

## API

- nécessité de refaire un pnpm build à chaque modification, ce qui est un peu pénible. C'est très probablement automatisable via nodemon mais j'ai pas voulu complexifier plus que ça

- rendre toute la partie SQL plus robuste et clean, là c'est vraiment "quick & dirty" pour aller au plus vite, je me suis surtout concentré sur la partie front / next.js
  - système de migration plutôt que des requêtes SQL directement dans le JS
  - rendre plus lisible la partie `apps/api/server.ts` en rajoutant une couche entre les points d'API et la DB, une sorte de client DB maison plutôt que
    d'exécuter

- tester complètement l'API en faisant tourner la DB en mode "in memory"

- surement utiliser une autre DB, là j'ai pris SQLite par facilité d'installation mais si ça avait été une "vraie" DB en prod j'aurais utilisé du PostgreSQL, le tout dockerisé pour facilité l'utilisation côté dev.

## Global / Infra / CI/CD

- "Dockeriser" le tout pour faciliter le build et le déploiement et, peut-être, faciliter ainsi du scaling horizontal via kubernetes
  - un pour l'API
  - un pour l'app nextjs
  - un pour l'ensemble, pour les devs
