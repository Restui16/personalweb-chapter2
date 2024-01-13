const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs"); // set view engine hbs

app.set("views", "src/views"); // set path views to src/views

app.use("/assets", express.static("src/assets"));

app.get("/", home);

app.get("/contact", contact);

app.get("/my-project", myProject);

app.get("/testimonial", testimonial);

app.get("/my-project-detail/:title", myProjectDetail);

function home(req, res) {
  res.render("index");
}

function contact(req, res) {
  res.render("contact");
}

function myProject(req, res) {
  const data = [
    {
      id: 1,
      title: "App Management Asset",
      startDate: new Date(2023 - 10 - 2),
      endDate: new Date(2023 - 12 - 10),
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam et laborum rem deserunt distinctio neque tempore qui impedit veritatis aliquam suscipit Lorem ipsum dolor sit amet consectetur....",
      nodejs: `fa-brands fa-node-js`,
      laravel: `fa-brands fa-laravel`,
      python: `fa-brands fa-python`,
      reactjs: `fa-brands fa-react`,
      image:
        "https://images.unsplash.com/photo-1682687982046-e5e46906bc6e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Point Of Sale",
      startDate: new Date(2023 - 11 - 1),
      endDate: new Date(2024 - 1 - 20),
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam et laborum rem deserunt distinctio neque tempore qui impedit veritatis aliquam suscipit Lorem ipsum dolor sit amet consectetur....",
      nodejs: `fa-brands fa-node-js`,
      laravel: `fa-brands fa-laravel`,
      python: `fa-brands fa-python`,
      reactjs: `fa-brands fa-react`,
      image:
        "https://images.unsplash.com/photo-1682687982046-e5e46906bc6e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Personal Web",
      startDate: new Date(2023 - 12 - 1),
      endDate: new Date(2024 - 1 - 30),
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam et laborum rem deserunt distinctio neque tempore qui impedit veritatis aliquam suscipit Lorem ipsum dolor sit amet consectetur....",
      nodejs: `fa-brands fa-node-js`,
      laravel: `fa-brands fa-laravel`,
      python: `fa-brands fa-python`,
      reactjs: `fa-brands fa-react`,
      image:
        "https://images.unsplash.com/photo-1682687982046-e5e46906bc6e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  res.render("myProject", { data });
}

function testimonial(req, res) {
  res.render("testimonial");
}

function myProjectDetail(req, res) {
    let item = req.params;
    console.log(item);
  const { title } = req.params;

  res.render("myProject-detail", { title });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
