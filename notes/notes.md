# Plan

- modeliser les données - almost good
- architecture globale du projet
- squelette du front
- implem DB
- implem listing de base + pagination (back+front)
- implem filtering (back+front)
- suivant le temps:
    - tester le listing côté API
    - tester le front, à voir quoi, ça peut se jouer de dire je vais tester le listing avec un jeu de données mock via MSW


# Notes sur le dev / Amélioration V2

## automatisation
- trop de taches manuelles pour la partie API / types, très probablement automatisable via nodemon mais j'ai pas voulu complexifier plus que ça

## apps/api/scripts/db.js

- un peu quick & dirty pour setup la DB et pas beaucoup plus que ça

- idéallement on pourrait avoir des systèmes plus évoluer pour mettre à jour les
  données lors du chargement des fixtures

- avoir un système UP and DOWN pour les migration ou juste pouvoir cibler une migration spécifique

## "Dockeriser" le tout
- un docker par composant principal
 - un pour l'API
 - un pour l'app nextjs
 - un pour l'ensemble

Pour faciliter le build et le déploiement et pour pouvoir plus facilement "scaler" horizontallement
via kubernetes ou autre.