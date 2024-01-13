const testimonials = [
  {
    name : "Restu",
    image: "https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww",
    message: "Keren sekali",
    rating: 3
  },
  {
    name : "Wibowo",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww",
    message: "Mantap sekali",
    rating: 4
  },
  {
    name : "Budi",
    image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    message: "Bagus sekali",
    rating: 5
  },
  {
    name : "Budi",
    image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    message: "Bagus sekali",
    rating: 5
  },
  {
    name : "Budi",
    image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    message: "Bagus sekali",
    rating: 5
  },
];


function allTestimonial(){
  const testimonialHTML = testimonials.map((value) => {
    return `
          <div class="card" style="width: 25%; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;" >
              <img src="${value.image}" style="width: 100%; height: 250px; object-fit: cover; " alt="" >
              <p>${value.message}</p>
              <q style="align-self: flex-end;">${value.name}</q>
          </div>`
  })
  
  document.getElementById("testimonial-container").innerHTML = testimonialHTML.join(" ");
}

function filterTestimonial(rating) {
  const filteredTestimonial = testimonials.filter((value) => value.rating === rating)

  const filteredTestimonialHtml = filteredTestimonial.map((value) => {
    return `<div class="card" style="width: 25%; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;" >
              <img src="${value.image}" style="width: 100%; height: 250px; object-fit: cover; " alt="" >
              <p>${value.message}</p>
              <q style="align-self: flex-end;">${value.name}</q>
          </div>`
  })

  
  document.getElementById("testimonial-container").innerHTML = filteredTestimonialHtml.join(" ");
}

allTestimonial();