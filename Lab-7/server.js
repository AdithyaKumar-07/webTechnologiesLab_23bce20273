const express=require("express")
const {MongoClient,ObjectId}=require("mongodb")
const bodyParser=require("body-parser")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

const client=new MongoClient("mongodb://localhost:27017")

let db

async function connectDB(){
 await client.connect()
 db=client.db("studentNotesDB")
 console.log("MongoDB connected")
}

connectDB()

// ---------------------
// QUESTION 1
// STUDENT NOTES CRUD
// ---------------------

// Add Note
app.post("/notes",async(req,res)=>{
 const note=req.body
 note.created_date=new Date()

 await db.collection("notes").insertOne(note)

 res.send("Note Added")
})

// View Notes
app.get("/notes",async(req,res)=>{
 const notes=await db.collection("notes").find().toArray()
 res.json(notes)
})

// Update Note
app.put("/notes/:id",async(req,res)=>{
 const id=req.params.id

 await db.collection("notes").updateOne(
 {_id:new ObjectId(id)},
 {$set:req.body}
 )

 res.send("Note Updated")
})

// Delete Note
app.delete("/notes/:id",async(req,res)=>{
 const id=req.params.id

 await db.collection("notes").deleteOne(
 {_id:new ObjectId(id)}
 )

 res.send("Note Deleted")
})


// ---------------------
// QUESTION 2
// ONLINE BOOK FINDER
// ---------------------

// Search Books by Title
app.get("/books/search",async(req,res)=>{
 const title=req.query.title

 const books=await db.collection("books").find({
  title:{$regex:title,$options:"i"}
 }).toArray()

 res.json(books)
})

// Filter Books by Category
app.get("/books/category/:category",async(req,res)=>{
 const category=req.params.category

 const books=await db.collection("books").find({
  category:category
 }).toArray()

 res.json(books)
})

// Sort Books by Price
app.get("/books/sort/price",async(req,res)=>{
 const books=await db.collection("books")
 .find()
 .sort({price:1})
 .toArray()

 res.json(books)
})

// Sort Books by Rating
app.get("/books/sort/rating",async(req,res)=>{
 const books=await db.collection("books")
 .find()
 .sort({rating:-1})
 .toArray()

 res.json(books)
})

// Top Rated Books
app.get("/books/top",async(req,res)=>{
 const books=await db.collection("books")
 .find({rating:{$gte:4}})
 .limit(5)
 .toArray()

 res.json(books)
})

// Pagination
app.get("/books",async(req,res)=>{
 const page=parseInt(req.query.page)||1
 const limit=5

 const books=await db.collection("books")
 .find()
 .skip((page-1)*limit)
 .limit(limit)
 .toArray()

 res.json(books)
})


// ---------------------
// START SERVER
// ---------------------

app.listen(3000,()=>{
 console.log("Server running on port 3000")
})