# Apropos 
```
__VoGit__ est une application de transfert de fichier utilisant comme protocole de transfert git , et aussi le protocole ssh et https

```
# Acteur 

Principalement il'y a 2 types d'acteur:
    - l'acteur jouans le role de __serveur__
    - l'acteur jouans le role de __client__

# Etapes d'initiation de connexion 

1- Un hôte crée une connexion:
        - Demmarage d'un serveur ssh 
        - Création d'un reposistory distant
2- Un hôte client recherche une serveur VoGit accéssible:
        - Soit saisir directement l'adresse de l'hote serveur
        - Soit faire une recherche dans le réseau local et trouver l'adresse des serveur VoGit disponible et en choisir un 

# Etape de transfert 

1- Download :
    - Le client fait un requete de "download" d'une fichier ou d'un dossier
    - Le serveur reçoit le demande et fait les preparations:
        - creation d'un depôt dans le repertoire et ajout du fichier demandé dans le commit
        - envoie le l'URL du fichier (le remote)
    - Le client reçoit la reponse du serveur et prêt à faire un : 
        ```
        $ git clone __remote__

        ```
    - En cas de succes , le client envoies une requête de success sinon une requete d'erreur
    - Si le serveur recoit un success , il supprime le reposistory (le dossier .git) pour terminer le transfert
    - Si le serveur recoit un erreur , il traite l'erreur , et si c'est un probleme d'URL , il revoie l'URL du reposistory demandé


2- Upload :
    - Le client fait un requete d' "upload" 
    - Le serveur reçoit le demande et fait les preparations:
        - creation d'un depôt dans le repertoire et ajout du fichier demandé dans le commit
        - envoie le l'URL du fichier (le remote)
        - Le client reçoit la reponse du serveur et prêt à faire un : 
        ```
        $ git clone __remote__ 

        ```
        - Le client ajote le fichier a envoier dans le reposistory cloner et fait un : 
        ```
        $ git add . && git commit -m "message" && git push remote/branch

        ```