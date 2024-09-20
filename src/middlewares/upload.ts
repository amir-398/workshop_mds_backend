import multer from "multer";
import path from "path";

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Chemin vers le dossier public/images
    cb(null, path.join(__dirname, "../../public/images")); // Change le chemin vers public/images
  },
  filename: function (req, file, cb) {
    // Création d'un nom de fichier unique
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nom unique pour chaque image
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille (5 Mo)
});

export default upload;
