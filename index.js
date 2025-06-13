const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const archiver = require('archiver');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const INPUT_DIR = './videos'; // Dossier contenant les vidéos originales
const OUTPUT_DIR = './compressed_videos'; // Dossier pour les vidéos compressées
const ZIP_FILE = './compressed_videos.zip'; // Nom du fichier ZIP final

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// Fonction pour compresser une vidéo en WebM
async function compressVideo(inputPath, outputPath) {
    try {
        const command = `ffmpeg -i "${inputPath}" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "${outputPath}"`;
        await execPromise(command);
        console.log(`Compression terminée pour: ${path.basename(inputPath)}`);
    } catch (error) {
        console.error(`Erreur lors de la compression de ${inputPath}:`, error);
    }
}

// Fonction pour créer le fichier ZIP
async function createZip() {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(ZIP_FILE);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Niveau de compression maximum
        });

        output.on('close', () => {
            console.log(`Archive ZIP créée: ${ZIP_FILE}`);
            console.log(`Taille totale: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
            resolve();
        });

        archive.on('error', (err) => {
            reject(err);
        });

        archive.pipe(output);
        archive.directory(OUTPUT_DIR, false);
        archive.finalize();
    });
}

// Fonction principale
async function main() {
    try {
        // Lire tous les fichiers du dossier d'entrée
        const files = fs.readdirSync(INPUT_DIR);
        
        // Filtrer pour ne garder que les fichiers vidéo
        const videoFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.mp4', '.avi', '.mov', '.mkv', '.wmv'].includes(ext);
        });

        console.log(`${videoFiles.length} vidéos trouvées. Début de la compression...`);

        // Compresser chaque vidéo
        for (const file of videoFiles) {
            const inputPath = path.join(INPUT_DIR, file);
            const outputPath = path.join(OUTPUT_DIR, `${path.parse(file).name}.webm`);
            await compressVideo(inputPath, outputPath);
        }

        console.log('Compression des vidéos terminée. Création du ZIP...');
        
        // Créer le fichier ZIP
        await createZip();
        
        console.log('Traitement terminé avec succès!');
    } catch (error) {
        console.error('Erreur lors du traitement:', error);
    }
}

// Exécuter le script
main();
