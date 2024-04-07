import express from "express"
import { getAllUsers, createUser, nothingSpecial, getUserById} from "../controllers/user.js";
const router = express.Router();


// when we hit an endpoint(a url) in browser by typing the url in the browser it always hits a get 
//request until and unless we explicitly mention method = "post" before hitting the end point.
//Therefore we will need frontend to test this api. Here comes postman for our help, it hits post 
//requests in our browser without need of frontend 
router.post("/new", register);
router.post("/login", register);

//will fire for urls like http://localhost:4000/users/userid/660948bfa7ad348ed4452152 and http://localhost:4000/users/userid/special 
//but since it is defined below server.get("/userid/special", async(req,res) and the above api will 
// get executed first this will not get executed
router.get("/userid/:id", getUserDetails);


//will fire for urls like http://localhost:4000/users/all and http://localhost:4000/users/all?abc=xyz&pqr=mno&....

router.get("/all", getAllUsers);

export default router;