import express from 'express';
import handlebars  from 'hbs';
const app = express();
const port = 3000;

app.set("view engine", "hbs"); // set view engine hbs

app.set("views", "src/views"); // set path views to src/views

app.use(express.urlencoded({ extended: false}));

app.use("/assets", express.static("src/assets"));

app.get("/", home);

app.get("/contact", contact);

app.get("/add-project", addProject);

app.post("/add-project", storeProject)

app.get("/project/detail/:id", ProjectDetail);

app.get("/project/delete/:id", deleteProject);

app.get("/project/edit/:id", editProject)

app.post("/project/update/:id", updateProject);

app.get("/testimonial", testimonial);



const data = [];

function durationMonth(startDate, endDate) {
  const getObjStartDate = new Date(startDate);
  const getObjEndDate = new Date(endDate);
  return (
    (getObjEndDate.getFullYear() - getObjStartDate.getFullYear()) * 12 +
    (getObjEndDate.getMonth() - getObjStartDate.getMonth())
  );
}

function formatDate(dates) {
  //date formater d/mm/yyyy
  const objDates = new Date(dates);
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

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return `${date} ${months[month]} ${year}`;
}


function home(req, res) {

  res.render("index", {data});
}

function contact(req, res) {
  res.render("contact");
}

function addProject(req, res) {
  res.render("create-project");
}

function storeProject(req, res) {
  const { projectName, startDate, endDate, description, tech } = req.body;
  
  const technologiesObj = {};
  tech.forEach((technology) => {
    technologiesObj[technology] = true;
  });

  const projectData = {
    projectName,
    startDate,
    endDate,
    duration: durationMonth(startDate, endDate),
    description,
    tech: technologiesObj,
  };

  data.push(projectData);

  res.redirect("/");
}

function ProjectDetail(req, res) {
  const { id } = req.params;

  const projectDetail = data[id];
  const getStartDate = formatDate(data[id].startDate);
  const getEndDate = formatDate(data[id].endDate);
  
  res.render("show-project", { data: projectDetail, getStartDate, getEndDate });
}

function deleteProject (req, res) {
  const { id } = req.params

  data.splice(id, 1)

  res.redirect("/")
}

function editProject(req, res) {
  const { id } = req.params
  
  const projectDetail = data[id];
  res.render("edit-project", {data: projectDetail, index: id})
}

function updateProject(req, res) {
  const { id } = req.params;
  
  const { projectName, startDate, endDate, description } = req.body;
  const updateData = {
    projectName,
    startDate,
    endDate,
    duration: durationMonth(startDate, endDate),
    description,
    tech : {
      node: req.body.tech && req.body.tech.includes('node'),
      laravel: req.body.tech && req.body.tech.includes('laravel'),
      python: req.body.tech && req.body.tech.includes('python'),
      react: req.body.tech && req.body.tech.includes('react'),
    }
  }

  // function durationMonth(startDate, endDate) {
  //   return (
  //     (endDate.getFullYear() - startDate.getFullYear()) * 12 +
  //     (endDate.getMonth() - startDate.getMonth())
  //   );
  // }
  
  data.splice(id, 1, updateData)

  res.redirect("/");
}

function testimonial(req, res) {
  res.render("testimonial");
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
