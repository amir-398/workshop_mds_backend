# Utiliser une image de base officielle de Node.js
FROM node:alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /src

# Copier les fichiers de package et installer les dépendances
COPY package*.json .

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Installer nodemon pour le rechargement à chaud
RUN npm install -g nodemon

# Exposer le port utilisé par l'application
EXPOSE 3001

# Démarrer l'application avec nodemon
CMD ["npm", "run", "dev"]
