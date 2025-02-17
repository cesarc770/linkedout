const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const mongoose = require("mongoose");
const db = require("../../models");
let session = require("express-session");
let MongoStore = require("connect-mongo")(session);

const AWS = require('aws-sdk');
const multer = require('multer');
const S3_BUCKET = "linekdoutv2";
const S3_REGION = "us-west-2";
const URL_PREFIX = "http://s3." + S3_REGION + ".amazonaws.com/"+ S3_BUCKET;

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;


AWS.config.accessKeyId = AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = AWS_SECRET_ACCESS_KEY;
AWS.config.region = S3_REGION;
const s3 = new AWS.S3();

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
    storage: multer.memoryStorage(),
    // file size limitation in bytes
    limits: {fileSize: 52428800},
});

mongoose.Promise = global.Promise;
router.use(session({
    secret: 'dont die',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        url: process.env.MONGODB_URI || "mongodb://localhost/linkedOut"
    }),
    httpOnly: true,
    secure: false,
    maxAge: null,
    path: "/"
}));

// Matches with "/api/users"
router.route("/")
    .get(function (req, res) {
        usersController.findAll(req, res);
    });

router.post("/", upload.single('theseNamesMustMatch'), (req, res) => {
    console.log("... made it to the post...");
    db.user.create(JSON.parse(req.body.newUser))
        .then(dbModel => {
            if (req.file == null) { // if no file was input
                return res.json(dbModel);
            }
            let mimetype = req.file.mimetype;
            let arr = mimetype.split("/");
            let keyname = dbModel._id + "." + arr[1];
            let userId = dbModel._id;
            s3.putObject({
                Bucket: S3_BUCKET,
                Key: keyname,
                Body: req.file.buffer,
                ACL: 'public-read', // your permisions
            }, (err) => {
                if (err) {
                    console.log("... errr...");
                    console.log(err);
                    return res.status(400).send(err);
                }
                let url = URL_PREFIX + "/" + keyname;
                db.user
                    .findOneAndUpdate({_id: userId}, {$set:{image_url: url}}, {new: true})
                    .then(dbUpdate => {
                        req.session.userId = dbUpdate._id;
                        res.json(dbUpdate);
                    })
                    .catch(err => {
                        console.log(".... err on userupdate");
                        console.log(err);
                        res.status(422).json(err)
                    });
            });
        })
        .catch(err => {
            console.log("... errr creating user....");
            console.log(err);
            res.status(422).json(err)
        });
});

router.put("/img", upload.single('theseNamesMustMatch'), (req, res) => {
    db.user.findOne({_id: req.session.userId})
        .then(dbModel => {
            if (req.file == null) { // if no file was input
                return res.json(dbModel);
            }
            let mimetype = req.file.mimetype;
            let arr = mimetype.split("/");
            let keyname = dbModel._id + "." + arr[1];
            let userId = dbModel._id;
            s3.putObject({
                Bucket: S3_BUCKET,
                Key: keyname,
                Body: req.file.buffer,
                ACL: 'public-read', // your permisions
            }, (err) => {
                if (err) {
                    console.log("... errr...");
                    console.log(err);
                    return res.status(400).send(err);
                }
                let url = URL_PREFIX + keyname;
                db.user
                    .findOneAndUpdate({_id: userId}, {$set:{image_url: url}}, {new: true})
                    .then(dbUpdate => {
                        req.session.userId = dbUpdate._id;
                        res.json(dbUpdate);
                    })
                    .catch(err => {
                        console.log(".... err on userupdate");
                        console.log(err);
                        res.status(422).json(err)
                    });
            });
        })
        .catch(err => {
            console.log("... errr creating user....");
            console.log(err);
            res.status(422).json(err)
        });
});

router.route("/login")
    .post(function (req, res) {
        usersController.login(req, res);
    })
    .get(function (req, res) {
        usersController.ActiveLogin(req, res);
    })
    .delete(function (req, res, next) {
        usersController.logout(req, res)
    });

router.route("/:id/languages")
    .put(function (req, res) {
        usersController.updateLanguages(req, res);
    })
    .post(function (req, res) {
        usersController.replaceLanguages(req, res);
    });

router.route("/:id/edit")
    .post(function (req, res) {
        usersController.updateUser(req, res);
    });

router.route("/addPost")
    .post(function (req, res) {
        usersController.addPost(req, res);
    });

router.route("/posts")
    .get(function (req, res) {
        usersController.findRecentPosts(req, res);
    });

router.route("/comment/:postid")
    .post(function (req, res) {
        usersController.addComment(req, res);
    });



router.route("/addPost");
router.route("/:id/newProject")
    .put(function (req, res) {
        usersController.newProject(req, res);
    })
    .post(function (req, res) {
        usersController.newProject(req, res);
    });

router.route("/:id/removeProject/:projectName")
    .put(function (req, res) {
        usersController.removeProject(req, res);
    });
// Matches with "/api/users/:id"
router
    .route("/:id")
    .get(function (req, res) {
        usersController.findById(req, res);
    })
    .put(function (req, res) {
        usersController.update(req, res);
    })
    .delete(usersController.remove);

    router.route("/connections/add/:id")
    .post(function(req, res) {
        usersController.addConnection(req, res);
    })

module.exports = router;
