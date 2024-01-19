const express = require("express");
const hbs = require("hbs");
const { development } = require("./src/config/config.json");
const { Sequelize, QueryTypes, ARRAY } = require("sequelize");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
const port = 3000;


app.set("view engine", "hbs"); // set view engine hbs
app.set("views", "src/views"); // set path views to src/views
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static("src/assets"));
app.use(session({
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 2 * 60 * 60 * 1000,
  },
  resave: false,
  store: session.MemoryStore(),
  secret: 'session_storage',
  saveUninitialized: true
}))

app.get("/", home);
app.get("/contact", contact);
app.get("/add-project", addProject);
app.post("/add-project", storeProject);
app.get("/project/detail/:id", projectDetail);
app.get("/project/delete/:id", deleteProject);
app.get("/project/edit/:id", editProject);
app.post("/project/update/:id", updateProject);
app.get("/login", formLogin);
app.post("/login", handleLogin);
app.get("/register", formRegister);
app.post("/register", handleRegister);
app.get("/logout", logout);
app.get("/testimonial", testimonial);



const SequelizePool = new Sequelize(development);
let models = require("./src/models");
const project = require("./src/models/project");
const { types } = require("pg");

async function connectToDatabase() {
  try {
    await SequelizePool.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// connectToDatabase();

app.set("view engine", "hbs"); // set view engine hbs

app.set("views", "src/views"); // set path views to src/views

app.use(express.urlencoded({ extended: false }));

app.use("/assets", express.static("src/assets"));

app.get("/", home);

app.get("/contact", contact);

app.get("/add-project", addProject);

app.post("/add-project", storeProject);

app.get("/project/detail/:id", projectDetail);

app.get("/project/delete/:id", deleteProject);

app.get("/project/edit/:id", editProject);

app.post("/project/update/:id", updateProject);

app.get("/testimonial", testimonial);

const data = ['test'];
connectToDatabase();

hbs.registerHelper('arrayContains', function (array, value) {
  return array.includes(value);
});

function calculateDuration(startDate, endDate) {

  let getObjStartDate;
  let getObjEndDate;

  if(startDate instanceof Date && endDate instanceof Date){
    getObjStartDate = startDate;
    getObjEndDate = endDate;
  } else {
    getObjStartDate = new Date(startDate);
    getObjEndDate = new Date(endDate);
  }

  const totalMilliseconds = getObjEndDate - getObjStartDate;

  // Konversi ke hari, jam, menit, detik, dan milidetik
  const totalSeconds = totalMilliseconds / 1000;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;

  // Hitung jumlah tahun, bulan, dan sisa hari
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30); // perkiraan 30 hari per bulan
  const days = Math.floor(totalDays % 30);

  // Buat string durasi
  let durationString = '';
  if (years > 0) {
    durationString += years + ' Year ';
  }
  if (months > 0) {
    durationString += months + ' Month ';
  }
  if (days > 0) {
      durationString += days + ' Day';
  }

  return durationString.trim(); // Hilangkan spasi ekstra di akhir
}

function formatDate(dates) {
  //date formater d/mm/yyyy
  let objDates;
  if(dates instanceof Date){
     objDates = dates;
  } else {
     objDates = new Date(dates);
  }
  let minutes = objDates.getMinutes();
  let hours = objDates.getHours();
  const date = objDates.getDate();
  const month = objDates.getMonth();
  const year = objDates.getFullYear();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  return `${date} ${months[month]} ${year}`;
}

async function home(req, res) {
  try {
    const query = await SequelizePool.query("SELECT * FROM projects", {
      type: QueryTypes.SELECT,
    });
    // console.log(query);
    const projects = query.map((value) => ({
      ...value,
      duration_project: calculateDuration(value.start_date, value.end_date),
      subs_desc: value.description.substring(0,150)
    }));

    const title = "Personal Web"

    res.render("index", { 
      projects, 
      title, 
      isLogin: req.session.isLogin, 
      user: req.session.user 
    });

  } catch (error) {
    throw error;
  }

}

function contact(req, res) {
  const title = "Contact Me"
  res.render("contact", {
    title,
    isLogin: req.session.isLogin, 
    user: req.session.user 
  });
}

function addProject(req, res) {
  const title = "Add Project"
  res.render("create-project", {
    title,
    isLogin: req.session.isLogin, 
    user: req.session.user 
  });
}

async function storeProject(req, res) {
  try {
    const { projectName, startDate, endDate, description, tech } = req.body;
    await SequelizePool.query(`
      INSERT INTO projects(
        project_name, start_date, end_date, description, tech, "createdAt", "updatedAt"
      ) VALUES (
        '${projectName}', '${startDate}', '${endDate}', '${description}', ARRAY['${tech.join("','")}'::character varying], NOW(), NOW())`);

    res.redirect('/');
  } catch (error) {
    throw error;
  }
}

async function projectDetail(req, res) {
  const { id } = req.params
  try {
    const query = await SequelizePool.query(
      `SELECT * FROM projects WHERE id = ${id}`, { type: QueryTypes.SELECT });
    // console.log(query);
    
    const projectDetail = query.map(value => ({
      ...value,
      duration_project: calculateDuration(value.start_date, value.end_date),
      formatStartDate: formatDate(value.start_date),
      formatEndDate: formatDate(value.end_date)
    }))

    const [dataProject] = projectDetail
    
    const title = "Detail Project"
    res.render("show-project", { dataProject, title});
    res.render("show-project", { 
      dataProject, 
      title, 
      duration_project, 
      formatStartDate, 
      formatEndDate, 
      isLogin: req.session.isLogin, 
      user: req.session.user  
    });
  } catch (error) {
    throw error;
  }
}

async function deleteProject(req, res) {
  const { id } = req.params;
  try {
    await SequelizePool.query(`DELETE FROM projects WHERE id = ${id}`)
    res.redirect("/");

  } catch (error) {
    throw error
  }
}

async function editProject(req, res) {
  const { id } = req.params;
  try {
    const query = await SequelizePool.query(
      `SELECT * FROM projects WHERE id = ${id}`, { type: QueryTypes.SELECT });
    // console.log(query);
    
    const projectDetail = query.map(value => ({
      ...value,
      startDate: value.start_date.toISOString().split("T")[0],
      endDate: value.end_date.toISOString().split("T")[0],
    }))
    const [ dataProject ] = projectDetail
    
    const title = "Edit Project"
    res.render("edit-project", {dataProject, title})
    res.render("edit-project", { 
      dataProject, 
      title, 
      isLogin: req.session.isLogin, 
      user: req.session.user  
    });
  } catch (error) {
    throw error;
  }
}

async function updateProject(req, res) {
  const { id } = req.params;
  try {
    const { projectName, startDate, endDate, description, tech } = req.body;
    
    await SequelizePool.query(`UPDATE projects SET project_name='${projectName}', start_date='${startDate}', end_date='${endDate}', description='${description}', tech=ARRAY['${tech.join("','")}'::character varying], "updatedAt"=NOW()  WHERE id = ${id}`);

    res.redirect("/");
  } catch (error) {
    throw error
  }
}

function formLogin(req, res) {
  const title = "Log In"
  res.render("login", {
    title,
    isLogin: req.session.isLogin, 
    user: req.session.user 
  });
}

async function handleLogin(req, res) {
  try {
    const { email, password} = req.body;

    const checkEmail = await SequelizePool.query(`SELECT * FROM users where email = '${email}'`, {type: QueryTypes.SELECT})

    if(!checkEmail.length){
      return res.redirect('/login');
    }

    bcrypt.compare(password, checkEmail[0].password, function(err, result) {
      if(!result){
        return res.redirect('/login');
      } else {
        req.session.isLogin = true;
        req.session.user = checkEmail[0].name
        return res.redirect('/');
      }
    })



  } catch (error) {
    console.log(error);
  }
}

function formRegister(req, res) {
  const title = "Sign Up"
  res.render("register", {
    title,
    isLogin: req.session.isLogin, 
    user: req.session.user 
  });
}

async function handleRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    const salt = 10

    bcrypt.hash(password, salt, async (err, hashPassword)=> {
      await SequelizePool.query(`
      INSERT INTO users (name, email, password, "createdAt", "updatedAt")
      VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`)
    });
     
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

function logout(req, res) {
  if(req.session.isLogin) {
    req.session.isLogin = false;
    res.redirect("/");
  } else {
    res.redirect("/");
  }
}
function testimonial(req, res) {
  
  res.render("testimonial");
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});