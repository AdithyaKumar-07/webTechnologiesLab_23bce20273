// Select database
use vehicles

// Remove old collections to avoid duplicate outputs
db.two_wheelers.drop()
db.four_wheelers.drop()

// Create collections
db.createCollection("two_wheelers",{capped:true,size:50000})
db.createCollection("four_wheelers")

// Insert two wheeler details
db.two_wheelers.insertMany([
{bike_name:"Jupiter",model:"gearless",category:"110cc",colors_available:["white","blue"],manufacturer:"TVS",performance:8,timestamp:"2022",price:85000},
{bike_name:"Splendor",model:"gear",category:"100cc",colors_available:["black","red"],manufacturer:"Hero",performance:7,timestamp:"2021",price:75000},
{bike_name:"R15",model:"gear",category:"155cc",colors_available:["blue","black"],manufacturer:"Yamaha",performance:9,timestamp:"2023",price:180000},
{bike_name:"Duke",model:"gear",category:"200cc",colors_available:["orange","black"],manufacturer:"KTM",performance:9,timestamp:"2022",price:210000},
{bike_name:"Access",model:"gearless",category:"125cc",colors_available:["grey","white"],manufacturer:"Suzuki",performance:8,timestamp:"2020",price:90000}
])

// Insert four wheeler details
db.four_wheelers.insertMany([
{vehicle_name:"Baleno",model:"own",category:"car",variants:["zeta","petrol"],manufacturer:"Maruti",performance:8,timestamp:"2021",price:850000},
{vehicle_name:"Fortuner",model:"own",category:"car",variants:["diesel"],manufacturer:"Toyota",performance:9,timestamp:"2023",price:4200000},
{vehicle_name:"Scorpio",model:"own",category:"car",variants:["diesel"],manufacturer:"Mahindra",performance:9,timestamp:"2022",price:1800000},
{vehicle_name:"VolvoBus",model:"commercial",category:"bus",variants:["diesel"],manufacturer:"Volvo",performance:8,timestamp:"2020",price:6000000},
{vehicle_name:"EicherTruck",model:"commercial",category:"heavy truck",variants:["diesel"],manufacturer:"Eicher",performance:8,timestamp:"2022",price:3200000}
])

// Display all documents
db.two_wheelers.find()
db.four_wheelers.find()

// Display vehicle name and price
db.two_wheelers.find({}, {bike_name:1,price:1,_id:0})
db.four_wheelers.find({}, {vehicle_name:1,price:1,_id:0})

// Display two wheelers from Honda
db.two_wheelers.find({manufacturer:"Honda"})

// Display four wheelers with diesel variant
db.four_wheelers.find({variants:"diesel"})

// Display vehicles with performance greater than 5
db.two_wheelers.find({performance:{$gt:5}},{bike_name:1,category:1,manufacturer:1,_id:0})
db.four_wheelers.find({performance:{$gt:5}},{vehicle_name:1,category:1,manufacturer:1,_id:0})