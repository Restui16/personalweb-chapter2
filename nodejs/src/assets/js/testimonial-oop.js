class Testimonial {
  #name;
  #image;
  #message;

  constructor(name, image, message) {
    this.#name = name;
    this.#image = image;
    this.#message = message;
  }

  get name(){
    return this.#name
  }

  get image(){
    return this.#image
  }

  get message(){
    return this.#message
  }

  html() {
    throw new Error("choose author or comppany");
  }
}

class AuthorTestimonial extends Testimonial {
  html() {
    return `
        <div class="card" style="width: 25%; flex: 1; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;" >
            <img src="${this.image}" style="width: 100%; height: 250px; object-fit: cover; " alt="" >
            <p>${this.message}</p>
            <q style="align-self: flex-end;">${this.name}</q>
        </div>`;
  }
}

class CompanyTestimonial extends Testimonial {
  html() {
    return `
        <div class="card" style="width: 25%; flex:1; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;" >
            <img src="${this.image}" style="width: 100%; height: 250px; object-fit: cover;" alt="" >
            <p>${this.message}</p>
            <q style="align-self: flex-end;">${this.name} Company</q>
        </div>`;
  }
}

const testi1 = new AuthorTestimonial(
  "Restu",
  "https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww",
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore vero suscipit, cupiditate illum ipsum provident"
);
const testi2 = new CompanyTestimonial(
  "Restu",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww",
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore vero suscipit, cupiditate illum ipsum provident"
);
const testi3 = new AuthorTestimonial(
  "Restu",
  "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore vero suscipit, cupiditate illum ipsum provident"
);


const testimonials = [testi1, testi2, testi3];

let insertHtml = '';

for(i = 0 ; i < testimonials.length; i++){
    insertHtml += testimonials[i].html();
}

document.getElementById("testimonial-container").innerHTML = insertHtml