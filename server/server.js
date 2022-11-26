const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
var {ObjectId} = require('mongodb');
var bcrypt = require("bcryptjs");


    

const app = express();


var corsOptions = {
  //origin: "http://localhost:8081"
  origin: "http://localhost:3000",
  credentials:true ,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

const Role = db.role;
const User = db.user;
const Category = db.category;
const Subcategory = db.subcategory;
const Product = db.product;
const Order = db.order;
//const Brand = db.brand;



db.mongoose

  .connect('mongodb://localhost:27017/amazonClone',{
  //.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to amazon clone application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/subcategory.routes")(app);
//require("./app/routes/brand.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/payment.routes")(app);


// set port, listen for requests
//const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// initialize data
function initial() {
  //add thress type users
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
      
      new Role({
        name: "seller"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'seller' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });

  // User.estimatedDocumentCount((err, count) => {
  //   if (!err && count === 0) {
  //     new User({
  //       username: "admin",
  //       email: "admin@email.com",
  //       password: bcrypt.hashSync("password", 8)
  //     }).save(err => {
  //       if (err) {
  //         console.log("error", err);
  //       }

  //       console.log("added 'admin' to users collection");
  //     });     

  //   }
  // });

  /*Brand.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
     
      new Brand({
        name: "cetaphil",
        image:"https://images-na.ssl-images-amazon.com/images/G/15/img16/beauty/icon/1016927_ca_beauty_cetaphil_750x375.jpg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'cetaphil' to brands collection");
      });
      
      new Brand({
        name: "The body shop",
        image:"https://images-na.ssl-images-amazon.com/images/G/15/img17/beauty/content-grid/thebodyshop_logo-tile_680x295.jpg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'the body shop' to brands collection");
      });

      new Brand({
        name: "Cover Girl",
        image:"https://images-na.ssl-images-amazon.com/images/G/15/img17/beauty/other/1073586_ca_beauty_logo_covergirl.jpg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'cover girl' to brands collection");
      });

      new Brand({
        name: "Sally Hansna",
        image:"https://images-na.ssl-images-amazon.com/images/G/15/img17/beauty/other/1073586_ca_beauty_logo_sally_hansen.jpg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Sally Hansna' to brands collection");
      });

      new Brand({
        name: "Poactive",
        image:"https://images-na.ssl-images-amazon.com/images/G/15/img16/beauty/icon/1016927_ca_beauty_proactiv_750x375.jpg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'poactive' to brands collection");
      });

      new Brand({
        name: "Philps",
        image:"https://images-na.ssl-images-amazon.com/images/G/15/img17/beauty/other/1027538_ca_beauty_logo_philips_680x295.jpg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added '' to brands collection");
      });

      new Brand({
        name: "Molblly",
        image:"https://images-na.ssl-images-amazon.com/images/G/15/img17/beauty/other/1027538_ca_beauty_logo_philips_680x295.jpg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Molblly' to brands collection");
      });

      new Brand({
        name: "FDW",
        image:"https://images-na.ssl-images-amazon.com/images/G/15/img17/beauty/other/1027538_ca_beauty_logo_philips_680x295.jpg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'FDW' to brands collection");
      });
      
      
      new Brand({
        name: "Ergonomic",
        image:"https://images-na.ssl-images-amazon.com/images/G/15/img17/beauty/other/1027538_ca_beauty_logo_philips_680x295.jpg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Ergonomic' to brands collection");
      });
    }
  });*/

  Category.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      
      new Category({
        name: "Furniture",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1001488_ca_home_cg_homepage_750x375_furniture.jpg", 
        isActive:  true ,      
        categoryNumber:1          
      }).save(err => {
        if (err) {
          console.log("add category error", err);
        }
        console.log("added 'furniture' to categories collection");
      });

      new Category({
        name: "Arts Crafts & Sewing",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1001488_ca_home_cg_homepage_750x375_art.jpg", 
        isActive:  true  ,      
        categoryNumber:2 
      }).save(err => {
        if (err) {
          console.log("add category error", err);
        }
        console.log("added 'Arts Crafts & Sewing' to categories collection");
      });

      new Category({
        name: "Bedding",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1001488_ca_home_cg_homepage_750x375_bedding.jpg", 
        isActive:  true,      
        categoryNumber:3
      }).save(err => {
        if (err) {
          console.log("add category error", err);
        }
        console.log("added 'Bedding' to categories collection");
      });

      new Category({
        name: "Bath",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1001488_ca_home_cg_homepage_750x375_bath.jpg", 
        isActive:  true,      
        categoryNumber:4 
      }).save(err => {
        if (err) {
          console.log("add category error", err);
        }
        console.log("added 'Bath' to categories collection");
      });

      new Category({
        name: "Vacuums & Floor Care",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1001488_ca_home_cg_homepage_750x375_vacuum.jpg", 
        isActive:  true,      
        categoryNumber:5
      }).save(err => {
        if (err) {
          console.log("add category error", err);
        }
        console.log("added 'Vacuums & Floor Care' to categories collection");
      });

      new Category({
        name: "Kitchen & Dining",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1001488_ca_home_cg_homepage_750x375_kitchen.jpg", 
        isActive:  true,      
        categoryNumber:6
      }).save(err => {
        if (err) {
          console.log("add category error", err);
        }
        console.log("added 'Irons & Clothing Steamers' to categories collection");
      });

      new Category({
        name: "Heating Cooling & Air Quality",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1008712_CA_home_fall_cg_750x375_air.jpg", 
        isActive:  true,      
        categoryNumber:7 
      }).save(err => {
        if (err) {
          console.log("add category error", err);
        }
        console.log("added 'Heating Cooling & Air Quality' to categories collection");
      });

      new Category({
        name: "Décor",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1001488_ca_home_cg_homepage_750x375_decor.jpg", 
        isActive:  true,      
        categoryNumber:8 
      }).save(err => {
        if (err) {
          console.log("add category error", err);
        }
        console.log("added 'Décor' to categories collection");
      });

      new Category({
        name: "Storage & Organizatione",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1001488_ca_home_cg_homepage_750x375_storage.jpg", 
        isActive:  true,      
        categoryNumber:9 
      }).save(err => {
        if (err) {
          console.log("add category error", err);
        }
        console.log("added 'Storage & Organizatione' to categories collection");
      });
    }
  });

  Subcategory.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) { 
      new Subcategory({
        name: "Bedroom Furniture",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1002482_ca_home_furniture_cg_750x375_bedroom.jpg",
        isActive:  true ,
        categoryNumber: 1 ,
        subcategoryNumber: 11   
        
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Bedroom Furniture' to subcategories collection");
      });

      new Subcategory({
        name: "Dining Room Furniture",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1002482_ca_home_furniture_cg_750x375_dining.jpg", 
        isActive:  true ,  
        categoryNumber: 1  ,
        subcategoryNumber: 12
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Dining Room Furniture' to subcategories collection");
      });

      new Subcategory({
        name: "Home Office Furniture",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/home/content-grid/1002482_ca_home_furniture_cg_750x375_office.jpg", 
        isActive:  true ,  
        categoryNumber: 1,
        subcategoryNumber: 13     
    
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Home Office Furniture' to subcategories collection");
      });

      /*new Subcategory({
        name: "Living Room Furniture",
        image: "", 
        isActive:  true ,  
        categoryNumber: 1  
      }).save(err => {
        if (err) {
          console.log("add category error", err);
        }
        console.log("added 'Living Room Furniture' to subcategories collection");
      });*/

      

      new Subcategory({
        name: "Craft Supplies",
        image: "https://images-na.ssl-images-amazon.com/images/I/418TU6dWP6L._AC._SR240,240.jpg", 
        isActive:  true , 
        categoryNumber: 2 ,
        subcategoryNumber: 21    
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Craft Supplies' to subcategories collection");
      });

      new Subcategory({
        name: "Scrapbooking",
        image: "https://images-na.ssl-images-amazon.com/images/I/51qiDJqXbuL._AC._SR240,240.jpg", 
        isActive:  true ,
        categoryNumber: 2 ,
        subcategoryNumber: 22  
     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Scrapbooking' to subcategories collection");
      });

      new Subcategory({
        name: "Painting & Drawing",
        image: "https://images-na.ssl-images-amazon.com/images/I/31TznHBwDNL._AC._SR240,240.jpg", 
        isActive:  true ,
        categoryNumber: 2 ,
        subcategoryNumber: 23   
     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Painting & Drawing' to subcategories collection");
      });
      /*new Subcategory({
        name: "Knitting and Crochet",
        image: "", 
        isActive:  true,    
        productList: []  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Knitting and Crochet' to subcategories collection");
      });
      new Subcategory({
        name: "Art Furniture & Storage",
        image: "", 
        isActive:  true,    
        productList: []  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Art Furniture & Storage' to subcategories collection");
      });
      new Subcategory({
        name: "Sewing",
        image: "", 
        isActive:  true,    
        productList: []  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Sewing' to subcategories collection");
      });
      new Subcategory({
        name: "Jewelry & Beading",
        image: "", 
        isActive:  true,    
        productList: []  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Jewelry & Beading' to subcategories collection");
      });*/



      new Subcategory({
        name: "Pillows",
        image: "https://images-na.ssl-images-amazon.com/images/I/31j5fXmS6ML._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 3 ,
        subcategoryNumber: 31     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Pillows' to subcategories collection");
      });

      new Subcategory({
        name: "Duvet Covers & Sets",
        image: "https://images-na.ssl-images-amazon.com/images/I/51hfYugobbL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 3  ,
        subcategoryNumber: 32 
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Duvet Covers & Sets' to subcategories collection");
      });

      new Subcategory({
        name: "Comforters & Sets",
        image: "https://images-na.ssl-images-amazon.com/images/I/51Rt0Wr7+ML._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 3 ,
        subcategoryNumber: 33  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Comforters & Sets' to subcategories collection");
      });

      /*new Subcategory({
        name: "Sheets & Pillowcases",
        image: "", 
        isActive:  true,    
        productList: []  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Sheets & Pillowcases' to subcategories collection");
      });
      new Subcategory({
        name: "Mattress Pads",
        image: "", 
        isActive:  true,    
        productList: []  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Mattress Pads' to subcategories collection");
      });      
      new Subcategory({
        name: "Mattresses",
        image: "", 
        isActive:  true,    
        productList: []  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Mattresses' to subcategories collection");
      });
      new Subcategory({
        name: "Blankets & Throws",
        image: "", 
        isActive:  true,    
        productList: []  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Blankets & Throws' to subcategories collection");
      });*/    


      new Subcategory({
        name: "Bath Towels",
        image: "https://images-na.ssl-images-amazon.com/images/I/514slrGuq5L._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 4  ,
        subcategoryNumber: 41     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Bath Towels' to subcategories collection");
      });

      new Subcategory({
        name: "Bath Rugs",
        image: "https://m.media-amazon.com/images/I/514IDowAebL._AC._SR360,460.jpg", 
        isActive:  true,    
        categoryNumber: 4 ,
        subcategoryNumber: 42     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Bath Rugs' to subcategories collection");
      });


      new Subcategory({
        name: "Vacuums",
        image: "https://images-na.ssl-images-amazon.com/images/I/31xMh74zuCL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 5 ,
        subcategoryNumber: 51  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Vacuums' to subcategories collection");
      });
      new Subcategory({
        name: "Vacuum Accessories",
        image: "https://images-na.ssl-images-amazon.com/images/I/41duq8262zL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 5 ,
        subcategoryNumber: 52     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Vacuum Accessories' to subcategories collection");
      });
      new Subcategory({
        name: "Hard Floor Cleaners Mops & Brooms",
        image: "https://images-na.ssl-images-amazon.com/images/I/51zdCohP0lL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 5 ,
        subcategoryNumber: 53    
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Hard Floor Cleaners Mops & Brooms' to subcategories collection");
      });

      new Subcategory({
        name: "Steam Cleaners & Accessories",
        image: "https://images-na.ssl-images-amazon.com/images/I/41iXROIiKAS._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 5 ,
        subcategoryNumber: 54     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Steam Cleaners & Accessories' to subcategories collection");
      });

      new Subcategory({
        name: "Bakeware",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/kitchen/content-grid/1008707_ca_kitchen_homepage_tile_cg_750x375_bakeware.jpg", 
        isActive:  true,    
        categoryNumber: 6 ,
        subcategoryNumber: 61     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Bakeware' to subcategories collection");
      });

      new Subcategory({
        name: "Cookware",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/kitchen/content-grid/1008707_ca_kitchen_homepage_tile_cg_750x375_cookware.jpg", 
        isActive:  true,    
        categoryNumber: 6  ,
        subcategoryNumber: 62    
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Cookware' to subcategories collection");
      });

      new Subcategory({
        name: "Coffee, Tea & Espresso",
        image: "https://images-na.ssl-images-amazon.com/images/G/15/img16/kitchen/content-grid/1008707_ca_kitchen_homepage_tile_cg_750x375_coffee.jpg", 
        isActive:  true,    
        categoryNumber: 6  ,
        subcategoryNumber: 63    
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Coffee, Tea & Espresso' to subcategories collection");
      });
    
      new Subcategory({
        name: "Air Conditioners",
        image: "https://images-na.ssl-images-amazon.com/images/I/41RF+ulpHML._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 7  ,
        subcategoryNumber: 71    
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Air Conditioners' to subcategories collection");
      });

      new Subcategory({
        name: "Fans",
        image: "https://images-na.ssl-images-amazon.com/images/I/41z-nsjq0NL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 7 ,
        subcategoryNumber: 72     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Fans' to subcategories collection");
      }); 

      new Subcategory({
        name: "Space Heaters",
        image: "https://images-na.ssl-images-amazon.com/images/I/51Qrv5PaXDL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 7,
        subcategoryNumber: 73      
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Space Heaters' to subcategories collection");
      });

      new Subcategory({
        name: "Humidifiers",
        image: "https://images-na.ssl-images-amazon.com/images/I/31SF6he80OL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 7 ,
        subcategoryNumber: 74      
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Humidifiers' to subcategories collection");
      });

      
      /*new Subcategory({
        name: "Dehumidiers",
        image: "", 
        isActive:  true,    
        categoryNumber: 8  
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Dehumidiers' to subcategories collection");
      });

      
      new Subcategory({
        name: "Air Purifiers",
        image: "", 
        isActive:  true,    
        categoryNumber: 8   
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Air Purifiers' to subcategories collection");
      });*/

      new Subcategory({
        name: "Area Rugs & Pads",
        image: "https://images-na.ssl-images-amazon.com/images/I/51UKITb3LgL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 8 ,
        subcategoryNumber: 81     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Area Rugs & Pads' to subcategories collection");
      });

      
      new Subcategory({
        name: "Candles & Holders",
        image: "https://images-na.ssl-images-amazon.com/images/I/61ObBonaf3L._AC._SR360,460.jpg", 
        isActive:  true,    
        categoryNumber: 8 ,
        subcategoryNumber: 82     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Candles & Holders' to subcategories collection");
      });

      
      new Subcategory({
        name: "Clocks",
        image: "https://images-na.ssl-images-amazon.com/images/I/415s0dg11-L._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 8 ,
        subcategoryNumber: 83     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Clocks' to subcategories collection");
      });

      
      new Subcategory({
        name: "Photo Frames",
        image: "https://images-na.ssl-images-amazon.com/images/I/21NSnmeygVL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 8 ,
        subcategoryNumber: 84     
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Photo Frames' to subcategories collection");
      });

      




      new Subcategory({
        name: "Kitchen Organization",
        image: "https://images-na.ssl-images-amazon.com/images/I/51MsVGkFUcS._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 9,
        subcategoryNumber: 91       
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Kitchen Organization' to subcategories collection");
      });

      
      new Subcategory({
        name: "Clothing & Closet Organization",
        image: "https://images-na.ssl-images-amazon.com/images/I/41J2UKLfC+L._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 9 ,
        subcategoryNumber: 92       
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Clothing & Closet Organization' to subcategories collection");
      });

      
      new Subcategory({
        name: "Laundry Storage",
        image: "https://images-na.ssl-images-amazon.com/images/I/419yye13qsL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 9 ,
        subcategoryNumber: 93       
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Laundry Storage' to subcategories collection");
      });

      new Subcategory({
        name: "Shelves Racks & Drawers",
        image: "https://images-na.ssl-images-amazon.com/images/I/41HdCmMpsBL._AC._SR240,240.jpg", 
        isActive:  true,    
        categoryNumber: 9 ,
        subcategoryNumber: 94       
      }).save(err => {
        if (err) {
          console.log("add subcategory error", err);
        }
        console.log("added 'Shelves Racks & Drawers' to subcategories collection");
      });

    }
  });

  Product.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
   
      new Product({
        name: "Molblly Queen Bed Frame Premium Upholstered Platform Beds with Strong Wood Slat Support and No Box Spring Needed,Easy Assembly/Queen Size Bed Blue(60”*80”",
        description: "👍[Premium Materials] The platform bed frame profileis and foot made of high hardness metal.The soft-packed part of bed frames’ padded are made of high-quality linen fabric wrapped. It can reduce noise and give you a quiet and comfortable resting environment."
        +"/n🏆[Unique Design] The cushions are more comfortable and softer than other bed headboard cushions.The cushions can be adjusted to different heights to meet various needs and also be disassembled and cleaned."
        +"/n👉[Durable Construction] The bed slats are made of strong hardwood slats are spaced 3.2-3.7 inches and nine leg support for durabilityapart to support the life of the mattress and ensure durability and support.The 45-degree curved ribbed bed board uses the principle of mechanical dispersion, and each bed board is evenly stressed."
        +"/n🔔[Strong Bearing] Twin size supports a maximum weight capacity of 280kgs, while all other sizes can support up to 480kgs"
        +"/n🔑{Easily Assembled} Tools and instructions book of this bed frame are packed in a box.Installation video is attached for reference.If you need our help, please feel free to contact us (24/7)",
        image: "https://m.media-amazon.com/images/I/81jy-TLZSDL._AC_SX679_.jpg" ,
        brand:"Molblly",
        categoryNumber: 1,      
        subcategoryNumber: 11,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Molblly Queen Bed' to products collection");
      });

      new Product({
        name: "FDW Dining Table Set Dining Table Dining Room Table Set for Small Spaces Kitchen Table and Chairs for 4 Table with Chairs Home Furniture Rectangular Modern，Black",
        description: 
        "【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table "
        +"/n【Easy to Assemble 】Exquisite hardware and detailed manual are included of the dining table. All parts of the dining room table set are listed and numbered and specific assembly steps are also shown in the instruction of the Dining Table Set.dining table Dining Table Set dining room table dining room table set Table Set"
        +"/n【Comfortable and Elegant】 This dining chairs are Personality, mid-century modern sensibility dining chairs,Such a dining cahirs with ergonomically designed.Kitchen Chairs Chair for Kitchen side chairs dining dining chairs Dining Room Chairs"
        +"/n【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table"
        +"/n【Easy To Storage and Keep Tidy】Dining chairs of dining table set can be moved under the dining table when you finish your meal, which our kitchen table setlargely helps you save room space. Featuring smooth surface, our table and chairs set is easy to be kept clean.table and chairs set kitchen table and chairs for 4 dining table set",
        image: "https://m.media-amazon.com/images/I/61rn01u4KDL._AC_SX679_.jpg" ,
        brand:"FDW",
        categoryNumber: 1,      
        subcategoryNumber:12 ,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'dinging table' to products collection");
      });

      new Product({
        name: "Ergonomic Office Chair - KERDOM Comfortable Computer Chair with Adjustable Headrest and Armrests, High Back Mesh Gaming Chair Executive Swivel Chair(Black S)",
        description: "[Comfortable Backrest Design]- Y shaped backrest supports design, fits the spine line, fully supports your back, and helps release the pressure on the spine and shoulders. The back tilts 90 to 135 degrees,Three level locking. allowing you to rest after a long time working. Our brand has always been committed to bringing customers a comfortable office experience."
        +"/n[Breathable and Comfortable Office Chair]-An ergonomic office chair with a mesh backrest and seat to maintain air circulation and avoid sweating and adhesion. The high-density native sponge cushion is soft and breathable. Keep you away from the pain of sedentary sitting."
        +"/n[Premium Silent Universal Wheels]--The 350 pound office chair uses universals wheels, which are silent and smooth, and can be easily moved on the floor or carpet ,and they won’t damage your floor either. which can enhance your sitting experience."
        +"/n[Adjustable 3D Armrests and Headrests]-Multi-purpose armrests can be adjusted up and down, front and back, providing more convenience for your work. Freely adjust the height and angle of the headrest to reduce daily neck and shoulder pain. The computer office chair has many functions that can adapt to your body and work needs."
        +"/n[Easy Installation & Warranty]-All home office chairs are provided with 1-year warranty, English instructions and 1 set simple tools, you can easily complete it in about 15 minutes on this basis. If you have any questions, please feel free to email us, we will give you a satisfactory solution ASAP.",
        image: "https://images-na.ssl-images-amazon.com/images/I/71PPeDWgBbL.__AC_SX300_SY300_QL70_ML2_.jpg" ,
        brand:"Ergonomic",
        categoryNumber:1,      
        subcategoryNumber:13 ,      
        stock: 100,        
        price: 254.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Ergonomic Office Chair ' to products collection");
      });

      new Product({
        name: "Sodagreen Galaxy Purple Washi Tape - Gold Foil Washi Masking Tape with Constalation, Blue Sky, Moon, Star, Celestial, Perfect for Bullet Journal, DIY Crafts (Purple Galaxy)",
        description: "💙PURPLE GALAXY WASHI TAPE : 12 rolls gold foil washi tape, width 15mm,length 2m . New design with constalation, blue sky, moon, star, celestial. This purple washi tape adds color and vitality to things that are pasted, making daily life more interesting."
        +"/n💙HIGH-QUALITY : Made of high-quality Japanese paper material, the surface is pastel and the color is durable. The material is environmentally friendly and has no odor. Our constalation washi tape can stick to most clean surfaces, also remove easily without any sticky residue."
        +"/n💙VIBRANT DESIGN: This blue sky washi tape is designed by professional Japanese designers. Various patterns can provide more choices for your use. Vibrant design gives you creativity. Your friends will be surprised by the creative gifts and decorations you make using this galaxy washi masking tape."
        +"/n💙WIDE RANGE OF USES: This star washi tape can be used to decorate anything you want, such as card/gift wrapping, scrapbooks, bullet journal,kids' art projects, mobile phone cases, photo frames, walls, etc. People of different ages will find happiness in these celestial washi tape. Please don't wait, add it to the shopping cart now and get creative."
        +"/n💙SERVICE GUARANTEE: Your satisfaction is our top priority. If you are not satisfied for any reason, you can return the item for a full refund, please rest assured to buy. If you have any questions, please contact customer service Toby or Lucy, we will provide you with a satisfactory solution.",
        image: "https://m.media-amazon.com/images/I/71uOcTW92uL._SX522_.jpg" ,
        brand:"Sodagreen",
        categoryNumber: 2,      
        subcategoryNumber: 21,      
        stock: 100,        
        price: 12.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Sodagreen Galaxy Purple Washi Tape' to products collection");
      });

      new Product({
        name: "100 Colors Alcohol Markers Dual Tips Permanent Art Markers Pen for Kids & Adult, Alcohol-Based Highlighter Pen Sketch Markers for Painting, Coloring, Sketching and Drawing.（BLACK)",
        description: "Art set 100 Vibrant Colors Alcohol Markers Plus 1 Blender Permanent Marker with 2 bases: Professional superior artist quality double-ended permanent art markers. Includes Fine tip 1mm and Broad tip 6mm all the primary and secondary color shade tones artists need for adult coloring,drawing,writing,sketching,illustrating,shading,designing,rendering,anime,adult coloring books, calligraphy,card making,stamping and more.Perfect for use on paper,ceramics,glass and more."
        +"/nFast Drying & High Quality,Find Colors Fast Art Marker Pens blend and layer well without leaving streaks behind and dry quickly.Our super quality permanent ink provides a rich color saturation and allows the colors to be laid down clean, smooth and evenly. Perfect color match every time you use them because the tips share a single ink reservoir.Color-coded caps keep tips from drying out and help you find any marker in a flash.These paint markers are built to last and wont easily fade."
        +"/nDual Tips Twin :Dual Tips Markers Design allows you to make thick and thin lines without changing alcohol markers.Includes Fine tip 1mm and Broad tip 6mm twin tips for precise highlighting, sketching and underlining. Thin markers can be used to write and hook line while thick art markers professional are suitable for drawing and coloring."
        +"/nPortable storage bag and new plastic pen holder:Art supplies comes with a durable zipper carry bag for storing,We use 1680D thick Oxford cloth bag, which is different from ordinary cloth bag and Using a new plastic penholder, we promise to never use recycled plastic,the pen holder is stronger and not easy to break during transportation.Make alcohol markers set very easy and convenient to portable carry around anywhere for travel or outdoor work.permanent marker,copic markers"
        +"/nMore than 100% Satisfaction Guarantee: we promise provide more than 100% Satisfaction Guarantee to customers.If you have any quality problems, please feel free to contact us.Simply request a refund or a replacement,After-sales issues resolved within 24 hours.(Note: To prevent the marker from drying and ink leaking, please recap and keep the marker laid flat after use.)",
        image: "https://m.media-amazon.com/images/I/71lOpUCFj3L._AC_SX679_.jpg" ,
        brand:"belleza suprema",
        categoryNumber: 2,      
        subcategoryNumber:22 ,      
        stock: 100,        
        price: 33.71,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '100 Colors Alcohol Markers ' to products collection");
      });

      new Product({
        name: "Aechy Colored Pens for Note Taking, Dual Tip Markers with 5 Different Curve Shapes & 8 Colors Fine Lines, Cool Pens for Adult Teenage Kids Coloring Books Writing Journaling Drawing Scrapbook Art Office(Rainbow)",
        description: "【Dual Tip Markers for Writing】 8 vivid and classic colors are divided to 5 unique mark line types, equipped with roller pen point, allow you to create colorful lines like any before. We believe Aechy colored pens will meet most your need for writing & marking"
        +"/n【Durable Quality】 Each cools pens features soft grip and 0.4mm durable tip. Premium material makes our pens glide smoothly than others. You will like the way you can mark and draw precisely in the tiny details of your notes and journals"
        +"/n【Long Lasting】 Upgraded journaling pens come with 40% more ink, can produce longer mark lines than before. These fine tip markers are easy to hold and comfortable, perfect as crafting, doodling, art designs, writing, drawing, scrapbooking, and journaling supplies"
        +"/n【Safe & High Performance】 Acid-free and non-toxic ink doesn’t smear, fade, or skip. Safe to give this journal pen to kids and girls. This fine point pen set allow all family enjoy smooth application for card making, arts crafts, coloring books, school project, DIY letters and more"
        +"/n【Gift Choice】 Why Not Consider giving this fun pen set as a gift? For now, this flair pens are popular gifts for kids or adult who like to express imagination. If you are not 100% satisfied with our product, please do not hesitate to contact us for any question, We’ll solve it for you within 12 hours",
        image: "https://m.media-amazon.com/images/I/71ANsE6kHcL._AC_SX679_.jpg" ,
        brand:"AECHY",
        categoryNumber: 2,      
        subcategoryNumber: 23,      
        stock: 100,        
        price: 17.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Aechy Colored Pens' to products collection");
      });

      new Product({
        name: "Pillows Queen Size 2 Pack for Sleeping, Soft and Supportive Bed Pillow for Side and Back Sleeper, Down Alternative Hotel Collection Pillows-20 x30",
        description: "QUEEN PILLOWS 2 PACK -- Each order will include two Hotel Quality Bed Pillows that are finished with well stitching and reinforced seams. An ideal choice for side, stomach and back sleepers as these pillows have a high loft and offer maximum comfort for any sleeping position."
        +"/nSOFT & SUPPORTIVE PILLOWS -- Since our down alternative pillows are made with a great balance of softness and plump firmness, so whether you prefer soft or firm pillows, these pillows are perfect for you!"
        +"/nBREATHABLE & MACHINE WASHABLE PILLOWS --Filled with 100% micro polyester fiber which makes the pillows fluffy and cozy. Quality shell ensure the pillow breathable and skin friendly. Machine washable capabilities enable Maintenance of its reusability and fresh appearance. Air dry or tumble dry after washing."
        +"/nGREAT RESILIENCE -- Quickly return to its original size of 20x30 inches after releasing from the vacuum sealed package, fluff the pillow regularly to retain its shape after long use. Pls allow 24 hours for them to fluff up completely."
        +"/nRISK-FREE PURCHASE -- Buy with confidence! Your satisfaction is backed by our Risk-free 30 Days and 1 Year Warranty against any defects. Give it a chance, you will have a better life!",
        image: "https://m.media-amazon.com/images/I/81A5oDeRGOL._AC_SX679_.jpg" ,
        brand:"JOLLYVOGUE",
        categoryNumber: 3,      
        subcategoryNumber: 31,      
        stock: 100,        
        price: 40.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Pillows Queen Size 2 Pack' to products collection");
      });

      new Product({
        name: "Bedsure White Duvet Cover Queen Size Set - Ultra Soft Microfiber Bed Set, 3 Piece Breathable Queen Bedding Set with Zipper Closure, Corner Ties, 90x90 Inch",
        description: "Quality Material: Utilizing 110GSM polyester microfiber fabric, Bedsure’s duvet cover set offers longer durability and comfort all year round. The comforter cover set applies a pre-washed process that creates exceptional softness with an artful cotton touch to give you beauty sleep all night long."
        +"/nPerfect Home Decoration: Bedsure’s duvet cover set presents a vintage feeling and beautiful wrinkled texture for homeowners with sophisticated tastes. The solid hue of the bedding cover set adds an extra layer of style and versatility, making it easy to coordinate and integrate with your room’s décor."
        +"/nThoughtful Design: Corner ties inside the duvet cover make your quilt fit snugly and avoid fill bunching. Seal off your comforter quicker and easier than a regular button closure with zipper."
        +"/nEasy Care: This duvet cover set simply needs to be machine washed in cold water on a permanent cycle, and then tumble dry low. Close zipper completely when washing."
        +"/nWhat You Can Get: Available in Bedsure duvet cover set queen with zipper closure, 1 duvet cover 90' x 90', 2 pillow shams 20'x26'. Please note this is a duvet cover set that doesn't include an insert or fill.",
        image: "https://m.media-amazon.com/images/I/919jO9hGf6L._AC_SX679_.jpg" ,
        brand:"Bedsure",
        categoryNumber: 3,      
        subcategoryNumber: 32,      
        stock: 100,        
        price: 42.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Chezmoi Collection Upland 7-Piece Quilted Patchwork Comforter Set, Burgundy/Black/Brown, Queen",
        description: "Upland 7-Piece Comforter Set Includes: 1 Comforter, 2 Shams, 1 Bedskirt, 1 Cushion, 1 Neck Roll, 1 Breakfast Pillow"
        +"/nQueen Size Measurements: Comforter 90' x 92', Shams 20' x 26', Bedskirt 60' x 80' +14' drop, Square Cushion 18' x 18', Neck Roll 7' x 18', Breakfast Pillow 12' x 18'"
        +"/nA luxurious pin-sonic pressed medallion design quilted in a patchwork pattern with each fabric pieced together. The perfect unison of three tone colors to draw out the exhilarating bedroom experience."
        +"/nSoft, lightweight, and comfy fabric versatile for any bedroom décor. Suitable for year round use."
        +"/nEasy Care - Machine wash gentle cycle with cold water; (Sun dry or low tumble dry)",
        image: "https://m.media-amazon.com/images/I/81nxTD5MSUL._AC_SX679_.jpg" ,
        brand:"Chezmoi",
        categoryNumber: 3,      
        subcategoryNumber: 33,      
        stock: 100,        
        price: 132.17,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Chezmoi Collection' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Fade Resistant Bath, Hand and Washcloth Towel Set - Teal",
        description: "6-piece towel set includes (2) 54 x 30 inch bath towels, (2) 26 x 16 inch hand towels, and (2) 12 x 12 inch washcloths"
        +"/nMade of 100% cotton for softness and tear-resistant strength"
        +"/nLightweight towels quickly absorbs moisture"
        +"/nDesigned with a classic and simple pique border"
        +"/nFade-resistant teal color"
        +"/nMade in OEKO-TEX Standard 100 factory, an independent certification system that ensures textiles meet high safety and environmental standards.",
        image: "https://m.media-amazon.com/images/I/91b9p1-YdUL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber:4 ,      
        subcategoryNumber: 41,      
        stock: 100,        
        price: 31.41,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Amazon Basics 6-Piece Fade ' to products collection");
      });

      new Product({
        name: "Amazon Basics Non-Slip Microfiber Shag Bathroom Rug Mat, 21' x 34', Seafoam Green",
        description: "Microfiber shag bath rug in Seafoam Green provides a comfortably plush place to stand and helps keep floors dry"
        +"/nAbsorbent, plush tufts across the entire surface soak up water fast; dries quickly for supreme comfort from one use to the next"
        +"/nNon-slip backing keeps the rug securely in place, even when wet, for added safety"
        +"/nMade of 85% polyester and 15% polyamide; imported; machine washable for easy home care"
        +"/nMeasures 21 by 34 inches; backed by an AmazonBasics limited one-year warranty",
        image: "https://m.media-amazon.com/images/I/91ppCguT44L._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 4,      
        subcategoryNumber: 42,      
        stock: 100,        
        price: 26.51,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Shark Rocket Ultra-Light Upright Vacuum Cleaner, Blue (HV300C) - Canadian Version",
        description: "Ultra lightweight: At under 9 pounds, it converts to a handheld vacuum for complete floor to ceiling cleaning"
        +"/nFingertip controls: Easily switch from hard floor to carpet, amps: 4.2"
        +"/nDual storage options: Fix the hand vac to the bottom of the wand or secure it to the wall mount"
        +"/nSwivel steering: Excellent control for maneuvering around furniture",
        image: "https://m.media-amazon.com/images/I/61UI6DIjH6L._AC_SX679_.jpg" ,
        brand:"Shark",
        categoryNumber: 5,      
        subcategoryNumber: 51,      
        stock: 100,        
        price: 149.98,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "7 Pcs Universal Vacuum Attachments Accessories Cleaning Kit Brush Nozzle Crevice Tool Dust Cleaner for 32mm and 35mm Standard Hose",
        description: "MULTIFUNCTION This Vacuum Attachment Can be used everywhere Get rid of all the dust Which you cant clean clearly with normal tools before, Such as your draw, corners, Keyboards, even your pets"
        +"/n100% EASY TO USE Just connect this dust brush cleaner to your vacuum and you can clean as seen as on TV, flexible tubes, strong suction and long size all of this can impress you deeply. The handle grip is very comfortable to use and the user can easily remove the dust in the house."
        +"/nUNIVERSAL VACUUM ATTACHMENT This universal vacuum dust attachment with the adapter is suitable for MOST (NOT ALL) types of vacuum cleaners with 32/35mm (1.3 inches) inner diameter hose, such as Dyson vacuum cleaner-DC35,DC45,DC58,DC59,DC62,V6,Hand Vacuum cleaner,Fan vac cleaner, Car vent cleaner,Vent Vac cleaner, Mini Vac Cleaner.THIS PRODUCT IS NOT DESIGNED FOR HOOVER AND SHARK VACUUM CLEANER."
        +"/nINNOVATIVE DESIGN Made with 36 flexible micro-size suction tubes.They are flexible somewhere you cant clean clearly with normal tools, but not with this one, you can use it to clean your draw, corners, even your pets.Can be used everywhere."
        +"/nSAVE TIME AND ENERGY It is the best cleaning tool ever,The advantages of design is you need not to move objects anymore, flexible tubes can fix all. Long and flexible tubes have access to any deep corners, no longer need to do more job.",
        image: "https://m.media-amazon.com/images/I/61oJAOwFytL._AC_SX679_.jpg" ,
        brand:"GUOLANSAALINAA",
        categoryNumber: 5,      
        subcategoryNumber: 52,      
        stock: 100,        
        price: 21.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Vileda EasyWring Microfibre Spin Mop & Bucket Floor Cleaning System",
        description: "Exclusive bucket design has built-in wringer that allows for hands-free wringing"
        +"/nDeep-cleaning microfibre removes and absorbs tough dirt and grime"
        +"/nHigh-quality foot pedal designed to activate spin wringing, allowing the level of moisture to be controlled"
        +"/nFeatures Splash Guard to keep splash and spray inside bucket when wringing"
        +"/nCompatible with the EasyWring Mop Refill available at amazon.ca",
        image: "https://m.media-amazon.com/images/I/61Zk4yPT+dL._AC_SX679_.jpg" ,
        brand:"Vileda",
        categoryNumber: 5,      
        subcategoryNumber: 53,      
        stock: 100,        
        price: 37.00,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Dupray Neat Steam Cleaner Powerful Multipurpose Portable Heavy Duty Steamer for Floors, Cars, Tiles, Grout Cleaning. Chemical Free, Disinfection, for Home Use and More. Kills 99.99%* of Bacteria and Viruses.",
        description: "STEAM CLEAN. DEGREASE. DEODORIZE. ANY SURFACE. BETTER."
        +"/nPOWERFUL STEAM CLEANER: up to 275 Degree F/135 Degree Celsius. Best multi purpose steamer for home, cars and more."
        +"/nHEAVY-DUTY & LARGE CAPACITY: Up to 50 minutes of cleaning time per fill up."
        +"/nPERFECT FOR FLOOR CLEANING: use any regular towel or cloth, no need for expensive special pads!"
        +"/n2-year Limited Warranty / Lifetime Warranty on steam cleaner boiler.",
        image: "https://m.media-amazon.com/images/I/71CD3C7yfJL._AC_SX679_.jpg" ,
        brand:"Dupray",
        categoryNumber: 5,      
        subcategoryNumber: 54,      
        stock: 100,        
        price: 199.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Dupray Neat Steam clearner' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Nonstick Oven Bakeware Baking Set",
        description: "6-piece bakeware set includes a 9x5-inch loaf pan, 2 round 9-inch cake pans, a 12-cup muffin pan, a 13x9-inch roast pan, and a 13x9-inch baking sheet"
        +"/nMade of heavy-weight steel for thorough, even heating"
        +"/nNonstick coating for effortless food release and easy cleaning"
        +"/nOven-safe to 500 degrees F"
        +"/nHand-wash only recommended",
        image: "https://m.media-amazon.com/images/I/91hBA6hLfuL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 6,      
        subcategoryNumber: 61,      
        stock: 100,        
        price: 32.86,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'mazon Basics 6-Piece ' to products collection");
      });   

    new Product({
        name: "Molblly Queen Bed Frame Premium Upholstered Platform Beds with Strong Wood Slat Support and No Box Spring Needed,Easy Assembly/Queen Size Bed Blue(60”*80”",
        description: "👍[Premium Materials] The platform bed frame profileis and foot made of high hardness metal.The soft-packed part of bed frames’ padded are made of high-quality linen fabric wrapped. It can reduce noise and give you a quiet and comfortable resting environment."
        +"/n🏆[Unique Design] The cushions are more comfortable and softer than other bed headboard cushions.The cushions can be adjusted to different heights to meet various needs and also be disassembled and cleaned."
        +"/n👉[Durable Construction] The bed slats are made of strong hardwood slats are spaced 3.2-3.7 inches and nine leg support for durabilityapart to support the life of the mattress and ensure durability and support.The 45-degree curved ribbed bed board uses the principle of mechanical dispersion, and each bed board is evenly stressed."
        +"/n🔔[Strong Bearing] Twin size supports a maximum weight capacity of 280kgs, while all other sizes can support up to 480kgs"
        +"/n🔑{Easily Assembled} Tools and instructions book of this bed frame are packed in a box.Installation video is attached for reference.If you need our help, please feel free to contact us (24/7)",
        image: "https://m.media-amazon.com/images/I/81jy-TLZSDL._AC_SX679_.jpg" ,
        brand:"Molblly",
        categoryNumber: 1,      
        subcategoryNumber: 11,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Molblly Queen Bed' to products collection");
      });

      new Product({
        name: "FDW Dining Table Set Dining Table Dining Room Table Set for Small Spaces Kitchen Table and Chairs for 4 Table with Chairs Home Furniture Rectangular Modern，Black",
        description: 
        "【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table "
        +"/n【Easy to Assemble 】Exquisite hardware and detailed manual are included of the dining table. All parts of the dining room table set are listed and numbered and specific assembly steps are also shown in the instruction of the Dining Table Set.dining table Dining Table Set dining room table dining room table set Table Set"
        +"/n【Comfortable and Elegant】 This dining chairs are Personality, mid-century modern sensibility dining chairs,Such a dining cahirs with ergonomically designed.Kitchen Chairs Chair for Kitchen side chairs dining dining chairs Dining Room Chairs"
        +"/n【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table"
        +"/n【Easy To Storage and Keep Tidy】Dining chairs of dining table set can be moved under the dining table when you finish your meal, which our kitchen table setlargely helps you save room space. Featuring smooth surface, our table and chairs set is easy to be kept clean.table and chairs set kitchen table and chairs for 4 dining table set",
        image: "https://m.media-amazon.com/images/I/61rn01u4KDL._AC_SX679_.jpg" ,
        brand:"FDW",
        categoryNumber: 1,      
        subcategoryNumber:12 ,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'dinging table' to products collection");
      });

      new Product({
        name: "Ergonomic Office Chair - KERDOM Comfortable Computer Chair with Adjustable Headrest and Armrests, High Back Mesh Gaming Chair Executive Swivel Chair(Black S)",
        description: "[Comfortable Backrest Design]- Y shaped backrest supports design, fits the spine line, fully supports your back, and helps release the pressure on the spine and shoulders. The back tilts 90 to 135 degrees,Three level locking. allowing you to rest after a long time working. Our brand has always been committed to bringing customers a comfortable office experience."
        +"/n[Breathable and Comfortable Office Chair]-An ergonomic office chair with a mesh backrest and seat to maintain air circulation and avoid sweating and adhesion. The high-density native sponge cushion is soft and breathable. Keep you away from the pain of sedentary sitting."
        +"/n[Premium Silent Universal Wheels]--The 350 pound office chair uses universals wheels, which are silent and smooth, and can be easily moved on the floor or carpet ,and they won’t damage your floor either. which can enhance your sitting experience."
        +"/n[Adjustable 3D Armrests and Headrests]-Multi-purpose armrests can be adjusted up and down, front and back, providing more convenience for your work. Freely adjust the height and angle of the headrest to reduce daily neck and shoulder pain. The computer office chair has many functions that can adapt to your body and work needs."
        +"/n[Easy Installation & Warranty]-All home office chairs are provided with 1-year warranty, English instructions and 1 set simple tools, you can easily complete it in about 15 minutes on this basis. If you have any questions, please feel free to email us, we will give you a satisfactory solution ASAP.",
        image: "https://images-na.ssl-images-amazon.com/images/I/71PPeDWgBbL.__AC_SX300_SY300_QL70_ML2_.jpg" ,
        brand:"Ergonomic",
        categoryNumber:1,      
        subcategoryNumber:13 ,      
        stock: 100,        
        price: 254.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Ergonomic Office Chair ' to products collection");
      });

      new Product({
        name: "Sodagreen Galaxy Purple Washi Tape - Gold Foil Washi Masking Tape with Constalation, Blue Sky, Moon, Star, Celestial, Perfect for Bullet Journal, DIY Crafts (Purple Galaxy)",
        description: "💙PURPLE GALAXY WASHI TAPE : 12 rolls gold foil washi tape, width 15mm,length 2m . New design with constalation, blue sky, moon, star, celestial. This purple washi tape adds color and vitality to things that are pasted, making daily life more interesting."
        +"/n💙HIGH-QUALITY : Made of high-quality Japanese paper material, the surface is pastel and the color is durable. The material is environmentally friendly and has no odor. Our constalation washi tape can stick to most clean surfaces, also remove easily without any sticky residue."
        +"/n💙VIBRANT DESIGN: This blue sky washi tape is designed by professional Japanese designers. Various patterns can provide more choices for your use. Vibrant design gives you creativity. Your friends will be surprised by the creative gifts and decorations you make using this galaxy washi masking tape."
        +"/n💙WIDE RANGE OF USES: This star washi tape can be used to decorate anything you want, such as card/gift wrapping, scrapbooks, bullet journal,kids' art projects, mobile phone cases, photo frames, walls, etc. People of different ages will find happiness in these celestial washi tape. Please don't wait, add it to the shopping cart now and get creative."
        +"/n💙SERVICE GUARANTEE: Your satisfaction is our top priority. If you are not satisfied for any reason, you can return the item for a full refund, please rest assured to buy. If you have any questions, please contact customer service Toby or Lucy, we will provide you with a satisfactory solution.",
        image: "https://m.media-amazon.com/images/I/71uOcTW92uL._SX522_.jpg" ,
        brand:"Sodagreen",
        categoryNumber: 2,      
        subcategoryNumber: 21,      
        stock: 100,        
        price: 12.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Sodagreen Galaxy Purple Washi Tape' to products collection");
      });

      new Product({
        name: "100 Colors Alcohol Markers Dual Tips Permanent Art Markers Pen for Kids & Adult, Alcohol-Based Highlighter Pen Sketch Markers for Painting, Coloring, Sketching and Drawing.（BLACK)",
        description: "Art set 100 Vibrant Colors Alcohol Markers Plus 1 Blender Permanent Marker with 2 bases: Professional superior artist quality double-ended permanent art markers. Includes Fine tip 1mm and Broad tip 6mm all the primary and secondary color shade tones artists need for adult coloring,drawing,writing,sketching,illustrating,shading,designing,rendering,anime,adult coloring books, calligraphy,card making,stamping and more.Perfect for use on paper,ceramics,glass and more."
        +"/nFast Drying & High Quality,Find Colors Fast Art Marker Pens blend and layer well without leaving streaks behind and dry quickly.Our super quality permanent ink provides a rich color saturation and allows the colors to be laid down clean, smooth and evenly. Perfect color match every time you use them because the tips share a single ink reservoir.Color-coded caps keep tips from drying out and help you find any marker in a flash.These paint markers are built to last and wont easily fade."
        +"/nDual Tips Twin :Dual Tips Markers Design allows you to make thick and thin lines without changing alcohol markers.Includes Fine tip 1mm and Broad tip 6mm twin tips for precise highlighting, sketching and underlining. Thin markers can be used to write and hook line while thick art markers professional are suitable for drawing and coloring."
        +"/nPortable storage bag and new plastic pen holder:Art supplies comes with a durable zipper carry bag for storing,We use 1680D thick Oxford cloth bag, which is different from ordinary cloth bag and Using a new plastic penholder, we promise to never use recycled plastic,the pen holder is stronger and not easy to break during transportation.Make alcohol markers set very easy and convenient to portable carry around anywhere for travel or outdoor work.permanent marker,copic markers"
        +"/nMore than 100% Satisfaction Guarantee: we promise provide more than 100% Satisfaction Guarantee to customers.If you have any quality problems, please feel free to contact us.Simply request a refund or a replacement,After-sales issues resolved within 24 hours.(Note: To prevent the marker from drying and ink leaking, please recap and keep the marker laid flat after use.)",
        image: "https://m.media-amazon.com/images/I/71lOpUCFj3L._AC_SX679_.jpg" ,
        brand:"belleza suprema",
        categoryNumber: 2,      
        subcategoryNumber:22 ,      
        stock: 100,        
        price: 33.71,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '100 Colors Alcohol Markers ' to products collection");
      });

      new Product({
        name: "Aechy Colored Pens for Note Taking, Dual Tip Markers with 5 Different Curve Shapes & 8 Colors Fine Lines, Cool Pens for Adult Teenage Kids Coloring Books Writing Journaling Drawing Scrapbook Art Office(Rainbow)",
        description: "【Dual Tip Markers for Writing】 8 vivid and classic colors are divided to 5 unique mark line types, equipped with roller pen point, allow you to create colorful lines like any before. We believe Aechy colored pens will meet most your need for writing & marking"
        +"/n【Durable Quality】 Each cools pens features soft grip and 0.4mm durable tip. Premium material makes our pens glide smoothly than others. You will like the way you can mark and draw precisely in the tiny details of your notes and journals"
        +"/n【Long Lasting】 Upgraded journaling pens come with 40% more ink, can produce longer mark lines than before. These fine tip markers are easy to hold and comfortable, perfect as crafting, doodling, art designs, writing, drawing, scrapbooking, and journaling supplies"
        +"/n【Safe & High Performance】 Acid-free and non-toxic ink doesn’t smear, fade, or skip. Safe to give this journal pen to kids and girls. This fine point pen set allow all family enjoy smooth application for card making, arts crafts, coloring books, school project, DIY letters and more"
        +"/n【Gift Choice】 Why Not Consider giving this fun pen set as a gift? For now, this flair pens are popular gifts for kids or adult who like to express imagination. If you are not 100% satisfied with our product, please do not hesitate to contact us for any question, We’ll solve it for you within 12 hours",
        image: "https://m.media-amazon.com/images/I/71ANsE6kHcL._AC_SX679_.jpg" ,
        brand:"AECHY",
        categoryNumber: 2,      
        subcategoryNumber: 23,      
        stock: 100,        
        price: 17.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Aechy Colored Pens' to products collection");
      });

      new Product({
        name: "Pillows Queen Size 2 Pack for Sleeping, Soft and Supportive Bed Pillow for Side and Back Sleeper, Down Alternative Hotel Collection Pillows-20 x30",
        description: "QUEEN PILLOWS 2 PACK -- Each order will include two Hotel Quality Bed Pillows that are finished with well stitching and reinforced seams. An ideal choice for side, stomach and back sleepers as these pillows have a high loft and offer maximum comfort for any sleeping position."
        +"/nSOFT & SUPPORTIVE PILLOWS -- Since our down alternative pillows are made with a great balance of softness and plump firmness, so whether you prefer soft or firm pillows, these pillows are perfect for you!"
        +"/nBREATHABLE & MACHINE WASHABLE PILLOWS --Filled with 100% micro polyester fiber which makes the pillows fluffy and cozy. Quality shell ensure the pillow breathable and skin friendly. Machine washable capabilities enable Maintenance of its reusability and fresh appearance. Air dry or tumble dry after washing."
        +"/nGREAT RESILIENCE -- Quickly return to its original size of 20x30 inches after releasing from the vacuum sealed package, fluff the pillow regularly to retain its shape after long use. Pls allow 24 hours for them to fluff up completely."
        +"/nRISK-FREE PURCHASE -- Buy with confidence! Your satisfaction is backed by our Risk-free 30 Days and 1 Year Warranty against any defects. Give it a chance, you will have a better life!",
        image: "https://m.media-amazon.com/images/I/81A5oDeRGOL._AC_SX679_.jpg" ,
        brand:"JOLLYVOGUE",
        categoryNumber: 3,      
        subcategoryNumber: 31,      
        stock: 100,        
        price: 40.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Pillows Queen Size 2 Pack' to products collection");
      });

      new Product({
        name: "Bedsure White Duvet Cover Queen Size Set - Ultra Soft Microfiber Bed Set, 3 Piece Breathable Queen Bedding Set with Zipper Closure, Corner Ties, 90x90 Inch",
        description: "Quality Material: Utilizing 110GSM polyester microfiber fabric, Bedsure’s duvet cover set offers longer durability and comfort all year round. The comforter cover set applies a pre-washed process that creates exceptional softness with an artful cotton touch to give you beauty sleep all night long."
        +"/nPerfect Home Decoration: Bedsure’s duvet cover set presents a vintage feeling and beautiful wrinkled texture for homeowners with sophisticated tastes. The solid hue of the bedding cover set adds an extra layer of style and versatility, making it easy to coordinate and integrate with your room’s décor."
        +"/nThoughtful Design: Corner ties inside the duvet cover make your quilt fit snugly and avoid fill bunching. Seal off your comforter quicker and easier than a regular button closure with zipper."
        +"/nEasy Care: This duvet cover set simply needs to be machine washed in cold water on a permanent cycle, and then tumble dry low. Close zipper completely when washing."
        +"/nWhat You Can Get: Available in Bedsure duvet cover set queen with zipper closure, 1 duvet cover 90' x 90', 2 pillow shams 20'x26'. Please note this is a duvet cover set that doesn't include an insert or fill.",
        image: "https://m.media-amazon.com/images/I/919jO9hGf6L._AC_SX679_.jpg" ,
        brand:"Bedsure",
        categoryNumber: 3,      
        subcategoryNumber: 32,      
        stock: 100,        
        price: 42.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Chezmoi Collection Upland 7-Piece Quilted Patchwork Comforter Set, Burgundy/Black/Brown, Queen",
        description: "Upland 7-Piece Comforter Set Includes: 1 Comforter, 2 Shams, 1 Bedskirt, 1 Cushion, 1 Neck Roll, 1 Breakfast Pillow"
        +"/nQueen Size Measurements: Comforter 90' x 92', Shams 20' x 26', Bedskirt 60' x 80' +14' drop, Square Cushion 18' x 18', Neck Roll 7' x 18', Breakfast Pillow 12' x 18'"
        +"/nA luxurious pin-sonic pressed medallion design quilted in a patchwork pattern with each fabric pieced together. The perfect unison of three tone colors to draw out the exhilarating bedroom experience."
        +"/nSoft, lightweight, and comfy fabric versatile for any bedroom décor. Suitable for year round use."
        +"/nEasy Care - Machine wash gentle cycle with cold water; (Sun dry or low tumble dry)",
        image: "https://m.media-amazon.com/images/I/81nxTD5MSUL._AC_SX679_.jpg" ,
        brand:"Chezmoi",
        categoryNumber: 3,      
        subcategoryNumber: 33,      
        stock: 100,        
        price: 132.17,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Chezmoi Collection' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Fade Resistant Bath, Hand and Washcloth Towel Set - Teal",
        description: "6-piece towel set includes (2) 54 x 30 inch bath towels, (2) 26 x 16 inch hand towels, and (2) 12 x 12 inch washcloths"
        +"/nMade of 100% cotton for softness and tear-resistant strength"
        +"/nLightweight towels quickly absorbs moisture"
        +"/nDesigned with a classic and simple pique border"
        +"/nFade-resistant teal color"
        +"/nMade in OEKO-TEX Standard 100 factory, an independent certification system that ensures textiles meet high safety and environmental standards.",
        image: "https://m.media-amazon.com/images/I/91b9p1-YdUL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber:4 ,      
        subcategoryNumber: 41,      
        stock: 100,        
        price: 31.41,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Amazon Basics 6-Piece Fade ' to products collection");
      });

      new Product({
        name: "Amazon Basics Non-Slip Microfiber Shag Bathroom Rug Mat, 21' x 34', Seafoam Green",
        description: "Microfiber shag bath rug in Seafoam Green provides a comfortably plush place to stand and helps keep floors dry"
        +"/nAbsorbent, plush tufts across the entire surface soak up water fast; dries quickly for supreme comfort from one use to the next"
        +"/nNon-slip backing keeps the rug securely in place, even when wet, for added safety"
        +"/nMade of 85% polyester and 15% polyamide; imported; machine washable for easy home care"
        +"/nMeasures 21 by 34 inches; backed by an AmazonBasics limited one-year warranty",
        image: "https://m.media-amazon.com/images/I/91ppCguT44L._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 4,      
        subcategoryNumber: 42,      
        stock: 100,        
        price: 26.51,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Shark Rocket Ultra-Light Upright Vacuum Cleaner, Blue (HV300C) - Canadian Version",
        description: "Ultra lightweight: At under 9 pounds, it converts to a handheld vacuum for complete floor to ceiling cleaning"
        +"/nFingertip controls: Easily switch from hard floor to carpet, amps: 4.2"
        +"/nDual storage options: Fix the hand vac to the bottom of the wand or secure it to the wall mount"
        +"/nSwivel steering: Excellent control for maneuvering around furniture",
        image: "https://m.media-amazon.com/images/I/61UI6DIjH6L._AC_SX679_.jpg" ,
        brand:"Shark",
        categoryNumber: 5,      
        subcategoryNumber: 51,      
        stock: 100,        
        price: 149.98,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "7 Pcs Universal Vacuum Attachments Accessories Cleaning Kit Brush Nozzle Crevice Tool Dust Cleaner for 32mm and 35mm Standard Hose",
        description: "MULTIFUNCTION This Vacuum Attachment Can be used everywhere Get rid of all the dust Which you cant clean clearly with normal tools before, Such as your draw, corners, Keyboards, even your pets"
        +"/n100% EASY TO USE Just connect this dust brush cleaner to your vacuum and you can clean as seen as on TV, flexible tubes, strong suction and long size all of this can impress you deeply. The handle grip is very comfortable to use and the user can easily remove the dust in the house."
        +"/nUNIVERSAL VACUUM ATTACHMENT This universal vacuum dust attachment with the adapter is suitable for MOST (NOT ALL) types of vacuum cleaners with 32/35mm (1.3 inches) inner diameter hose, such as Dyson vacuum cleaner-DC35,DC45,DC58,DC59,DC62,V6,Hand Vacuum cleaner,Fan vac cleaner, Car vent cleaner,Vent Vac cleaner, Mini Vac Cleaner.THIS PRODUCT IS NOT DESIGNED FOR HOOVER AND SHARK VACUUM CLEANER."
        +"/nINNOVATIVE DESIGN Made with 36 flexible micro-size suction tubes.They are flexible somewhere you cant clean clearly with normal tools, but not with this one, you can use it to clean your draw, corners, even your pets.Can be used everywhere."
        +"/nSAVE TIME AND ENERGY It is the best cleaning tool ever,The advantages of design is you need not to move objects anymore, flexible tubes can fix all. Long and flexible tubes have access to any deep corners, no longer need to do more job.",
        image: "https://m.media-amazon.com/images/I/61oJAOwFytL._AC_SX679_.jpg" ,
        brand:"GUOLANSAALINAA",
        categoryNumber: 5,      
        subcategoryNumber: 52,      
        stock: 100,        
        price: 21.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Vileda EasyWring Microfibre Spin Mop & Bucket Floor Cleaning System",
        description: "Exclusive bucket design has built-in wringer that allows for hands-free wringing"
        +"/nDeep-cleaning microfibre removes and absorbs tough dirt and grime"
        +"/nHigh-quality foot pedal designed to activate spin wringing, allowing the level of moisture to be controlled"
        +"/nFeatures Splash Guard to keep splash and spray inside bucket when wringing"
        +"/nCompatible with the EasyWring Mop Refill available at amazon.ca",
        image: "https://m.media-amazon.com/images/I/61Zk4yPT+dL._AC_SX679_.jpg" ,
        brand:"Vileda",
        categoryNumber: 5,      
        subcategoryNumber: 53,      
        stock: 100,        
        price: 37.00,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Dupray Neat Steam Cleaner Powerful Multipurpose Portable Heavy Duty Steamer for Floors, Cars, Tiles, Grout Cleaning. Chemical Free, Disinfection, for Home Use and More. Kills 99.99%* of Bacteria and Viruses.",
        description: "STEAM CLEAN. DEGREASE. DEODORIZE. ANY SURFACE. BETTER."
        +"/nPOWERFUL STEAM CLEANER: up to 275 Degree F/135 Degree Celsius. Best multi purpose steamer for home, cars and more."
        +"/nHEAVY-DUTY & LARGE CAPACITY: Up to 50 minutes of cleaning time per fill up."
        +"/nPERFECT FOR FLOOR CLEANING: use any regular towel or cloth, no need for expensive special pads!"
        +"/n2-year Limited Warranty / Lifetime Warranty on steam cleaner boiler.",
        image: "https://m.media-amazon.com/images/I/71CD3C7yfJL._AC_SX679_.jpg" ,
        brand:"Dupray",
        categoryNumber: 5,      
        subcategoryNumber: 54,      
        stock: 100,        
        price: 199.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Dupray Neat Steam clearner' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Nonstick Oven Bakeware Baking Set",
        description: "6-piece bakeware set includes a 9x5-inch loaf pan, 2 round 9-inch cake pans, a 12-cup muffin pan, a 13x9-inch roast pan, and a 13x9-inch baking sheet"
        +"/nMade of heavy-weight steel for thorough, even heating"
        +"/nNonstick coating for effortless food release and easy cleaning"
        +"/nOven-safe to 500 degrees F"
        +"/nHand-wash only recommended",
        image: "https://m.media-amazon.com/images/I/91hBA6hLfuL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 6,      
        subcategoryNumber: 61,      
        stock: 100,        
        price: 32.86,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'mazon Basics 6-Piece ' to products collection");
      });   

    new Product({
        name: "Molblly Queen Bed Frame Premium Upholstered Platform Beds with Strong Wood Slat Support and No Box Spring Needed,Easy Assembly/Queen Size Bed Blue(60”*80”",
        description: "👍[Premium Materials] The platform bed frame profileis and foot made of high hardness metal.The soft-packed part of bed frames’ padded are made of high-quality linen fabric wrapped. It can reduce noise and give you a quiet and comfortable resting environment."
        +"/n🏆[Unique Design] The cushions are more comfortable and softer than other bed headboard cushions.The cushions can be adjusted to different heights to meet various needs and also be disassembled and cleaned."
        +"/n👉[Durable Construction] The bed slats are made of strong hardwood slats are spaced 3.2-3.7 inches and nine leg support for durabilityapart to support the life of the mattress and ensure durability and support.The 45-degree curved ribbed bed board uses the principle of mechanical dispersion, and each bed board is evenly stressed."
        +"/n🔔[Strong Bearing] Twin size supports a maximum weight capacity of 280kgs, while all other sizes can support up to 480kgs"
        +"/n🔑{Easily Assembled} Tools and instructions book of this bed frame are packed in a box.Installation video is attached for reference.If you need our help, please feel free to contact us (24/7)",
        image: "https://m.media-amazon.com/images/I/81jy-TLZSDL._AC_SX679_.jpg" ,
        brand:"Molblly",
        categoryNumber: 1,      
        subcategoryNumber: 11,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Molblly Queen Bed' to products collection");
      });

      new Product({
        name: "FDW Dining Table Set Dining Table Dining Room Table Set for Small Spaces Kitchen Table and Chairs for 4 Table with Chairs Home Furniture Rectangular Modern，Black",
        description: 
        "【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table "
        +"/n【Easy to Assemble 】Exquisite hardware and detailed manual are included of the dining table. All parts of the dining room table set are listed and numbered and specific assembly steps are also shown in the instruction of the Dining Table Set.dining table Dining Table Set dining room table dining room table set Table Set"
        +"/n【Comfortable and Elegant】 This dining chairs are Personality, mid-century modern sensibility dining chairs,Such a dining cahirs with ergonomically designed.Kitchen Chairs Chair for Kitchen side chairs dining dining chairs Dining Room Chairs"
        +"/n【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table"
        +"/n【Easy To Storage and Keep Tidy】Dining chairs of dining table set can be moved under the dining table when you finish your meal, which our kitchen table setlargely helps you save room space. Featuring smooth surface, our table and chairs set is easy to be kept clean.table and chairs set kitchen table and chairs for 4 dining table set",
        image: "https://m.media-amazon.com/images/I/61rn01u4KDL._AC_SX679_.jpg" ,
        brand:"FDW",
        categoryNumber: 1,      
        subcategoryNumber:12 ,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'dinging table' to products collection");
      });

      new Product({
        name: "Ergonomic Office Chair - KERDOM Comfortable Computer Chair with Adjustable Headrest and Armrests, High Back Mesh Gaming Chair Executive Swivel Chair(Black S)",
        description: "[Comfortable Backrest Design]- Y shaped backrest supports design, fits the spine line, fully supports your back, and helps release the pressure on the spine and shoulders. The back tilts 90 to 135 degrees,Three level locking. allowing you to rest after a long time working. Our brand has always been committed to bringing customers a comfortable office experience."
        +"/n[Breathable and Comfortable Office Chair]-An ergonomic office chair with a mesh backrest and seat to maintain air circulation and avoid sweating and adhesion. The high-density native sponge cushion is soft and breathable. Keep you away from the pain of sedentary sitting."
        +"/n[Premium Silent Universal Wheels]--The 350 pound office chair uses universals wheels, which are silent and smooth, and can be easily moved on the floor or carpet ,and they won’t damage your floor either. which can enhance your sitting experience."
        +"/n[Adjustable 3D Armrests and Headrests]-Multi-purpose armrests can be adjusted up and down, front and back, providing more convenience for your work. Freely adjust the height and angle of the headrest to reduce daily neck and shoulder pain. The computer office chair has many functions that can adapt to your body and work needs."
        +"/n[Easy Installation & Warranty]-All home office chairs are provided with 1-year warranty, English instructions and 1 set simple tools, you can easily complete it in about 15 minutes on this basis. If you have any questions, please feel free to email us, we will give you a satisfactory solution ASAP.",
        image: "https://images-na.ssl-images-amazon.com/images/I/71PPeDWgBbL.__AC_SX300_SY300_QL70_ML2_.jpg" ,
        brand:"Ergonomic",
        categoryNumber:1,      
        subcategoryNumber:13 ,      
        stock: 100,        
        price: 254.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Ergonomic Office Chair ' to products collection");
      });

      new Product({
        name: "Sodagreen Galaxy Purple Washi Tape - Gold Foil Washi Masking Tape with Constalation, Blue Sky, Moon, Star, Celestial, Perfect for Bullet Journal, DIY Crafts (Purple Galaxy)",
        description: "💙PURPLE GALAXY WASHI TAPE : 12 rolls gold foil washi tape, width 15mm,length 2m . New design with constalation, blue sky, moon, star, celestial. This purple washi tape adds color and vitality to things that are pasted, making daily life more interesting."
        +"/n💙HIGH-QUALITY : Made of high-quality Japanese paper material, the surface is pastel and the color is durable. The material is environmentally friendly and has no odor. Our constalation washi tape can stick to most clean surfaces, also remove easily without any sticky residue."
        +"/n💙VIBRANT DESIGN: This blue sky washi tape is designed by professional Japanese designers. Various patterns can provide more choices for your use. Vibrant design gives you creativity. Your friends will be surprised by the creative gifts and decorations you make using this galaxy washi masking tape."
        +"/n💙WIDE RANGE OF USES: This star washi tape can be used to decorate anything you want, such as card/gift wrapping, scrapbooks, bullet journal,kids' art projects, mobile phone cases, photo frames, walls, etc. People of different ages will find happiness in these celestial washi tape. Please don't wait, add it to the shopping cart now and get creative."
        +"/n💙SERVICE GUARANTEE: Your satisfaction is our top priority. If you are not satisfied for any reason, you can return the item for a full refund, please rest assured to buy. If you have any questions, please contact customer service Toby or Lucy, we will provide you with a satisfactory solution.",
        image: "https://m.media-amazon.com/images/I/71uOcTW92uL._SX522_.jpg" ,
        brand:"Sodagreen",
        categoryNumber: 2,      
        subcategoryNumber: 21,      
        stock: 100,        
        price: 12.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Sodagreen Galaxy Purple Washi Tape' to products collection");
      });

      new Product({
        name: "100 Colors Alcohol Markers Dual Tips Permanent Art Markers Pen for Kids & Adult, Alcohol-Based Highlighter Pen Sketch Markers for Painting, Coloring, Sketching and Drawing.（BLACK)",
        description: "Art set 100 Vibrant Colors Alcohol Markers Plus 1 Blender Permanent Marker with 2 bases: Professional superior artist quality double-ended permanent art markers. Includes Fine tip 1mm and Broad tip 6mm all the primary and secondary color shade tones artists need for adult coloring,drawing,writing,sketching,illustrating,shading,designing,rendering,anime,adult coloring books, calligraphy,card making,stamping and more.Perfect for use on paper,ceramics,glass and more."
        +"/nFast Drying & High Quality,Find Colors Fast Art Marker Pens blend and layer well without leaving streaks behind and dry quickly.Our super quality permanent ink provides a rich color saturation and allows the colors to be laid down clean, smooth and evenly. Perfect color match every time you use them because the tips share a single ink reservoir.Color-coded caps keep tips from drying out and help you find any marker in a flash.These paint markers are built to last and wont easily fade."
        +"/nDual Tips Twin :Dual Tips Markers Design allows you to make thick and thin lines without changing alcohol markers.Includes Fine tip 1mm and Broad tip 6mm twin tips for precise highlighting, sketching and underlining. Thin markers can be used to write and hook line while thick art markers professional are suitable for drawing and coloring."
        +"/nPortable storage bag and new plastic pen holder:Art supplies comes with a durable zipper carry bag for storing,We use 1680D thick Oxford cloth bag, which is different from ordinary cloth bag and Using a new plastic penholder, we promise to never use recycled plastic,the pen holder is stronger and not easy to break during transportation.Make alcohol markers set very easy and convenient to portable carry around anywhere for travel or outdoor work.permanent marker,copic markers"
        +"/nMore than 100% Satisfaction Guarantee: we promise provide more than 100% Satisfaction Guarantee to customers.If you have any quality problems, please feel free to contact us.Simply request a refund or a replacement,After-sales issues resolved within 24 hours.(Note: To prevent the marker from drying and ink leaking, please recap and keep the marker laid flat after use.)",
        image: "https://m.media-amazon.com/images/I/71lOpUCFj3L._AC_SX679_.jpg" ,
        brand:"belleza suprema",
        categoryNumber: 2,      
        subcategoryNumber:22 ,      
        stock: 100,        
        price: 33.71,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '100 Colors Alcohol Markers ' to products collection");
      });

      new Product({
        name: "Aechy Colored Pens for Note Taking, Dual Tip Markers with 5 Different Curve Shapes & 8 Colors Fine Lines, Cool Pens for Adult Teenage Kids Coloring Books Writing Journaling Drawing Scrapbook Art Office(Rainbow)",
        description: "【Dual Tip Markers for Writing】 8 vivid and classic colors are divided to 5 unique mark line types, equipped with roller pen point, allow you to create colorful lines like any before. We believe Aechy colored pens will meet most your need for writing & marking"
        +"/n【Durable Quality】 Each cools pens features soft grip and 0.4mm durable tip. Premium material makes our pens glide smoothly than others. You will like the way you can mark and draw precisely in the tiny details of your notes and journals"
        +"/n【Long Lasting】 Upgraded journaling pens come with 40% more ink, can produce longer mark lines than before. These fine tip markers are easy to hold and comfortable, perfect as crafting, doodling, art designs, writing, drawing, scrapbooking, and journaling supplies"
        +"/n【Safe & High Performance】 Acid-free and non-toxic ink doesn’t smear, fade, or skip. Safe to give this journal pen to kids and girls. This fine point pen set allow all family enjoy smooth application for card making, arts crafts, coloring books, school project, DIY letters and more"
        +"/n【Gift Choice】 Why Not Consider giving this fun pen set as a gift? For now, this flair pens are popular gifts for kids or adult who like to express imagination. If you are not 100% satisfied with our product, please do not hesitate to contact us for any question, We’ll solve it for you within 12 hours",
        image: "https://m.media-amazon.com/images/I/71ANsE6kHcL._AC_SX679_.jpg" ,
        brand:"AECHY",
        categoryNumber: 2,      
        subcategoryNumber: 23,      
        stock: 100,        
        price: 17.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Aechy Colored Pens' to products collection");
      });

      new Product({
        name: "Pillows Queen Size 2 Pack for Sleeping, Soft and Supportive Bed Pillow for Side and Back Sleeper, Down Alternative Hotel Collection Pillows-20 x30",
        description: "QUEEN PILLOWS 2 PACK -- Each order will include two Hotel Quality Bed Pillows that are finished with well stitching and reinforced seams. An ideal choice for side, stomach and back sleepers as these pillows have a high loft and offer maximum comfort for any sleeping position."
        +"/nSOFT & SUPPORTIVE PILLOWS -- Since our down alternative pillows are made with a great balance of softness and plump firmness, so whether you prefer soft or firm pillows, these pillows are perfect for you!"
        +"/nBREATHABLE & MACHINE WASHABLE PILLOWS --Filled with 100% micro polyester fiber which makes the pillows fluffy and cozy. Quality shell ensure the pillow breathable and skin friendly. Machine washable capabilities enable Maintenance of its reusability and fresh appearance. Air dry or tumble dry after washing."
        +"/nGREAT RESILIENCE -- Quickly return to its original size of 20x30 inches after releasing from the vacuum sealed package, fluff the pillow regularly to retain its shape after long use. Pls allow 24 hours for them to fluff up completely."
        +"/nRISK-FREE PURCHASE -- Buy with confidence! Your satisfaction is backed by our Risk-free 30 Days and 1 Year Warranty against any defects. Give it a chance, you will have a better life!",
        image: "https://m.media-amazon.com/images/I/81A5oDeRGOL._AC_SX679_.jpg" ,
        brand:"JOLLYVOGUE",
        categoryNumber: 3,      
        subcategoryNumber: 31,      
        stock: 100,        
        price: 40.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Pillows Queen Size 2 Pack' to products collection");
      });

      new Product({
        name: "Bedsure White Duvet Cover Queen Size Set - Ultra Soft Microfiber Bed Set, 3 Piece Breathable Queen Bedding Set with Zipper Closure, Corner Ties, 90x90 Inch",
        description: "Quality Material: Utilizing 110GSM polyester microfiber fabric, Bedsure’s duvet cover set offers longer durability and comfort all year round. The comforter cover set applies a pre-washed process that creates exceptional softness with an artful cotton touch to give you beauty sleep all night long."
        +"/nPerfect Home Decoration: Bedsure’s duvet cover set presents a vintage feeling and beautiful wrinkled texture for homeowners with sophisticated tastes. The solid hue of the bedding cover set adds an extra layer of style and versatility, making it easy to coordinate and integrate with your room’s décor."
        +"/nThoughtful Design: Corner ties inside the duvet cover make your quilt fit snugly and avoid fill bunching. Seal off your comforter quicker and easier than a regular button closure with zipper."
        +"/nEasy Care: This duvet cover set simply needs to be machine washed in cold water on a permanent cycle, and then tumble dry low. Close zipper completely when washing."
        +"/nWhat You Can Get: Available in Bedsure duvet cover set queen with zipper closure, 1 duvet cover 90' x 90', 2 pillow shams 20'x26'. Please note this is a duvet cover set that doesn't include an insert or fill.",
        image: "https://m.media-amazon.com/images/I/919jO9hGf6L._AC_SX679_.jpg" ,
        brand:"Bedsure",
        categoryNumber: 3,      
        subcategoryNumber: 32,      
        stock: 100,        
        price: 42.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Chezmoi Collection Upland 7-Piece Quilted Patchwork Comforter Set, Burgundy/Black/Brown, Queen",
        description: "Upland 7-Piece Comforter Set Includes: 1 Comforter, 2 Shams, 1 Bedskirt, 1 Cushion, 1 Neck Roll, 1 Breakfast Pillow"
        +"/nQueen Size Measurements: Comforter 90' x 92', Shams 20' x 26', Bedskirt 60' x 80' +14' drop, Square Cushion 18' x 18', Neck Roll 7' x 18', Breakfast Pillow 12' x 18'"
        +"/nA luxurious pin-sonic pressed medallion design quilted in a patchwork pattern with each fabric pieced together. The perfect unison of three tone colors to draw out the exhilarating bedroom experience."
        +"/nSoft, lightweight, and comfy fabric versatile for any bedroom décor. Suitable for year round use."
        +"/nEasy Care - Machine wash gentle cycle with cold water; (Sun dry or low tumble dry)",
        image: "https://m.media-amazon.com/images/I/81nxTD5MSUL._AC_SX679_.jpg" ,
        brand:"Chezmoi",
        categoryNumber: 3,      
        subcategoryNumber: 33,      
        stock: 100,        
        price: 132.17,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Chezmoi Collection' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Fade Resistant Bath, Hand and Washcloth Towel Set - Teal",
        description: "6-piece towel set includes (2) 54 x 30 inch bath towels, (2) 26 x 16 inch hand towels, and (2) 12 x 12 inch washcloths"
        +"/nMade of 100% cotton for softness and tear-resistant strength"
        +"/nLightweight towels quickly absorbs moisture"
        +"/nDesigned with a classic and simple pique border"
        +"/nFade-resistant teal color"
        +"/nMade in OEKO-TEX Standard 100 factory, an independent certification system that ensures textiles meet high safety and environmental standards.",
        image: "https://m.media-amazon.com/images/I/91b9p1-YdUL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber:4 ,      
        subcategoryNumber: 41,      
        stock: 100,        
        price: 31.41,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Amazon Basics 6-Piece Fade ' to products collection");
      });

      new Product({
        name: "Amazon Basics Non-Slip Microfiber Shag Bathroom Rug Mat, 21' x 34', Seafoam Green",
        description: "Microfiber shag bath rug in Seafoam Green provides a comfortably plush place to stand and helps keep floors dry"
        +"/nAbsorbent, plush tufts across the entire surface soak up water fast; dries quickly for supreme comfort from one use to the next"
        +"/nNon-slip backing keeps the rug securely in place, even when wet, for added safety"
        +"/nMade of 85% polyester and 15% polyamide; imported; machine washable for easy home care"
        +"/nMeasures 21 by 34 inches; backed by an AmazonBasics limited one-year warranty",
        image: "https://m.media-amazon.com/images/I/91ppCguT44L._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 4,      
        subcategoryNumber: 42,      
        stock: 100,        
        price: 26.51,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Shark Rocket Ultra-Light Upright Vacuum Cleaner, Blue (HV300C) - Canadian Version",
        description: "Ultra lightweight: At under 9 pounds, it converts to a handheld vacuum for complete floor to ceiling cleaning"
        +"/nFingertip controls: Easily switch from hard floor to carpet, amps: 4.2"
        +"/nDual storage options: Fix the hand vac to the bottom of the wand or secure it to the wall mount"
        +"/nSwivel steering: Excellent control for maneuvering around furniture",
        image: "https://m.media-amazon.com/images/I/61UI6DIjH6L._AC_SX679_.jpg" ,
        brand:"Shark",
        categoryNumber: 5,      
        subcategoryNumber: 51,      
        stock: 100,        
        price: 149.98,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "7 Pcs Universal Vacuum Attachments Accessories Cleaning Kit Brush Nozzle Crevice Tool Dust Cleaner for 32mm and 35mm Standard Hose",
        description: "MULTIFUNCTION This Vacuum Attachment Can be used everywhere Get rid of all the dust Which you cant clean clearly with normal tools before, Such as your draw, corners, Keyboards, even your pets"
        +"/n100% EASY TO USE Just connect this dust brush cleaner to your vacuum and you can clean as seen as on TV, flexible tubes, strong suction and long size all of this can impress you deeply. The handle grip is very comfortable to use and the user can easily remove the dust in the house."
        +"/nUNIVERSAL VACUUM ATTACHMENT This universal vacuum dust attachment with the adapter is suitable for MOST (NOT ALL) types of vacuum cleaners with 32/35mm (1.3 inches) inner diameter hose, such as Dyson vacuum cleaner-DC35,DC45,DC58,DC59,DC62,V6,Hand Vacuum cleaner,Fan vac cleaner, Car vent cleaner,Vent Vac cleaner, Mini Vac Cleaner.THIS PRODUCT IS NOT DESIGNED FOR HOOVER AND SHARK VACUUM CLEANER."
        +"/nINNOVATIVE DESIGN Made with 36 flexible micro-size suction tubes.They are flexible somewhere you cant clean clearly with normal tools, but not with this one, you can use it to clean your draw, corners, even your pets.Can be used everywhere."
        +"/nSAVE TIME AND ENERGY It is the best cleaning tool ever,The advantages of design is you need not to move objects anymore, flexible tubes can fix all. Long and flexible tubes have access to any deep corners, no longer need to do more job.",
        image: "https://m.media-amazon.com/images/I/61oJAOwFytL._AC_SX679_.jpg" ,
        brand:"GUOLANSAALINAA",
        categoryNumber: 5,      
        subcategoryNumber: 52,      
        stock: 100,        
        price: 21.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Vileda EasyWring Microfibre Spin Mop & Bucket Floor Cleaning System",
        description: "Exclusive bucket design has built-in wringer that allows for hands-free wringing"
        +"/nDeep-cleaning microfibre removes and absorbs tough dirt and grime"
        +"/nHigh-quality foot pedal designed to activate spin wringing, allowing the level of moisture to be controlled"
        +"/nFeatures Splash Guard to keep splash and spray inside bucket when wringing"
        +"/nCompatible with the EasyWring Mop Refill available at amazon.ca",
        image: "https://m.media-amazon.com/images/I/61Zk4yPT+dL._AC_SX679_.jpg" ,
        brand:"Vileda",
        categoryNumber: 5,      
        subcategoryNumber: 53,      
        stock: 100,        
        price: 37.00,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Dupray Neat Steam Cleaner Powerful Multipurpose Portable Heavy Duty Steamer for Floors, Cars, Tiles, Grout Cleaning. Chemical Free, Disinfection, for Home Use and More. Kills 99.99%* of Bacteria and Viruses.",
        description: "STEAM CLEAN. DEGREASE. DEODORIZE. ANY SURFACE. BETTER."
        +"/nPOWERFUL STEAM CLEANER: up to 275 Degree F/135 Degree Celsius. Best multi purpose steamer for home, cars and more."
        +"/nHEAVY-DUTY & LARGE CAPACITY: Up to 50 minutes of cleaning time per fill up."
        +"/nPERFECT FOR FLOOR CLEANING: use any regular towel or cloth, no need for expensive special pads!"
        +"/n2-year Limited Warranty / Lifetime Warranty on steam cleaner boiler.",
        image: "https://m.media-amazon.com/images/I/71CD3C7yfJL._AC_SX679_.jpg" ,
        brand:"Dupray",
        categoryNumber: 5,      
        subcategoryNumber: 54,      
        stock: 100,        
        price: 199.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Dupray Neat Steam clearner' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Nonstick Oven Bakeware Baking Set",
        description: "6-piece bakeware set includes a 9x5-inch loaf pan, 2 round 9-inch cake pans, a 12-cup muffin pan, a 13x9-inch roast pan, and a 13x9-inch baking sheet"
        +"/nMade of heavy-weight steel for thorough, even heating"
        +"/nNonstick coating for effortless food release and easy cleaning"
        +"/nOven-safe to 500 degrees F"
        +"/nHand-wash only recommended",
        image: "https://m.media-amazon.com/images/I/91hBA6hLfuL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 6,      
        subcategoryNumber: 61,      
        stock: 100,        
        price: 32.86,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'mazon Basics 6-Piece ' to products collection");
      });   

    new Product({
        name: "Molblly Queen Bed Frame Premium Upholstered Platform Beds with Strong Wood Slat Support and No Box Spring Needed,Easy Assembly/Queen Size Bed Blue(60”*80”",
        description: "👍[Premium Materials] The platform bed frame profileis and foot made of high hardness metal.The soft-packed part of bed frames’ padded are made of high-quality linen fabric wrapped. It can reduce noise and give you a quiet and comfortable resting environment."
        +"/n🏆[Unique Design] The cushions are more comfortable and softer than other bed headboard cushions.The cushions can be adjusted to different heights to meet various needs and also be disassembled and cleaned."
        +"/n👉[Durable Construction] The bed slats are made of strong hardwood slats are spaced 3.2-3.7 inches and nine leg support for durabilityapart to support the life of the mattress and ensure durability and support.The 45-degree curved ribbed bed board uses the principle of mechanical dispersion, and each bed board is evenly stressed."
        +"/n🔔[Strong Bearing] Twin size supports a maximum weight capacity of 280kgs, while all other sizes can support up to 480kgs"
        +"/n🔑{Easily Assembled} Tools and instructions book of this bed frame are packed in a box.Installation video is attached for reference.If you need our help, please feel free to contact us (24/7)",
        image: "https://m.media-amazon.com/images/I/81jy-TLZSDL._AC_SX679_.jpg" ,
        brand:"Molblly",
        categoryNumber: 1,      
        subcategoryNumber: 11,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Molblly Queen Bed' to products collection");
      });

      new Product({
        name: "FDW Dining Table Set Dining Table Dining Room Table Set for Small Spaces Kitchen Table and Chairs for 4 Table with Chairs Home Furniture Rectangular Modern，Black",
        description: 
        "【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table "
        +"/n【Easy to Assemble 】Exquisite hardware and detailed manual are included of the dining table. All parts of the dining room table set are listed and numbered and specific assembly steps are also shown in the instruction of the Dining Table Set.dining table Dining Table Set dining room table dining room table set Table Set"
        +"/n【Comfortable and Elegant】 This dining chairs are Personality, mid-century modern sensibility dining chairs,Such a dining cahirs with ergonomically designed.Kitchen Chairs Chair for Kitchen side chairs dining dining chairs Dining Room Chairs"
        +"/n【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table"
        +"/n【Easy To Storage and Keep Tidy】Dining chairs of dining table set can be moved under the dining table when you finish your meal, which our kitchen table setlargely helps you save room space. Featuring smooth surface, our table and chairs set is easy to be kept clean.table and chairs set kitchen table and chairs for 4 dining table set",
        image: "https://m.media-amazon.com/images/I/61rn01u4KDL._AC_SX679_.jpg" ,
        brand:"FDW",
        categoryNumber: 1,      
        subcategoryNumber:12 ,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'dinging table' to products collection");
      });

      new Product({
        name: "Ergonomic Office Chair - KERDOM Comfortable Computer Chair with Adjustable Headrest and Armrests, High Back Mesh Gaming Chair Executive Swivel Chair(Black S)",
        description: "[Comfortable Backrest Design]- Y shaped backrest supports design, fits the spine line, fully supports your back, and helps release the pressure on the spine and shoulders. The back tilts 90 to 135 degrees,Three level locking. allowing you to rest after a long time working. Our brand has always been committed to bringing customers a comfortable office experience."
        +"/n[Breathable and Comfortable Office Chair]-An ergonomic office chair with a mesh backrest and seat to maintain air circulation and avoid sweating and adhesion. The high-density native sponge cushion is soft and breathable. Keep you away from the pain of sedentary sitting."
        +"/n[Premium Silent Universal Wheels]--The 350 pound office chair uses universals wheels, which are silent and smooth, and can be easily moved on the floor or carpet ,and they won’t damage your floor either. which can enhance your sitting experience."
        +"/n[Adjustable 3D Armrests and Headrests]-Multi-purpose armrests can be adjusted up and down, front and back, providing more convenience for your work. Freely adjust the height and angle of the headrest to reduce daily neck and shoulder pain. The computer office chair has many functions that can adapt to your body and work needs."
        +"/n[Easy Installation & Warranty]-All home office chairs are provided with 1-year warranty, English instructions and 1 set simple tools, you can easily complete it in about 15 minutes on this basis. If you have any questions, please feel free to email us, we will give you a satisfactory solution ASAP.",
        image: "https://images-na.ssl-images-amazon.com/images/I/71PPeDWgBbL.__AC_SX300_SY300_QL70_ML2_.jpg" ,
        brand:"Ergonomic",
        categoryNumber:1,      
        subcategoryNumber:13 ,      
        stock: 100,        
        price: 254.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Ergonomic Office Chair ' to products collection");
      });

      new Product({
        name: "Sodagreen Galaxy Purple Washi Tape - Gold Foil Washi Masking Tape with Constalation, Blue Sky, Moon, Star, Celestial, Perfect for Bullet Journal, DIY Crafts (Purple Galaxy)",
        description: "💙PURPLE GALAXY WASHI TAPE : 12 rolls gold foil washi tape, width 15mm,length 2m . New design with constalation, blue sky, moon, star, celestial. This purple washi tape adds color and vitality to things that are pasted, making daily life more interesting."
        +"/n💙HIGH-QUALITY : Made of high-quality Japanese paper material, the surface is pastel and the color is durable. The material is environmentally friendly and has no odor. Our constalation washi tape can stick to most clean surfaces, also remove easily without any sticky residue."
        +"/n💙VIBRANT DESIGN: This blue sky washi tape is designed by professional Japanese designers. Various patterns can provide more choices for your use. Vibrant design gives you creativity. Your friends will be surprised by the creative gifts and decorations you make using this galaxy washi masking tape."
        +"/n💙WIDE RANGE OF USES: This star washi tape can be used to decorate anything you want, such as card/gift wrapping, scrapbooks, bullet journal,kids' art projects, mobile phone cases, photo frames, walls, etc. People of different ages will find happiness in these celestial washi tape. Please don't wait, add it to the shopping cart now and get creative."
        +"/n💙SERVICE GUARANTEE: Your satisfaction is our top priority. If you are not satisfied for any reason, you can return the item for a full refund, please rest assured to buy. If you have any questions, please contact customer service Toby or Lucy, we will provide you with a satisfactory solution.",
        image: "https://m.media-amazon.com/images/I/71uOcTW92uL._SX522_.jpg" ,
        brand:"Sodagreen",
        categoryNumber: 2,      
        subcategoryNumber: 21,      
        stock: 100,        
        price: 12.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Sodagreen Galaxy Purple Washi Tape' to products collection");
      });

      new Product({
        name: "100 Colors Alcohol Markers Dual Tips Permanent Art Markers Pen for Kids & Adult, Alcohol-Based Highlighter Pen Sketch Markers for Painting, Coloring, Sketching and Drawing.（BLACK)",
        description: "Art set 100 Vibrant Colors Alcohol Markers Plus 1 Blender Permanent Marker with 2 bases: Professional superior artist quality double-ended permanent art markers. Includes Fine tip 1mm and Broad tip 6mm all the primary and secondary color shade tones artists need for adult coloring,drawing,writing,sketching,illustrating,shading,designing,rendering,anime,adult coloring books, calligraphy,card making,stamping and more.Perfect for use on paper,ceramics,glass and more."
        +"/nFast Drying & High Quality,Find Colors Fast Art Marker Pens blend and layer well without leaving streaks behind and dry quickly.Our super quality permanent ink provides a rich color saturation and allows the colors to be laid down clean, smooth and evenly. Perfect color match every time you use them because the tips share a single ink reservoir.Color-coded caps keep tips from drying out and help you find any marker in a flash.These paint markers are built to last and wont easily fade."
        +"/nDual Tips Twin :Dual Tips Markers Design allows you to make thick and thin lines without changing alcohol markers.Includes Fine tip 1mm and Broad tip 6mm twin tips for precise highlighting, sketching and underlining. Thin markers can be used to write and hook line while thick art markers professional are suitable for drawing and coloring."
        +"/nPortable storage bag and new plastic pen holder:Art supplies comes with a durable zipper carry bag for storing,We use 1680D thick Oxford cloth bag, which is different from ordinary cloth bag and Using a new plastic penholder, we promise to never use recycled plastic,the pen holder is stronger and not easy to break during transportation.Make alcohol markers set very easy and convenient to portable carry around anywhere for travel or outdoor work.permanent marker,copic markers"
        +"/nMore than 100% Satisfaction Guarantee: we promise provide more than 100% Satisfaction Guarantee to customers.If you have any quality problems, please feel free to contact us.Simply request a refund or a replacement,After-sales issues resolved within 24 hours.(Note: To prevent the marker from drying and ink leaking, please recap and keep the marker laid flat after use.)",
        image: "https://m.media-amazon.com/images/I/71lOpUCFj3L._AC_SX679_.jpg" ,
        brand:"belleza suprema",
        categoryNumber: 2,      
        subcategoryNumber:22 ,      
        stock: 100,        
        price: 33.71,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '100 Colors Alcohol Markers ' to products collection");
      });

      new Product({
        name: "Aechy Colored Pens for Note Taking, Dual Tip Markers with 5 Different Curve Shapes & 8 Colors Fine Lines, Cool Pens for Adult Teenage Kids Coloring Books Writing Journaling Drawing Scrapbook Art Office(Rainbow)",
        description: "【Dual Tip Markers for Writing】 8 vivid and classic colors are divided to 5 unique mark line types, equipped with roller pen point, allow you to create colorful lines like any before. We believe Aechy colored pens will meet most your need for writing & marking"
        +"/n【Durable Quality】 Each cools pens features soft grip and 0.4mm durable tip. Premium material makes our pens glide smoothly than others. You will like the way you can mark and draw precisely in the tiny details of your notes and journals"
        +"/n【Long Lasting】 Upgraded journaling pens come with 40% more ink, can produce longer mark lines than before. These fine tip markers are easy to hold and comfortable, perfect as crafting, doodling, art designs, writing, drawing, scrapbooking, and journaling supplies"
        +"/n【Safe & High Performance】 Acid-free and non-toxic ink doesn’t smear, fade, or skip. Safe to give this journal pen to kids and girls. This fine point pen set allow all family enjoy smooth application for card making, arts crafts, coloring books, school project, DIY letters and more"
        +"/n【Gift Choice】 Why Not Consider giving this fun pen set as a gift? For now, this flair pens are popular gifts for kids or adult who like to express imagination. If you are not 100% satisfied with our product, please do not hesitate to contact us for any question, We’ll solve it for you within 12 hours",
        image: "https://m.media-amazon.com/images/I/71ANsE6kHcL._AC_SX679_.jpg" ,
        brand:"AECHY",
        categoryNumber: 2,      
        subcategoryNumber: 23,      
        stock: 100,        
        price: 17.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Aechy Colored Pens' to products collection");
      });

      new Product({
        name: "Pillows Queen Size 2 Pack for Sleeping, Soft and Supportive Bed Pillow for Side and Back Sleeper, Down Alternative Hotel Collection Pillows-20 x30",
        description: "QUEEN PILLOWS 2 PACK -- Each order will include two Hotel Quality Bed Pillows that are finished with well stitching and reinforced seams. An ideal choice for side, stomach and back sleepers as these pillows have a high loft and offer maximum comfort for any sleeping position."
        +"/nSOFT & SUPPORTIVE PILLOWS -- Since our down alternative pillows are made with a great balance of softness and plump firmness, so whether you prefer soft or firm pillows, these pillows are perfect for you!"
        +"/nBREATHABLE & MACHINE WASHABLE PILLOWS --Filled with 100% micro polyester fiber which makes the pillows fluffy and cozy. Quality shell ensure the pillow breathable and skin friendly. Machine washable capabilities enable Maintenance of its reusability and fresh appearance. Air dry or tumble dry after washing."
        +"/nGREAT RESILIENCE -- Quickly return to its original size of 20x30 inches after releasing from the vacuum sealed package, fluff the pillow regularly to retain its shape after long use. Pls allow 24 hours for them to fluff up completely."
        +"/nRISK-FREE PURCHASE -- Buy with confidence! Your satisfaction is backed by our Risk-free 30 Days and 1 Year Warranty against any defects. Give it a chance, you will have a better life!",
        image: "https://m.media-amazon.com/images/I/81A5oDeRGOL._AC_SX679_.jpg" ,
        brand:"JOLLYVOGUE",
        categoryNumber: 3,      
        subcategoryNumber: 31,      
        stock: 100,        
        price: 40.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Pillows Queen Size 2 Pack' to products collection");
      });

      new Product({
        name: "Bedsure White Duvet Cover Queen Size Set - Ultra Soft Microfiber Bed Set, 3 Piece Breathable Queen Bedding Set with Zipper Closure, Corner Ties, 90x90 Inch",
        description: "Quality Material: Utilizing 110GSM polyester microfiber fabric, Bedsure’s duvet cover set offers longer durability and comfort all year round. The comforter cover set applies a pre-washed process that creates exceptional softness with an artful cotton touch to give you beauty sleep all night long."
        +"/nPerfect Home Decoration: Bedsure’s duvet cover set presents a vintage feeling and beautiful wrinkled texture for homeowners with sophisticated tastes. The solid hue of the bedding cover set adds an extra layer of style and versatility, making it easy to coordinate and integrate with your room’s décor."
        +"/nThoughtful Design: Corner ties inside the duvet cover make your quilt fit snugly and avoid fill bunching. Seal off your comforter quicker and easier than a regular button closure with zipper."
        +"/nEasy Care: This duvet cover set simply needs to be machine washed in cold water on a permanent cycle, and then tumble dry low. Close zipper completely when washing."
        +"/nWhat You Can Get: Available in Bedsure duvet cover set queen with zipper closure, 1 duvet cover 90' x 90', 2 pillow shams 20'x26'. Please note this is a duvet cover set that doesn't include an insert or fill.",
        image: "https://m.media-amazon.com/images/I/919jO9hGf6L._AC_SX679_.jpg" ,
        brand:"Bedsure",
        categoryNumber: 3,      
        subcategoryNumber: 32,      
        stock: 100,        
        price: 42.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Chezmoi Collection Upland 7-Piece Quilted Patchwork Comforter Set, Burgundy/Black/Brown, Queen",
        description: "Upland 7-Piece Comforter Set Includes: 1 Comforter, 2 Shams, 1 Bedskirt, 1 Cushion, 1 Neck Roll, 1 Breakfast Pillow"
        +"/nQueen Size Measurements: Comforter 90' x 92', Shams 20' x 26', Bedskirt 60' x 80' +14' drop, Square Cushion 18' x 18', Neck Roll 7' x 18', Breakfast Pillow 12' x 18'"
        +"/nA luxurious pin-sonic pressed medallion design quilted in a patchwork pattern with each fabric pieced together. The perfect unison of three tone colors to draw out the exhilarating bedroom experience."
        +"/nSoft, lightweight, and comfy fabric versatile for any bedroom décor. Suitable for year round use."
        +"/nEasy Care - Machine wash gentle cycle with cold water; (Sun dry or low tumble dry)",
        image: "https://m.media-amazon.com/images/I/81nxTD5MSUL._AC_SX679_.jpg" ,
        brand:"Chezmoi",
        categoryNumber: 3,      
        subcategoryNumber: 33,      
        stock: 100,        
        price: 132.17,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Chezmoi Collection' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Fade Resistant Bath, Hand and Washcloth Towel Set - Teal",
        description: "6-piece towel set includes (2) 54 x 30 inch bath towels, (2) 26 x 16 inch hand towels, and (2) 12 x 12 inch washcloths"
        +"/nMade of 100% cotton for softness and tear-resistant strength"
        +"/nLightweight towels quickly absorbs moisture"
        +"/nDesigned with a classic and simple pique border"
        +"/nFade-resistant teal color"
        +"/nMade in OEKO-TEX Standard 100 factory, an independent certification system that ensures textiles meet high safety and environmental standards.",
        image: "https://m.media-amazon.com/images/I/91b9p1-YdUL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber:4 ,      
        subcategoryNumber: 41,      
        stock: 100,        
        price: 31.41,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Amazon Basics 6-Piece Fade ' to products collection");
      });

      new Product({
        name: "Amazon Basics Non-Slip Microfiber Shag Bathroom Rug Mat, 21' x 34', Seafoam Green",
        description: "Microfiber shag bath rug in Seafoam Green provides a comfortably plush place to stand and helps keep floors dry"
        +"/nAbsorbent, plush tufts across the entire surface soak up water fast; dries quickly for supreme comfort from one use to the next"
        +"/nNon-slip backing keeps the rug securely in place, even when wet, for added safety"
        +"/nMade of 85% polyester and 15% polyamide; imported; machine washable for easy home care"
        +"/nMeasures 21 by 34 inches; backed by an AmazonBasics limited one-year warranty",
        image: "https://m.media-amazon.com/images/I/91ppCguT44L._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 4,      
        subcategoryNumber: 42,      
        stock: 100,        
        price: 26.51,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Shark Rocket Ultra-Light Upright Vacuum Cleaner, Blue (HV300C) - Canadian Version",
        description: "Ultra lightweight: At under 9 pounds, it converts to a handheld vacuum for complete floor to ceiling cleaning"
        +"/nFingertip controls: Easily switch from hard floor to carpet, amps: 4.2"
        +"/nDual storage options: Fix the hand vac to the bottom of the wand or secure it to the wall mount"
        +"/nSwivel steering: Excellent control for maneuvering around furniture",
        image: "https://m.media-amazon.com/images/I/61UI6DIjH6L._AC_SX679_.jpg" ,
        brand:"Shark",
        categoryNumber: 5,      
        subcategoryNumber: 51,      
        stock: 100,        
        price: 149.98,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "7 Pcs Universal Vacuum Attachments Accessories Cleaning Kit Brush Nozzle Crevice Tool Dust Cleaner for 32mm and 35mm Standard Hose",
        description: "MULTIFUNCTION This Vacuum Attachment Can be used everywhere Get rid of all the dust Which you cant clean clearly with normal tools before, Such as your draw, corners, Keyboards, even your pets"
        +"/n100% EASY TO USE Just connect this dust brush cleaner to your vacuum and you can clean as seen as on TV, flexible tubes, strong suction and long size all of this can impress you deeply. The handle grip is very comfortable to use and the user can easily remove the dust in the house."
        +"/nUNIVERSAL VACUUM ATTACHMENT This universal vacuum dust attachment with the adapter is suitable for MOST (NOT ALL) types of vacuum cleaners with 32/35mm (1.3 inches) inner diameter hose, such as Dyson vacuum cleaner-DC35,DC45,DC58,DC59,DC62,V6,Hand Vacuum cleaner,Fan vac cleaner, Car vent cleaner,Vent Vac cleaner, Mini Vac Cleaner.THIS PRODUCT IS NOT DESIGNED FOR HOOVER AND SHARK VACUUM CLEANER."
        +"/nINNOVATIVE DESIGN Made with 36 flexible micro-size suction tubes.They are flexible somewhere you cant clean clearly with normal tools, but not with this one, you can use it to clean your draw, corners, even your pets.Can be used everywhere."
        +"/nSAVE TIME AND ENERGY It is the best cleaning tool ever,The advantages of design is you need not to move objects anymore, flexible tubes can fix all. Long and flexible tubes have access to any deep corners, no longer need to do more job.",
        image: "https://m.media-amazon.com/images/I/61oJAOwFytL._AC_SX679_.jpg" ,
        brand:"GUOLANSAALINAA",
        categoryNumber: 5,      
        subcategoryNumber: 52,      
        stock: 100,        
        price: 21.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Vileda EasyWring Microfibre Spin Mop & Bucket Floor Cleaning System",
        description: "Exclusive bucket design has built-in wringer that allows for hands-free wringing"
        +"/nDeep-cleaning microfibre removes and absorbs tough dirt and grime"
        +"/nHigh-quality foot pedal designed to activate spin wringing, allowing the level of moisture to be controlled"
        +"/nFeatures Splash Guard to keep splash and spray inside bucket when wringing"
        +"/nCompatible with the EasyWring Mop Refill available at amazon.ca",
        image: "https://m.media-amazon.com/images/I/61Zk4yPT+dL._AC_SX679_.jpg" ,
        brand:"Vileda",
        categoryNumber: 5,      
        subcategoryNumber: 53,      
        stock: 100,        
        price: 37.00,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Dupray Neat Steam Cleaner Powerful Multipurpose Portable Heavy Duty Steamer for Floors, Cars, Tiles, Grout Cleaning. Chemical Free, Disinfection, for Home Use and More. Kills 99.99%* of Bacteria and Viruses.",
        description: "STEAM CLEAN. DEGREASE. DEODORIZE. ANY SURFACE. BETTER."
        +"/nPOWERFUL STEAM CLEANER: up to 275 Degree F/135 Degree Celsius. Best multi purpose steamer for home, cars and more."
        +"/nHEAVY-DUTY & LARGE CAPACITY: Up to 50 minutes of cleaning time per fill up."
        +"/nPERFECT FOR FLOOR CLEANING: use any regular towel or cloth, no need for expensive special pads!"
        +"/n2-year Limited Warranty / Lifetime Warranty on steam cleaner boiler.",
        image: "https://m.media-amazon.com/images/I/71CD3C7yfJL._AC_SX679_.jpg" ,
        brand:"Dupray",
        categoryNumber: 5,      
        subcategoryNumber: 54,      
        stock: 100,        
        price: 199.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Dupray Neat Steam clearner' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Nonstick Oven Bakeware Baking Set",
        description: "6-piece bakeware set includes a 9x5-inch loaf pan, 2 round 9-inch cake pans, a 12-cup muffin pan, a 13x9-inch roast pan, and a 13x9-inch baking sheet"
        +"/nMade of heavy-weight steel for thorough, even heating"
        +"/nNonstick coating for effortless food release and easy cleaning"
        +"/nOven-safe to 500 degrees F"
        +"/nHand-wash only recommended",
        image: "https://m.media-amazon.com/images/I/91hBA6hLfuL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 6,      
        subcategoryNumber: 61,      
        stock: 100,        
        price: 32.86,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'mazon Basics 6-Piece ' to products collection");
      });   

    new Product({
        name: "Molblly Queen Bed Frame Premium Upholstered Platform Beds with Strong Wood Slat Support and No Box Spring Needed,Easy Assembly/Queen Size Bed Blue(60”*80”",
        description: "👍[Premium Materials] The platform bed frame profileis and foot made of high hardness metal.The soft-packed part of bed frames’ padded are made of high-quality linen fabric wrapped. It can reduce noise and give you a quiet and comfortable resting environment."
        +"/n🏆[Unique Design] The cushions are more comfortable and softer than other bed headboard cushions.The cushions can be adjusted to different heights to meet various needs and also be disassembled and cleaned."
        +"/n👉[Durable Construction] The bed slats are made of strong hardwood slats are spaced 3.2-3.7 inches and nine leg support for durabilityapart to support the life of the mattress and ensure durability and support.The 45-degree curved ribbed bed board uses the principle of mechanical dispersion, and each bed board is evenly stressed."
        +"/n🔔[Strong Bearing] Twin size supports a maximum weight capacity of 280kgs, while all other sizes can support up to 480kgs"
        +"/n🔑{Easily Assembled} Tools and instructions book of this bed frame are packed in a box.Installation video is attached for reference.If you need our help, please feel free to contact us (24/7)",
        image: "https://m.media-amazon.com/images/I/81jy-TLZSDL._AC_SX679_.jpg" ,
        brand:"Molblly",
        categoryNumber: 1,      
        subcategoryNumber: 11,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Molblly Queen Bed' to products collection");
      });

      new Product({
        name: "FDW Dining Table Set Dining Table Dining Room Table Set for Small Spaces Kitchen Table and Chairs for 4 Table with Chairs Home Furniture Rectangular Modern，Black",
        description: 
        "【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table "
        +"/n【Easy to Assemble 】Exquisite hardware and detailed manual are included of the dining table. All parts of the dining room table set are listed and numbered and specific assembly steps are also shown in the instruction of the Dining Table Set.dining table Dining Table Set dining room table dining room table set Table Set"
        +"/n【Comfortable and Elegant】 This dining chairs are Personality, mid-century modern sensibility dining chairs,Such a dining cahirs with ergonomically designed.Kitchen Chairs Chair for Kitchen side chairs dining dining chairs Dining Room Chairs"
        +"/n【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table"
        +"/n【Easy To Storage and Keep Tidy】Dining chairs of dining table set can be moved under the dining table when you finish your meal, which our kitchen table setlargely helps you save room space. Featuring smooth surface, our table and chairs set is easy to be kept clean.table and chairs set kitchen table and chairs for 4 dining table set",
        image: "https://m.media-amazon.com/images/I/61rn01u4KDL._AC_SX679_.jpg" ,
        brand:"FDW",
        categoryNumber: 1,      
        subcategoryNumber:12 ,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'dinging table' to products collection");
      });

      new Product({
        name: "Ergonomic Office Chair - KERDOM Comfortable Computer Chair with Adjustable Headrest and Armrests, High Back Mesh Gaming Chair Executive Swivel Chair(Black S)",
        description: "[Comfortable Backrest Design]- Y shaped backrest supports design, fits the spine line, fully supports your back, and helps release the pressure on the spine and shoulders. The back tilts 90 to 135 degrees,Three level locking. allowing you to rest after a long time working. Our brand has always been committed to bringing customers a comfortable office experience."
        +"/n[Breathable and Comfortable Office Chair]-An ergonomic office chair with a mesh backrest and seat to maintain air circulation and avoid sweating and adhesion. The high-density native sponge cushion is soft and breathable. Keep you away from the pain of sedentary sitting."
        +"/n[Premium Silent Universal Wheels]--The 350 pound office chair uses universals wheels, which are silent and smooth, and can be easily moved on the floor or carpet ,and they won’t damage your floor either. which can enhance your sitting experience."
        +"/n[Adjustable 3D Armrests and Headrests]-Multi-purpose armrests can be adjusted up and down, front and back, providing more convenience for your work. Freely adjust the height and angle of the headrest to reduce daily neck and shoulder pain. The computer office chair has many functions that can adapt to your body and work needs."
        +"/n[Easy Installation & Warranty]-All home office chairs are provided with 1-year warranty, English instructions and 1 set simple tools, you can easily complete it in about 15 minutes on this basis. If you have any questions, please feel free to email us, we will give you a satisfactory solution ASAP.",
        image: "https://images-na.ssl-images-amazon.com/images/I/71PPeDWgBbL.__AC_SX300_SY300_QL70_ML2_.jpg" ,
        brand:"Ergonomic",
        categoryNumber:1,      
        subcategoryNumber:13 ,      
        stock: 100,        
        price: 254.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Ergonomic Office Chair ' to products collection");
      });

      new Product({
        name: "Sodagreen Galaxy Purple Washi Tape - Gold Foil Washi Masking Tape with Constalation, Blue Sky, Moon, Star, Celestial, Perfect for Bullet Journal, DIY Crafts (Purple Galaxy)",
        description: "💙PURPLE GALAXY WASHI TAPE : 12 rolls gold foil washi tape, width 15mm,length 2m . New design with constalation, blue sky, moon, star, celestial. This purple washi tape adds color and vitality to things that are pasted, making daily life more interesting."
        +"/n💙HIGH-QUALITY : Made of high-quality Japanese paper material, the surface is pastel and the color is durable. The material is environmentally friendly and has no odor. Our constalation washi tape can stick to most clean surfaces, also remove easily without any sticky residue."
        +"/n💙VIBRANT DESIGN: This blue sky washi tape is designed by professional Japanese designers. Various patterns can provide more choices for your use. Vibrant design gives you creativity. Your friends will be surprised by the creative gifts and decorations you make using this galaxy washi masking tape."
        +"/n💙WIDE RANGE OF USES: This star washi tape can be used to decorate anything you want, such as card/gift wrapping, scrapbooks, bullet journal,kids' art projects, mobile phone cases, photo frames, walls, etc. People of different ages will find happiness in these celestial washi tape. Please don't wait, add it to the shopping cart now and get creative."
        +"/n💙SERVICE GUARANTEE: Your satisfaction is our top priority. If you are not satisfied for any reason, you can return the item for a full refund, please rest assured to buy. If you have any questions, please contact customer service Toby or Lucy, we will provide you with a satisfactory solution.",
        image: "https://m.media-amazon.com/images/I/71uOcTW92uL._SX522_.jpg" ,
        brand:"Sodagreen",
        categoryNumber: 2,      
        subcategoryNumber: 21,      
        stock: 100,        
        price: 12.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Sodagreen Galaxy Purple Washi Tape' to products collection");
      });

      new Product({
        name: "100 Colors Alcohol Markers Dual Tips Permanent Art Markers Pen for Kids & Adult, Alcohol-Based Highlighter Pen Sketch Markers for Painting, Coloring, Sketching and Drawing.（BLACK)",
        description: "Art set 100 Vibrant Colors Alcohol Markers Plus 1 Blender Permanent Marker with 2 bases: Professional superior artist quality double-ended permanent art markers. Includes Fine tip 1mm and Broad tip 6mm all the primary and secondary color shade tones artists need for adult coloring,drawing,writing,sketching,illustrating,shading,designing,rendering,anime,adult coloring books, calligraphy,card making,stamping and more.Perfect for use on paper,ceramics,glass and more."
        +"/nFast Drying & High Quality,Find Colors Fast Art Marker Pens blend and layer well without leaving streaks behind and dry quickly.Our super quality permanent ink provides a rich color saturation and allows the colors to be laid down clean, smooth and evenly. Perfect color match every time you use them because the tips share a single ink reservoir.Color-coded caps keep tips from drying out and help you find any marker in a flash.These paint markers are built to last and wont easily fade."
        +"/nDual Tips Twin :Dual Tips Markers Design allows you to make thick and thin lines without changing alcohol markers.Includes Fine tip 1mm and Broad tip 6mm twin tips for precise highlighting, sketching and underlining. Thin markers can be used to write and hook line while thick art markers professional are suitable for drawing and coloring."
        +"/nPortable storage bag and new plastic pen holder:Art supplies comes with a durable zipper carry bag for storing,We use 1680D thick Oxford cloth bag, which is different from ordinary cloth bag and Using a new plastic penholder, we promise to never use recycled plastic,the pen holder is stronger and not easy to break during transportation.Make alcohol markers set very easy and convenient to portable carry around anywhere for travel or outdoor work.permanent marker,copic markers"
        +"/nMore than 100% Satisfaction Guarantee: we promise provide more than 100% Satisfaction Guarantee to customers.If you have any quality problems, please feel free to contact us.Simply request a refund or a replacement,After-sales issues resolved within 24 hours.(Note: To prevent the marker from drying and ink leaking, please recap and keep the marker laid flat after use.)",
        image: "https://m.media-amazon.com/images/I/71lOpUCFj3L._AC_SX679_.jpg" ,
        brand:"belleza suprema",
        categoryNumber: 2,      
        subcategoryNumber:22 ,      
        stock: 100,        
        price: 33.71,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '100 Colors Alcohol Markers ' to products collection");
      });

      new Product({
        name: "Aechy Colored Pens for Note Taking, Dual Tip Markers with 5 Different Curve Shapes & 8 Colors Fine Lines, Cool Pens for Adult Teenage Kids Coloring Books Writing Journaling Drawing Scrapbook Art Office(Rainbow)",
        description: "【Dual Tip Markers for Writing】 8 vivid and classic colors are divided to 5 unique mark line types, equipped with roller pen point, allow you to create colorful lines like any before. We believe Aechy colored pens will meet most your need for writing & marking"
        +"/n【Durable Quality】 Each cools pens features soft grip and 0.4mm durable tip. Premium material makes our pens glide smoothly than others. You will like the way you can mark and draw precisely in the tiny details of your notes and journals"
        +"/n【Long Lasting】 Upgraded journaling pens come with 40% more ink, can produce longer mark lines than before. These fine tip markers are easy to hold and comfortable, perfect as crafting, doodling, art designs, writing, drawing, scrapbooking, and journaling supplies"
        +"/n【Safe & High Performance】 Acid-free and non-toxic ink doesn’t smear, fade, or skip. Safe to give this journal pen to kids and girls. This fine point pen set allow all family enjoy smooth application for card making, arts crafts, coloring books, school project, DIY letters and more"
        +"/n【Gift Choice】 Why Not Consider giving this fun pen set as a gift? For now, this flair pens are popular gifts for kids or adult who like to express imagination. If you are not 100% satisfied with our product, please do not hesitate to contact us for any question, We’ll solve it for you within 12 hours",
        image: "https://m.media-amazon.com/images/I/71ANsE6kHcL._AC_SX679_.jpg" ,
        brand:"AECHY",
        categoryNumber: 2,      
        subcategoryNumber: 23,      
        stock: 100,        
        price: 17.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Aechy Colored Pens' to products collection");
      });

      new Product({
        name: "Pillows Queen Size 2 Pack for Sleeping, Soft and Supportive Bed Pillow for Side and Back Sleeper, Down Alternative Hotel Collection Pillows-20 x30",
        description: "QUEEN PILLOWS 2 PACK -- Each order will include two Hotel Quality Bed Pillows that are finished with well stitching and reinforced seams. An ideal choice for side, stomach and back sleepers as these pillows have a high loft and offer maximum comfort for any sleeping position."
        +"/nSOFT & SUPPORTIVE PILLOWS -- Since our down alternative pillows are made with a great balance of softness and plump firmness, so whether you prefer soft or firm pillows, these pillows are perfect for you!"
        +"/nBREATHABLE & MACHINE WASHABLE PILLOWS --Filled with 100% micro polyester fiber which makes the pillows fluffy and cozy. Quality shell ensure the pillow breathable and skin friendly. Machine washable capabilities enable Maintenance of its reusability and fresh appearance. Air dry or tumble dry after washing."
        +"/nGREAT RESILIENCE -- Quickly return to its original size of 20x30 inches after releasing from the vacuum sealed package, fluff the pillow regularly to retain its shape after long use. Pls allow 24 hours for them to fluff up completely."
        +"/nRISK-FREE PURCHASE -- Buy with confidence! Your satisfaction is backed by our Risk-free 30 Days and 1 Year Warranty against any defects. Give it a chance, you will have a better life!",
        image: "https://m.media-amazon.com/images/I/81A5oDeRGOL._AC_SX679_.jpg" ,
        brand:"JOLLYVOGUE",
        categoryNumber: 3,      
        subcategoryNumber: 31,      
        stock: 100,        
        price: 40.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Pillows Queen Size 2 Pack' to products collection");
      });

      new Product({
        name: "Bedsure White Duvet Cover Queen Size Set - Ultra Soft Microfiber Bed Set, 3 Piece Breathable Queen Bedding Set with Zipper Closure, Corner Ties, 90x90 Inch",
        description: "Quality Material: Utilizing 110GSM polyester microfiber fabric, Bedsure’s duvet cover set offers longer durability and comfort all year round. The comforter cover set applies a pre-washed process that creates exceptional softness with an artful cotton touch to give you beauty sleep all night long."
        +"/nPerfect Home Decoration: Bedsure’s duvet cover set presents a vintage feeling and beautiful wrinkled texture for homeowners with sophisticated tastes. The solid hue of the bedding cover set adds an extra layer of style and versatility, making it easy to coordinate and integrate with your room’s décor."
        +"/nThoughtful Design: Corner ties inside the duvet cover make your quilt fit snugly and avoid fill bunching. Seal off your comforter quicker and easier than a regular button closure with zipper."
        +"/nEasy Care: This duvet cover set simply needs to be machine washed in cold water on a permanent cycle, and then tumble dry low. Close zipper completely when washing."
        +"/nWhat You Can Get: Available in Bedsure duvet cover set queen with zipper closure, 1 duvet cover 90' x 90', 2 pillow shams 20'x26'. Please note this is a duvet cover set that doesn't include an insert or fill.",
        image: "https://m.media-amazon.com/images/I/919jO9hGf6L._AC_SX679_.jpg" ,
        brand:"Bedsure",
        categoryNumber: 3,      
        subcategoryNumber: 32,      
        stock: 100,        
        price: 42.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Chezmoi Collection Upland 7-Piece Quilted Patchwork Comforter Set, Burgundy/Black/Brown, Queen",
        description: "Upland 7-Piece Comforter Set Includes: 1 Comforter, 2 Shams, 1 Bedskirt, 1 Cushion, 1 Neck Roll, 1 Breakfast Pillow"
        +"/nQueen Size Measurements: Comforter 90' x 92', Shams 20' x 26', Bedskirt 60' x 80' +14' drop, Square Cushion 18' x 18', Neck Roll 7' x 18', Breakfast Pillow 12' x 18'"
        +"/nA luxurious pin-sonic pressed medallion design quilted in a patchwork pattern with each fabric pieced together. The perfect unison of three tone colors to draw out the exhilarating bedroom experience."
        +"/nSoft, lightweight, and comfy fabric versatile for any bedroom décor. Suitable for year round use."
        +"/nEasy Care - Machine wash gentle cycle with cold water; (Sun dry or low tumble dry)",
        image: "https://m.media-amazon.com/images/I/81nxTD5MSUL._AC_SX679_.jpg" ,
        brand:"Chezmoi",
        categoryNumber: 3,      
        subcategoryNumber: 33,      
        stock: 100,        
        price: 132.17,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Chezmoi Collection' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Fade Resistant Bath, Hand and Washcloth Towel Set - Teal",
        description: "6-piece towel set includes (2) 54 x 30 inch bath towels, (2) 26 x 16 inch hand towels, and (2) 12 x 12 inch washcloths"
        +"/nMade of 100% cotton for softness and tear-resistant strength"
        +"/nLightweight towels quickly absorbs moisture"
        +"/nDesigned with a classic and simple pique border"
        +"/nFade-resistant teal color"
        +"/nMade in OEKO-TEX Standard 100 factory, an independent certification system that ensures textiles meet high safety and environmental standards.",
        image: "https://m.media-amazon.com/images/I/91b9p1-YdUL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber:4 ,      
        subcategoryNumber: 41,      
        stock: 100,        
        price: 31.41,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Amazon Basics 6-Piece Fade ' to products collection");
      });

      new Product({
        name: "Amazon Basics Non-Slip Microfiber Shag Bathroom Rug Mat, 21' x 34', Seafoam Green",
        description: "Microfiber shag bath rug in Seafoam Green provides a comfortably plush place to stand and helps keep floors dry"
        +"/nAbsorbent, plush tufts across the entire surface soak up water fast; dries quickly for supreme comfort from one use to the next"
        +"/nNon-slip backing keeps the rug securely in place, even when wet, for added safety"
        +"/nMade of 85% polyester and 15% polyamide; imported; machine washable for easy home care"
        +"/nMeasures 21 by 34 inches; backed by an AmazonBasics limited one-year warranty",
        image: "https://m.media-amazon.com/images/I/91ppCguT44L._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 4,      
        subcategoryNumber: 42,      
        stock: 100,        
        price: 26.51,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Shark Rocket Ultra-Light Upright Vacuum Cleaner, Blue (HV300C) - Canadian Version",
        description: "Ultra lightweight: At under 9 pounds, it converts to a handheld vacuum for complete floor to ceiling cleaning"
        +"/nFingertip controls: Easily switch from hard floor to carpet, amps: 4.2"
        +"/nDual storage options: Fix the hand vac to the bottom of the wand or secure it to the wall mount"
        +"/nSwivel steering: Excellent control for maneuvering around furniture",
        image: "https://m.media-amazon.com/images/I/61UI6DIjH6L._AC_SX679_.jpg" ,
        brand:"Shark",
        categoryNumber: 5,      
        subcategoryNumber: 51,      
        stock: 100,        
        price: 149.98,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "7 Pcs Universal Vacuum Attachments Accessories Cleaning Kit Brush Nozzle Crevice Tool Dust Cleaner for 32mm and 35mm Standard Hose",
        description: "MULTIFUNCTION This Vacuum Attachment Can be used everywhere Get rid of all the dust Which you cant clean clearly with normal tools before, Such as your draw, corners, Keyboards, even your pets"
        +"/n100% EASY TO USE Just connect this dust brush cleaner to your vacuum and you can clean as seen as on TV, flexible tubes, strong suction and long size all of this can impress you deeply. The handle grip is very comfortable to use and the user can easily remove the dust in the house."
        +"/nUNIVERSAL VACUUM ATTACHMENT This universal vacuum dust attachment with the adapter is suitable for MOST (NOT ALL) types of vacuum cleaners with 32/35mm (1.3 inches) inner diameter hose, such as Dyson vacuum cleaner-DC35,DC45,DC58,DC59,DC62,V6,Hand Vacuum cleaner,Fan vac cleaner, Car vent cleaner,Vent Vac cleaner, Mini Vac Cleaner.THIS PRODUCT IS NOT DESIGNED FOR HOOVER AND SHARK VACUUM CLEANER."
        +"/nINNOVATIVE DESIGN Made with 36 flexible micro-size suction tubes.They are flexible somewhere you cant clean clearly with normal tools, but not with this one, you can use it to clean your draw, corners, even your pets.Can be used everywhere."
        +"/nSAVE TIME AND ENERGY It is the best cleaning tool ever,The advantages of design is you need not to move objects anymore, flexible tubes can fix all. Long and flexible tubes have access to any deep corners, no longer need to do more job.",
        image: "https://m.media-amazon.com/images/I/61oJAOwFytL._AC_SX679_.jpg" ,
        brand:"GUOLANSAALINAA",
        categoryNumber: 5,      
        subcategoryNumber: 52,      
        stock: 100,        
        price: 21.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Vileda EasyWring Microfibre Spin Mop & Bucket Floor Cleaning System",
        description: "Exclusive bucket design has built-in wringer that allows for hands-free wringing"
        +"/nDeep-cleaning microfibre removes and absorbs tough dirt and grime"
        +"/nHigh-quality foot pedal designed to activate spin wringing, allowing the level of moisture to be controlled"
        +"/nFeatures Splash Guard to keep splash and spray inside bucket when wringing"
        +"/nCompatible with the EasyWring Mop Refill available at amazon.ca",
        image: "https://m.media-amazon.com/images/I/61Zk4yPT+dL._AC_SX679_.jpg" ,
        brand:"Vileda",
        categoryNumber: 5,      
        subcategoryNumber: 53,      
        stock: 100,        
        price: 37.00,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Dupray Neat Steam Cleaner Powerful Multipurpose Portable Heavy Duty Steamer for Floors, Cars, Tiles, Grout Cleaning. Chemical Free, Disinfection, for Home Use and More. Kills 99.99%* of Bacteria and Viruses.",
        description: "STEAM CLEAN. DEGREASE. DEODORIZE. ANY SURFACE. BETTER."
        +"/nPOWERFUL STEAM CLEANER: up to 275 Degree F/135 Degree Celsius. Best multi purpose steamer for home, cars and more."
        +"/nHEAVY-DUTY & LARGE CAPACITY: Up to 50 minutes of cleaning time per fill up."
        +"/nPERFECT FOR FLOOR CLEANING: use any regular towel or cloth, no need for expensive special pads!"
        +"/n2-year Limited Warranty / Lifetime Warranty on steam cleaner boiler.",
        image: "https://m.media-amazon.com/images/I/71CD3C7yfJL._AC_SX679_.jpg" ,
        brand:"Dupray",
        categoryNumber: 5,      
        subcategoryNumber: 54,      
        stock: 100,        
        price: 199.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Dupray Neat Steam clearner' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Nonstick Oven Bakeware Baking Set",
        description: "6-piece bakeware set includes a 9x5-inch loaf pan, 2 round 9-inch cake pans, a 12-cup muffin pan, a 13x9-inch roast pan, and a 13x9-inch baking sheet"
        +"/nMade of heavy-weight steel for thorough, even heating"
        +"/nNonstick coating for effortless food release and easy cleaning"
        +"/nOven-safe to 500 degrees F"
        +"/nHand-wash only recommended",
        image: "https://m.media-amazon.com/images/I/91hBA6hLfuL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 6,      
        subcategoryNumber: 61,      
        stock: 100,        
        price: 32.86,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'mazon Basics 6-Piece ' to products collection");
      });   

    new Product({
        name: "Molblly Queen Bed Frame Premium Upholstered Platform Beds with Strong Wood Slat Support and No Box Spring Needed,Easy Assembly/Queen Size Bed Blue(60”*80”",
        description: "👍[Premium Materials] The platform bed frame profileis and foot made of high hardness metal.The soft-packed part of bed frames’ padded are made of high-quality linen fabric wrapped. It can reduce noise and give you a quiet and comfortable resting environment."
        +"/n🏆[Unique Design] The cushions are more comfortable and softer than other bed headboard cushions.The cushions can be adjusted to different heights to meet various needs and also be disassembled and cleaned."
        +"/n👉[Durable Construction] The bed slats are made of strong hardwood slats are spaced 3.2-3.7 inches and nine leg support for durabilityapart to support the life of the mattress and ensure durability and support.The 45-degree curved ribbed bed board uses the principle of mechanical dispersion, and each bed board is evenly stressed."
        +"/n🔔[Strong Bearing] Twin size supports a maximum weight capacity of 280kgs, while all other sizes can support up to 480kgs"
        +"/n🔑{Easily Assembled} Tools and instructions book of this bed frame are packed in a box.Installation video is attached for reference.If you need our help, please feel free to contact us (24/7)",
        image: "https://m.media-amazon.com/images/I/81jy-TLZSDL._AC_SX679_.jpg" ,
        brand:"Molblly",
        categoryNumber: 1,      
        subcategoryNumber: 11,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Molblly Queen Bed' to products collection");
      });

      new Product({
        name: "FDW Dining Table Set Dining Table Dining Room Table Set for Small Spaces Kitchen Table and Chairs for 4 Table with Chairs Home Furniture Rectangular Modern，Black",
        description: 
        "【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table "
        +"/n【Easy to Assemble 】Exquisite hardware and detailed manual are included of the dining table. All parts of the dining room table set are listed and numbered and specific assembly steps are also shown in the instruction of the Dining Table Set.dining table Dining Table Set dining room table dining room table set Table Set"
        +"/n【Comfortable and Elegant】 This dining chairs are Personality, mid-century modern sensibility dining chairs,Such a dining cahirs with ergonomically designed.Kitchen Chairs Chair for Kitchen side chairs dining dining chairs Dining Room Chairs"
        +"/n【Easy to clean】The improved of the thickness of the glass of the dining table to make the Dining Table Set more resistant to daily use scratches.Easy to clean of the dining room table set.Dining Table Set dining room table dining room table set Table Set dining table"
        +"/n【Easy To Storage and Keep Tidy】Dining chairs of dining table set can be moved under the dining table when you finish your meal, which our kitchen table setlargely helps you save room space. Featuring smooth surface, our table and chairs set is easy to be kept clean.table and chairs set kitchen table and chairs for 4 dining table set",
        image: "https://m.media-amazon.com/images/I/61rn01u4KDL._AC_SX679_.jpg" ,
        brand:"FDW",
        categoryNumber: 1,      
        subcategoryNumber:12 ,      
        stock: 100,        
        price: 289.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'dinging table' to products collection");
      });

      new Product({
        name: "Ergonomic Office Chair - KERDOM Comfortable Computer Chair with Adjustable Headrest and Armrests, High Back Mesh Gaming Chair Executive Swivel Chair(Black S)",
        description: "[Comfortable Backrest Design]- Y shaped backrest supports design, fits the spine line, fully supports your back, and helps release the pressure on the spine and shoulders. The back tilts 90 to 135 degrees,Three level locking. allowing you to rest after a long time working. Our brand has always been committed to bringing customers a comfortable office experience."
        +"/n[Breathable and Comfortable Office Chair]-An ergonomic office chair with a mesh backrest and seat to maintain air circulation and avoid sweating and adhesion. The high-density native sponge cushion is soft and breathable. Keep you away from the pain of sedentary sitting."
        +"/n[Premium Silent Universal Wheels]--The 350 pound office chair uses universals wheels, which are silent and smooth, and can be easily moved on the floor or carpet ,and they won’t damage your floor either. which can enhance your sitting experience."
        +"/n[Adjustable 3D Armrests and Headrests]-Multi-purpose armrests can be adjusted up and down, front and back, providing more convenience for your work. Freely adjust the height and angle of the headrest to reduce daily neck and shoulder pain. The computer office chair has many functions that can adapt to your body and work needs."
        +"/n[Easy Installation & Warranty]-All home office chairs are provided with 1-year warranty, English instructions and 1 set simple tools, you can easily complete it in about 15 minutes on this basis. If you have any questions, please feel free to email us, we will give you a satisfactory solution ASAP.",
        image: "https://images-na.ssl-images-amazon.com/images/I/71PPeDWgBbL.__AC_SX300_SY300_QL70_ML2_.jpg" ,
        brand:"Ergonomic",
        categoryNumber:1,      
        subcategoryNumber:13 ,      
        stock: 100,        
        price: 254.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Ergonomic Office Chair ' to products collection");
      });

      new Product({
        name: "Sodagreen Galaxy Purple Washi Tape - Gold Foil Washi Masking Tape with Constalation, Blue Sky, Moon, Star, Celestial, Perfect for Bullet Journal, DIY Crafts (Purple Galaxy)",
        description: "💙PURPLE GALAXY WASHI TAPE : 12 rolls gold foil washi tape, width 15mm,length 2m . New design with constalation, blue sky, moon, star, celestial. This purple washi tape adds color and vitality to things that are pasted, making daily life more interesting."
        +"/n💙HIGH-QUALITY : Made of high-quality Japanese paper material, the surface is pastel and the color is durable. The material is environmentally friendly and has no odor. Our constalation washi tape can stick to most clean surfaces, also remove easily without any sticky residue."
        +"/n💙VIBRANT DESIGN: This blue sky washi tape is designed by professional Japanese designers. Various patterns can provide more choices for your use. Vibrant design gives you creativity. Your friends will be surprised by the creative gifts and decorations you make using this galaxy washi masking tape."
        +"/n💙WIDE RANGE OF USES: This star washi tape can be used to decorate anything you want, such as card/gift wrapping, scrapbooks, bullet journal,kids' art projects, mobile phone cases, photo frames, walls, etc. People of different ages will find happiness in these celestial washi tape. Please don't wait, add it to the shopping cart now and get creative."
        +"/n💙SERVICE GUARANTEE: Your satisfaction is our top priority. If you are not satisfied for any reason, you can return the item for a full refund, please rest assured to buy. If you have any questions, please contact customer service Toby or Lucy, we will provide you with a satisfactory solution.",
        image: "https://m.media-amazon.com/images/I/71uOcTW92uL._SX522_.jpg" ,
        brand:"Sodagreen",
        categoryNumber: 2,      
        subcategoryNumber: 21,      
        stock: 100,        
        price: 12.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Sodagreen Galaxy Purple Washi Tape' to products collection");
      });

      new Product({
        name: "100 Colors Alcohol Markers Dual Tips Permanent Art Markers Pen for Kids & Adult, Alcohol-Based Highlighter Pen Sketch Markers for Painting, Coloring, Sketching and Drawing.（BLACK)",
        description: "Art set 100 Vibrant Colors Alcohol Markers Plus 1 Blender Permanent Marker with 2 bases: Professional superior artist quality double-ended permanent art markers. Includes Fine tip 1mm and Broad tip 6mm all the primary and secondary color shade tones artists need for adult coloring,drawing,writing,sketching,illustrating,shading,designing,rendering,anime,adult coloring books, calligraphy,card making,stamping and more.Perfect for use on paper,ceramics,glass and more."
        +"/nFast Drying & High Quality,Find Colors Fast Art Marker Pens blend and layer well without leaving streaks behind and dry quickly.Our super quality permanent ink provides a rich color saturation and allows the colors to be laid down clean, smooth and evenly. Perfect color match every time you use them because the tips share a single ink reservoir.Color-coded caps keep tips from drying out and help you find any marker in a flash.These paint markers are built to last and wont easily fade."
        +"/nDual Tips Twin :Dual Tips Markers Design allows you to make thick and thin lines without changing alcohol markers.Includes Fine tip 1mm and Broad tip 6mm twin tips for precise highlighting, sketching and underlining. Thin markers can be used to write and hook line while thick art markers professional are suitable for drawing and coloring."
        +"/nPortable storage bag and new plastic pen holder:Art supplies comes with a durable zipper carry bag for storing,We use 1680D thick Oxford cloth bag, which is different from ordinary cloth bag and Using a new plastic penholder, we promise to never use recycled plastic,the pen holder is stronger and not easy to break during transportation.Make alcohol markers set very easy and convenient to portable carry around anywhere for travel or outdoor work.permanent marker,copic markers"
        +"/nMore than 100% Satisfaction Guarantee: we promise provide more than 100% Satisfaction Guarantee to customers.If you have any quality problems, please feel free to contact us.Simply request a refund or a replacement,After-sales issues resolved within 24 hours.(Note: To prevent the marker from drying and ink leaking, please recap and keep the marker laid flat after use.)",
        image: "https://m.media-amazon.com/images/I/71lOpUCFj3L._AC_SX679_.jpg" ,
        brand:"belleza suprema",
        categoryNumber: 2,      
        subcategoryNumber:22 ,      
        stock: 100,        
        price: 33.71,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '100 Colors Alcohol Markers ' to products collection");
      });

      new Product({
        name: "Aechy Colored Pens for Note Taking, Dual Tip Markers with 5 Different Curve Shapes & 8 Colors Fine Lines, Cool Pens for Adult Teenage Kids Coloring Books Writing Journaling Drawing Scrapbook Art Office(Rainbow)",
        description: "【Dual Tip Markers for Writing】 8 vivid and classic colors are divided to 5 unique mark line types, equipped with roller pen point, allow you to create colorful lines like any before. We believe Aechy colored pens will meet most your need for writing & marking"
        +"/n【Durable Quality】 Each cools pens features soft grip and 0.4mm durable tip. Premium material makes our pens glide smoothly than others. You will like the way you can mark and draw precisely in the tiny details of your notes and journals"
        +"/n【Long Lasting】 Upgraded journaling pens come with 40% more ink, can produce longer mark lines than before. These fine tip markers are easy to hold and comfortable, perfect as crafting, doodling, art designs, writing, drawing, scrapbooking, and journaling supplies"
        +"/n【Safe & High Performance】 Acid-free and non-toxic ink doesn’t smear, fade, or skip. Safe to give this journal pen to kids and girls. This fine point pen set allow all family enjoy smooth application for card making, arts crafts, coloring books, school project, DIY letters and more"
        +"/n【Gift Choice】 Why Not Consider giving this fun pen set as a gift? For now, this flair pens are popular gifts for kids or adult who like to express imagination. If you are not 100% satisfied with our product, please do not hesitate to contact us for any question, We’ll solve it for you within 12 hours",
        image: "https://m.media-amazon.com/images/I/71ANsE6kHcL._AC_SX679_.jpg" ,
        brand:"AECHY",
        categoryNumber: 2,      
        subcategoryNumber: 23,      
        stock: 100,        
        price: 17.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Aechy Colored Pens' to products collection");
      });

      new Product({
        name: "Pillows Queen Size 2 Pack for Sleeping, Soft and Supportive Bed Pillow for Side and Back Sleeper, Down Alternative Hotel Collection Pillows-20 x30",
        description: "QUEEN PILLOWS 2 PACK -- Each order will include two Hotel Quality Bed Pillows that are finished with well stitching and reinforced seams. An ideal choice for side, stomach and back sleepers as these pillows have a high loft and offer maximum comfort for any sleeping position."
        +"/nSOFT & SUPPORTIVE PILLOWS -- Since our down alternative pillows are made with a great balance of softness and plump firmness, so whether you prefer soft or firm pillows, these pillows are perfect for you!"
        +"/nBREATHABLE & MACHINE WASHABLE PILLOWS --Filled with 100% micro polyester fiber which makes the pillows fluffy and cozy. Quality shell ensure the pillow breathable and skin friendly. Machine washable capabilities enable Maintenance of its reusability and fresh appearance. Air dry or tumble dry after washing."
        +"/nGREAT RESILIENCE -- Quickly return to its original size of 20x30 inches after releasing from the vacuum sealed package, fluff the pillow regularly to retain its shape after long use. Pls allow 24 hours for them to fluff up completely."
        +"/nRISK-FREE PURCHASE -- Buy with confidence! Your satisfaction is backed by our Risk-free 30 Days and 1 Year Warranty against any defects. Give it a chance, you will have a better life!",
        image: "https://m.media-amazon.com/images/I/81A5oDeRGOL._AC_SX679_.jpg" ,
        brand:"JOLLYVOGUE",
        categoryNumber: 3,      
        subcategoryNumber: 31,      
        stock: 100,        
        price: 40.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Pillows Queen Size 2 Pack' to products collection");
      });

      new Product({
        name: "Bedsure White Duvet Cover Queen Size Set - Ultra Soft Microfiber Bed Set, 3 Piece Breathable Queen Bedding Set with Zipper Closure, Corner Ties, 90x90 Inch",
        description: "Quality Material: Utilizing 110GSM polyester microfiber fabric, Bedsure’s duvet cover set offers longer durability and comfort all year round. The comforter cover set applies a pre-washed process that creates exceptional softness with an artful cotton touch to give you beauty sleep all night long."
        +"/nPerfect Home Decoration: Bedsure’s duvet cover set presents a vintage feeling and beautiful wrinkled texture for homeowners with sophisticated tastes. The solid hue of the bedding cover set adds an extra layer of style and versatility, making it easy to coordinate and integrate with your room’s décor."
        +"/nThoughtful Design: Corner ties inside the duvet cover make your quilt fit snugly and avoid fill bunching. Seal off your comforter quicker and easier than a regular button closure with zipper."
        +"/nEasy Care: This duvet cover set simply needs to be machine washed in cold water on a permanent cycle, and then tumble dry low. Close zipper completely when washing."
        +"/nWhat You Can Get: Available in Bedsure duvet cover set queen with zipper closure, 1 duvet cover 90' x 90', 2 pillow shams 20'x26'. Please note this is a duvet cover set that doesn't include an insert or fill.",
        image: "https://m.media-amazon.com/images/I/919jO9hGf6L._AC_SX679_.jpg" ,
        brand:"Bedsure",
        categoryNumber: 3,      
        subcategoryNumber: 32,      
        stock: 100,        
        price: 42.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Chezmoi Collection Upland 7-Piece Quilted Patchwork Comforter Set, Burgundy/Black/Brown, Queen",
        description: "Upland 7-Piece Comforter Set Includes: 1 Comforter, 2 Shams, 1 Bedskirt, 1 Cushion, 1 Neck Roll, 1 Breakfast Pillow"
        +"/nQueen Size Measurements: Comforter 90' x 92', Shams 20' x 26', Bedskirt 60' x 80' +14' drop, Square Cushion 18' x 18', Neck Roll 7' x 18', Breakfast Pillow 12' x 18'"
        +"/nA luxurious pin-sonic pressed medallion design quilted in a patchwork pattern with each fabric pieced together. The perfect unison of three tone colors to draw out the exhilarating bedroom experience."
        +"/nSoft, lightweight, and comfy fabric versatile for any bedroom décor. Suitable for year round use."
        +"/nEasy Care - Machine wash gentle cycle with cold water; (Sun dry or low tumble dry)",
        image: "https://m.media-amazon.com/images/I/81nxTD5MSUL._AC_SX679_.jpg" ,
        brand:"Chezmoi",
        categoryNumber: 3,      
        subcategoryNumber: 33,      
        stock: 100,        
        price: 132.17,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Chezmoi Collection' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Fade Resistant Bath, Hand and Washcloth Towel Set - Teal",
        description: "6-piece towel set includes (2) 54 x 30 inch bath towels, (2) 26 x 16 inch hand towels, and (2) 12 x 12 inch washcloths"
        +"/nMade of 100% cotton for softness and tear-resistant strength"
        +"/nLightweight towels quickly absorbs moisture"
        +"/nDesigned with a classic and simple pique border"
        +"/nFade-resistant teal color"
        +"/nMade in OEKO-TEX Standard 100 factory, an independent certification system that ensures textiles meet high safety and environmental standards.",
        image: "https://m.media-amazon.com/images/I/91b9p1-YdUL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber:4 ,      
        subcategoryNumber: 41,      
        stock: 100,        
        price: 31.41,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Amazon Basics 6-Piece Fade ' to products collection");
      });

      new Product({
        name: "Amazon Basics Non-Slip Microfiber Shag Bathroom Rug Mat, 21' x 34', Seafoam Green",
        description: "Microfiber shag bath rug in Seafoam Green provides a comfortably plush place to stand and helps keep floors dry"
        +"/nAbsorbent, plush tufts across the entire surface soak up water fast; dries quickly for supreme comfort from one use to the next"
        +"/nNon-slip backing keeps the rug securely in place, even when wet, for added safety"
        +"/nMade of 85% polyester and 15% polyamide; imported; machine washable for easy home care"
        +"/nMeasures 21 by 34 inches; backed by an AmazonBasics limited one-year warranty",
        image: "https://m.media-amazon.com/images/I/91ppCguT44L._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 4,      
        subcategoryNumber: 42,      
        stock: 100,        
        price: 26.51,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Shark Rocket Ultra-Light Upright Vacuum Cleaner, Blue (HV300C) - Canadian Version",
        description: "Ultra lightweight: At under 9 pounds, it converts to a handheld vacuum for complete floor to ceiling cleaning"
        +"/nFingertip controls: Easily switch from hard floor to carpet, amps: 4.2"
        +"/nDual storage options: Fix the hand vac to the bottom of the wand or secure it to the wall mount"
        +"/nSwivel steering: Excellent control for maneuvering around furniture",
        image: "https://m.media-amazon.com/images/I/61UI6DIjH6L._AC_SX679_.jpg" ,
        brand:"Shark",
        categoryNumber: 5,      
        subcategoryNumber: 51,      
        stock: 100,        
        price: 149.98,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "7 Pcs Universal Vacuum Attachments Accessories Cleaning Kit Brush Nozzle Crevice Tool Dust Cleaner for 32mm and 35mm Standard Hose",
        description: "MULTIFUNCTION This Vacuum Attachment Can be used everywhere Get rid of all the dust Which you cant clean clearly with normal tools before, Such as your draw, corners, Keyboards, even your pets"
        +"/n100% EASY TO USE Just connect this dust brush cleaner to your vacuum and you can clean as seen as on TV, flexible tubes, strong suction and long size all of this can impress you deeply. The handle grip is very comfortable to use and the user can easily remove the dust in the house."
        +"/nUNIVERSAL VACUUM ATTACHMENT This universal vacuum dust attachment with the adapter is suitable for MOST (NOT ALL) types of vacuum cleaners with 32/35mm (1.3 inches) inner diameter hose, such as Dyson vacuum cleaner-DC35,DC45,DC58,DC59,DC62,V6,Hand Vacuum cleaner,Fan vac cleaner, Car vent cleaner,Vent Vac cleaner, Mini Vac Cleaner.THIS PRODUCT IS NOT DESIGNED FOR HOOVER AND SHARK VACUUM CLEANER."
        +"/nINNOVATIVE DESIGN Made with 36 flexible micro-size suction tubes.They are flexible somewhere you cant clean clearly with normal tools, but not with this one, you can use it to clean your draw, corners, even your pets.Can be used everywhere."
        +"/nSAVE TIME AND ENERGY It is the best cleaning tool ever,The advantages of design is you need not to move objects anymore, flexible tubes can fix all. Long and flexible tubes have access to any deep corners, no longer need to do more job.",
        image: "https://m.media-amazon.com/images/I/61oJAOwFytL._AC_SX679_.jpg" ,
        brand:"GUOLANSAALINAA",
        categoryNumber: 5,      
        subcategoryNumber: 52,      
        stock: 100,        
        price: 21.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Vileda EasyWring Microfibre Spin Mop & Bucket Floor Cleaning System",
        description: "Exclusive bucket design has built-in wringer that allows for hands-free wringing"
        +"/nDeep-cleaning microfibre removes and absorbs tough dirt and grime"
        +"/nHigh-quality foot pedal designed to activate spin wringing, allowing the level of moisture to be controlled"
        +"/nFeatures Splash Guard to keep splash and spray inside bucket when wringing"
        +"/nCompatible with the EasyWring Mop Refill available at amazon.ca",
        image: "https://m.media-amazon.com/images/I/61Zk4yPT+dL._AC_SX679_.jpg" ,
        brand:"Vileda",
        categoryNumber: 5,      
        subcategoryNumber: 53,      
        stock: 100,        
        price: 37.00,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added '' to products collection");
      });

      new Product({
        name: "Dupray Neat Steam Cleaner Powerful Multipurpose Portable Heavy Duty Steamer for Floors, Cars, Tiles, Grout Cleaning. Chemical Free, Disinfection, for Home Use and More. Kills 99.99%* of Bacteria and Viruses.",
        description: "STEAM CLEAN. DEGREASE. DEODORIZE. ANY SURFACE. BETTER."
        +"/nPOWERFUL STEAM CLEANER: up to 275 Degree F/135 Degree Celsius. Best multi purpose steamer for home, cars and more."
        +"/nHEAVY-DUTY & LARGE CAPACITY: Up to 50 minutes of cleaning time per fill up."
        +"/nPERFECT FOR FLOOR CLEANING: use any regular towel or cloth, no need for expensive special pads!"
        +"/n2-year Limited Warranty / Lifetime Warranty on steam cleaner boiler.",
        image: "https://m.media-amazon.com/images/I/71CD3C7yfJL._AC_SX679_.jpg" ,
        brand:"Dupray",
        categoryNumber: 5,      
        subcategoryNumber: 54,      
        stock: 100,        
        price: 199.99,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'Dupray Neat Steam clearner' to products collection");
      });

      new Product({
        name: "Amazon Basics 6-Piece Nonstick Oven Bakeware Baking Set",
        description: "6-piece bakeware set includes a 9x5-inch loaf pan, 2 round 9-inch cake pans, a 12-cup muffin pan, a 13x9-inch roast pan, and a 13x9-inch baking sheet"
        +"/nMade of heavy-weight steel for thorough, even heating"
        +"/nNonstick coating for effortless food release and easy cleaning"
        +"/nOven-safe to 500 degrees F"
        +"/nHand-wash only recommended",
        image: "https://m.media-amazon.com/images/I/91hBA6hLfuL._AC_SX679_.jpg" ,
        brand:"Amazon Basics",
        categoryNumber: 6,      
        subcategoryNumber: 61,      
        stock: 100,        
        price: 32.86,       
        isActive: true          
      }).save(err => {
        if (err) {
          console.log("add product error", err);
        }
        console.log("added 'mazon Basics 6-Piece ' to products collection");
      });   



    }
  });

}
