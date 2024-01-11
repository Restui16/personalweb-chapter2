function getTestiDummy(){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open("GET", "https://api.npoint.io/45b8dc3c5a869cf0c3d6", true)
        xhr.onload = () => {
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText)
                resolve(response)
            } else {
                reject("Something went wrong");
            }
        }

        xhr.onerror = () => {
            reject("Connection Error!");
        }

        xhr.send()
    })
}

async function allTestimonial(){
    const testimonials = await getTestiDummy()
    let testimonialHTML = ""

    testimonials.forEach((value) => {
        testimonialHTML += `
        <div class="col-12 col-sm-6 col-md-4 mb-3">
            <div class="card">
                <img src="${value.image}" style="height: 300px;" class="object-fit-cover rounded-top" alt="">
                <div class="card-body">
                    <p style="text-align: justify;" class="text-break">${value.message}</p>
                    <q class="d-block text-end">${value.name}</q>
                </div>
            </div>
        </div>`
    })

    document.getElementById("contentTestimonial").innerHTML = testimonialHTML
}

async function filterTestimonial(rating) {
    const testimonials = await getTestiDummy()


    const filteredTestimonial = testimonials.filter((value) => value.rating === rating)
    
    let filteredTestimonialHtml = "";
    
    if(!filteredTestimonial.length){
        return document.getElementById("contentTestimonial").innerHTML = `<div class="alert alert-dark" role="alert">
        Data Not Found!
      </div>`
    } 

    filteredTestimonial.forEach((value) => {
        filteredTestimonialHtml += `
        <div class="col-12 col-sm-6 col-md-4 mb-3">
            <div class="card">
                <img src="${value.image}" style="height: 300px;" class="object-fit-cover rounded-top" alt="">
                <div class="card-body">
                    <p style="text-align: justify;" class="text-break">${value.message}</p>
                    <q class="d-block text-end">${value.name}</q>
                </div>
            </div>
        </div>`
    })

    document.getElementById("contentTestimonial").innerHTML = filteredTestimonialHtml
}


allTestimonial()