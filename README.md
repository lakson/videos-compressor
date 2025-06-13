# Compresseur de Vidéos

Ce script Node.js permet de compresser automatiquement des vidéos en format WebM et de les archiver dans un fichier ZIP.

## Fonctionnalités

- Compression de vidéos en format WebM (codec VP9)
- Support de plusieurs formats d'entrée (MP4, AVI, MOV, MKV, WMV)
- Compression audio avec le codec Opus
- Création automatique d'une archive ZIP
- Interface en ligne de commande avec suivi de la progression

## Prérequis

- Node.js (version 12 ou supérieure)
- FFmpeg installé sur votre système
- npm (généralement installé avec Node.js)

### Installation de FFmpeg

#### macOS
```bash
brew install ffmpeg
```

#### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

#### Windows
1. Téléchargez FFmpeg depuis [le site officiel](https://ffmpeg.org/download.html)
2. Ajoutez FFmpeg à votre PATH système

## Installation

1. Clonez ou téléchargez ce dépôt
2. Naviguez vers le dossier du projet :
```bash
cd compressor
```
3. Installez les dépendances :
```bash
npm install
```

## Utilisation

1. Créez un dossier `videos` dans le répertoire du projet
2. Placez vos vidéos à compresser dans le dossier `videos`
3. Lancez le script :
```bash
npm start
```

Le script va :
- Lire toutes les vidéos du dossier `videos`
- Les compresser en format WebM dans le dossier `compressed_videos`
- Créer un fichier `compressed_videos.zip` contenant toutes les vidéos compressées

## Configuration

Les paramètres de compression sont configurés dans le fichier `index.js` :

- Qualité vidéo : CRF 30 (plus la valeur est basse, meilleure est la qualité)
- Codec vidéo : VP9 (libvpx-vp9)
- Codec audio : Opus (libopus)

Pour modifier ces paramètres, éditez la fonction `compressVideo` dans `index.js`.

## Structure des dossiers

```
compressor/
├── videos/              # Dossier d'entrée pour les vidéos originales
├── compressed_videos/   # Dossier de sortie pour les vidéos compressées
├── compressed_videos.zip # Archive ZIP finale
├── index.js            # Script principal
├── package.json        # Configuration npm
└── README.md          # Ce fichier
```

## Dépannage

### Erreur "ffmpeg command not found"
- Vérifiez que FFmpeg est bien installé
- Assurez-vous que FFmpeg est dans votre PATH système

### Erreur lors de la compression
- Vérifiez que les fichiers vidéo ne sont pas corrompus
- Assurez-vous d'avoir les permissions nécessaires sur les dossiers
- Vérifiez l'espace disque disponible

## Licence

MIT 
