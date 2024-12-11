import { Router } from "express";

import Auth from "./authentication/Auth.js";
import * as rh from './requesthandler.js'

const router=Router();
router.route('/verify').post(rh.verifyEmail)
router.route('/register').post(rh.Register)
router.route('/login').post(rh.login)
router.route("/getdata").get(Auth,rh.getdata)
router.route('/getuserData').get(Auth,rh.getUserData)
router.route('/adduserData').post(Auth,rh.addUserData)
router.route('/edituserData').put(Auth,rh.editUserData)
router.route('/deleteData').delete(Auth,rh.deleteUser)
router.route('/addPost').post(Auth,rh.addPost)
router.route('/getPosts').get(Auth, rh.getPosts)
router.route('/getAllPosts').get(Auth, rh.getAllPosts)
router.route('/getPost/:id').get(Auth, rh.getPost)
router.route('/updatePost/:id').put(Auth,rh.updatePost)
router.route('/deletePost/:id').delete(Auth, rh.deletePost)


export default router