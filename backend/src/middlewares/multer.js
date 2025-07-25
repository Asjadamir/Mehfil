import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, "./public/temp");
    },

    filename: function (req, file, cd) {
        cd(null, Date.now() + "-" + file.originalname);
    },
});

export const upload = multer({ storage: storage });
