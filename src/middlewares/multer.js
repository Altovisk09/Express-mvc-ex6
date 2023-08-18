const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
    let caminho = path.resolve(__dirname, '../../public/images/avatars');
    cb(null, caminho);
    },
    filename:(req, file, cb) => {
        let nome = "image" + Date.now() + path.extname(file.originalname);
        cb(null, nome)
    }
    
});

const upload = multer({storage: storage})

module.exports = upload;