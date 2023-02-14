const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const validUser = require("../models/validUser");
const ValidUser = require("../models/validUser");
const Note = require("../models/note");
//Storage Engine
//We donot go through all the code with upload in storage if no file is selected
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join("public", Note.notesBasePath);
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    if (file != null) {
      const fileName =
        file.fieldname + "-" + Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    } else {
      cb(new Error("Please select a file"));
      //This error is passed through to the upload middleware
    }
  },
});

//Multer Setup
function checkExtAndMimeType(file, cb) {
  //Check for extname
  //Only allow images and pdfs
  const validExtName = new RegExp(/pdf|docx|png|jpeg|jpg|pdf/);
  const hasValidExt = validExtName.test(
    path.extname(file.originalname.toLowerCase())
  );
  //Check for mime type
  const validMimeTypes = new RegExp(/^image\/(jpeg|png|gif|bmp)/);

  //Only allow images and pdfs
  const hasValidMimeType = validMimeTypes.test(file.mimetype);
  const hasValidMimeTypeForReal =
    hasValidMimeType || file.mimetype == "application/pdf";

  //Combine the logic
  const isValidFile = hasValidExt && hasValidMimeTypeForReal;
  if (!isValidFile) {
    cb(new Error("Invalid File Format"));
  } else {
    cb(null, true);
  }

  //Trigger callbacks
}
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkExtAndMimeType(file, cb);
  },
}).single("noteFile");

//We pass all the teachers here and use that to render a card for each of them
//Which will have Name of theirs,Title of theirs, their phone number,their email,their facebook link and notes button
router.get("/", async (req, res) => {
  const teachers = await ValidUser.find({ userType: "teacher" });
  res.render("teachers/teachers", { RenderingURL: req.originalUrl, teachers });
});

//Getting all notes for a teacher
router.get("/:id/notes", async (req, res) => {
  //Req.params.id will tell us whose notes page we are trying to access
  //We can pass this to notes page so that we can decide whther the id of the user trying to acess this page
  //matches to the id of teacher who is owner of this page
  const notes = await Note.find({ publisherId: req.params.id }).sort({
    publishedAt: -1,
  });
  const proprietaryTeacher = await validUser.findOne({ _id: req.params.id });
  res.render("teachers/notes/notes", {
    req: req,
    proprietaryTeacher,
    notes: notes,
  });
});

// Adding a note Form for a teacher
router.get("/:id/notes/new", async (req, res) => {
  const proprietaryTeacher = await validUser({ _id: req.params.id });
  const note = new Note();
  res.render("teachers/notes/new", { proprietaryTeacher, note });
});

//Creating a new note
router.post("/:id/notes", (req, res) => {
  upload(req, res, async (err) => {
    let note = new Note({
      title: req.body.title,
      description: req.body.description,
      subject: req.body.subject,
      faculty: req.body.faculty,
      semester: req.body.semester,
      publisherId: req.user._id, //or req.params.id since they need to be equal for this post request to pass
      filePath: req.file
        ? path.join(Note.notesBasePath, req.file.filename)
        : null,
    });

    if (err || !req.file) {
      //err will be defined if the file was selected but is invalid by extension name or sizelimit
      //but if the file is not selected, we set the error to be no file selected error
      if (!err) {
        err = "No file selected";
      }
      res.render(`teachers/notes/new`, {
        note: note,
        ErrorMessage: err,
        proprietaryTeacher: { _id: note.publisherId },
      });
    } else {
      //If there are no error while adding files to the server
      await note.save();
      res.redirect(`/teachers/${note.publisherId}/notes`);
    }
  });
});

//Delete a note
router.delete("/:teacherId/notes/:noteId", (req, res) => {
  Note.findOneAndDelete(
    { publisherId: req.params.teacherId, _id: req.params.noteId },
    (err) => {
      if (err) {
        console.log("Error in route for deleting a note");
        console.log(err);
      } else {
        res.redirect(`/teachers/${req.params.teacherId}/notes`);
      }
    }
  );
});
//We will add a middleware to all the routes that will check whether the userId of the current user is same as that of
//The id parameter in the request, if it is not, we will give unauthorized access error
module.exports = router;
