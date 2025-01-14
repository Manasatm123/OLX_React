import userSchema from "./models/user.model.js";
import userDataSchema from './models/UserData.js'
import postSchema from './models/post.model.js'
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import nodemailer from 'nodemailer'
import mongoose from "mongoose";
const { sign } = pkg;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manasaworkmail123@gmail.com",
    pass: "tcnb knag emrk elfs",
  },
});


export async function verifyEmail(req, res) {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    return res.status(500).send({ msg: "fields are empty" });
  }
  const user = await userSchema.findOne({ email });
  if (!user) {
    const info = await transporter.sendMail({
      from: "manasaworkmail123@gmail.com",
      to: email,
      subject: "verify",
      text: "VERIFY! your email",
      html: `
   <div style="text-align: center; margin-top: 50px;">
            <h2>Verify Your Email</h2>
            <p>Click the button below to verify your email and complete registration.</p>
            <a href="http://localhost:5173/Register"> 
               <button style="padding: 10px 50px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
              Verify Email</button>
            </a>
          </div>`,
    });
    console.log("Message sent: %s", info.messageId);
    res.status(201).send({ msg: "Verificaton email sented" });
  } else {
    return res.status(500).send({ msg: "email already exist" });
   
  }
}


export async function Register(req, res) {
  console.log(req.body);

  const { username, email, pwd, cpwd } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    if (!(username && email && pwd && cpwd))
      return res.status(500).send({ msg: "fields are empty" });
    if (pwd != cpwd) return res.status(500).send({ msg: "pass not match" });
    bcrypt
      .hash(pwd, 10)
      .then((hpwd) => {
        userSchema.create({ username, email, pass: hpwd });
        res.status(201).send({ msg: "Successfull" });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.status(500).send({ asd: "email already used " });
  }
}

export async function login(req, res) {
  console.log("hi");

  console.log(req.body);

  const { email, pass } = req.body;
  if (!(email && pass))
    return res.status(500).send({ msg: "fields are empty" });
  const user = await userSchema.findOne({ email });
  if (!user) return res.status(500).send({ msg: "email donot exist" });
  const success = await bcrypt.compare(pass, user.pass);

  if (success !== true)
    return res.status(500).send({ msg: "email or password not exist" });
  const token = await sign({ UserID: user._id }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });

  res.status(201).send({ token });
}


export async function getdata(req, res) {
  const data = await userSchema.findOne({ _id: req.user.UserID });
  res.status(200).send({ name: data.username});
}

export async function getUserData(req, res) {
  const usr = await userSchema.findOne({ _id: req.user.UserID });
  const data = await userDataSchema.findOne({ userId: req.user.UserID });
  if (!data) res.status(200).send({ usr });
  else {
    res.status(200).send({ usr, data });
  }
}

export async function addUserData(req, res) {
    
  try {
    const { district, place, pin, pic } = req.body
  await userDataSchema.create({userId:req.user.UserID, district, place, pin, pic})
    res.status(200).send({ msg: "Data added successfully!" })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: "Failed to add data. Please try again." })
  }
}

export async function editUserData(req, res) {
try {
  const { district, place, pin } = req.body
  const updatedData = await userDataSchema.updateOne({ userId: req.user.UserID },{ $set: { district, place, pin } },)
  res.status(200).send({ msg: "Data updated successfully!", data: updatedData })
} catch (error) {
  console.error(error)
  res.status(500).send({ msg: "Failed to update data. Please try again." })
}
}

export async function deleteUser(req, res) {
  try {
    await userDataSchema.deleteOne({userId:req.user.UserID})
    await postSchema.deleteOne({userId:req.user.UserID})
    await userSchema.deleteOne({ _id: req.user.UserID })
    res.status(200).send({ msg: "Data deleted successfully!"})
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: "Failed to delete data. Please try again." })
  }
} 

export async function addPost(req, res) {
  try {
    
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString(); 

    const {title,category,images,description,price}=req.body
    const post = await postSchema.create({userId: req.user.UserID, title, category, images, description, price, date, time});
    res.status(201).send({ msg: "Post added successfully!", data: post })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: "Failed to add data. Please try again." })
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await postSchema.find({ userId: req.user.UserID });
    if (!posts || posts.length === 0) {
      return res.status(200).send({ msg: "No posts found", data: [] });
    }
    res.status(200).send({ data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Failed to fetch posts. Please try again." });
  }
}

export async function getPost(req, res) {
  try {
    const post = await postSchema.findOne({_id: req.params.id});
    
    res.status(200).send({ post });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Failed to fetch post. Try again later." });
  }
}

export async function getAllPosts(req, res) {
  try {
    const posts = await postSchema.find();
    res.status(200).send({ data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Failed to fetch posts. Please try again." });
  }
}

export async function updatePost(req,res) {
const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString();

  const {title,category,images,description,price}=req.body
  await postSchema.updateOne({_id:req.params.id},{$set:{userId:req.user.UserID,title,category,images,description,price,date,time}}).then(()=>{
      res.status(201).send({msg:"updated"})
  }).catch((error)=>{
      res.status(500).send({error:error})  
  })  
}

export async function deletePost(req, res) {
try {
  const post = await postSchema.deleteOne({_id: req.params.id});
  res.status(200).send({ msg: "Post deleted successfully!" });
} catch (error) {
  console.error(error);
  res.status(500).send({ msg: "Failed to delete post. Try again later." });
}
}