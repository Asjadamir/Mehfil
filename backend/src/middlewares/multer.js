import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, "./public/temp");
    },

    filename: function (req, file, cd) {
        cd(null, Date.now() + "-" + path.extname(file.originalname));
    },
});

export const upload = multer({ storage });
