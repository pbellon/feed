# TODO

- affichage user dans le listing
- Optimization là où c'est possible
  - bundle
  - external resources loading
  - ??
- polish naming & structure

# Plan

- [x] modeliser les données
- [x] architecture globale du projet
- [x] squelette du front
- [x] implem DB (create/fixtures)
- [x] implem listing de base + pagination (back+front)
- [x] implem filtering (back+front)
  - [x] par status
  - [x] par subject
  - [x] par date
- suivant le temps:
  - tester le listing côté API (voir comment faire pour créer à la volée la DB in memory)
  - tester le front, à voir quoi, ça peut se jouer de dire je vais tester le listing avec un jeu de données mock via MSW

# Notes sur le dev / Amélioration V2

## automatisation

- trop de taches manuelles pour la partie API / types, très probablement automatisable via nodemon mais j'ai pas voulu complexifier plus que ça

## apps/api/scripts/db.js

- un peu quick & dirty pour setup la DB et pas beaucoup plus que ça

- idéallement on pourrait avoir des systèmes plus évolué pour mettre à jour les
  données lors du chargement des fixtures

- avoir un système de migration, là je suis allé au plus simple pour la démo

## Bug connu sur les search params

Si on met à la main un `page=100` par exemple dans les search params de l'URL ça va provoquer un cas
limite un peu pénible puisqu'on ne peut pas facilement reset la page courante. J'ai fait le choix de
ne pas le gérer dans cette démo pour éviter d'y passer trop de temps mais, dans l'absolu, il
faudrait le prendre en compte.

- soit en faisant un reset de cette page si on détecte que dans les données chargées qu'on ne
  devrait pas être sur cette page, mais ça demande un peu de logique back / front et des màj

- soit en autorisant l'utilisateur à revenir au début du tableau avec un système de pagination plus
  customisé comme montré ici: https://mui.com/material-ui/react-table/#custom-pagination-actions
  mais c'est pas non plus très satisfaisant car ça demande une action utilisateur.

## "Dockeriser" le tout

- un docker par composant principal
- un pour l'API
- un pour l'app nextjs
- un pour l'ensemble

Pour faciliter le build et le déploiement et pour pouvoir plus facilement "scaler" horizontallement
via kubernetes ou autre.
