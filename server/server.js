const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const helmet=require('helmet');
const morgan=require('morgan');
const userRoute=require('./routes/users');
const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts');
const commentRoute=require('./routes/commets');
const cors=require('cors');
const multer=require('multer');
const path=require('path');
const User=require('./models/Users');

dotenv.config();
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/imagesProfile", express.static(path.join(__dirname, "public/imagesProfile")));
app.use("/imagesCover", express.static(path.join(__dirname, "public/imagesCover")));
app.use(cors());


const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/post',postRoute);
app.use('/api/comment',commentRoute);




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imagesProfile");
  },
  
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imagesCover");
  },
  
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});


const upload = multer({ storage: storage });
const uploadProfile = multer({ storage: storage2 });
const uploadCover = multer({ storage: storage3 });


app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");

  } catch (error) {
    console.error(error);
  }
});





app.post('/api/uploadProfilePicture', uploadProfile.single('file'), async (req, res, ) => {
  try {
    const userId = req.body.userId;
    const newProfilePicturePath = `${req.file.filename}`;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findOneAndUpdate({ _id: userId }, { profilePicture: newProfilePicturePath });

    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/uploadCoverPicture', uploadCover.single('file'), async (req, res, ) => {

  try {
    const userId = req.body.userId;
    const newProfilePicturePath = `${req.file.filename}`;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findOneAndUpdate({ _id: userId }, { coverPicture: newProfilePicturePath });

    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


//get all users

app.get('/api/users', async (req, res) => {

const db = mongoose.connection;

  let users=[];
  db.collection('users')
  .find()
  .forEach(user=>users.push(user))
  .then(()=>{
    res.status(200).json(users);
  })
  .catch(()=>{
    res.status(500).json({error:"Internal server error"});
  })
  
  
  });


  app.get('/api/posts', async (req, res) => {
     db = mongoose.connection;
    let posts=[];
    db.collection('posts')
    .find()
    .forEach(post=>posts.push(post))
    .then(()=>{
      res.status(200).json(posts);
    })
    .catch(()=>{
      res.status(500).json({error:"Internal server error"});
    })
  })



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});




