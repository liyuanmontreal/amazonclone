import React from "react"


const Crousal = () => {
    return(

    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <HTMLImageElement src="..." class="d-block w-100" alt="..."/>
      </div>
      <div class="carousel-item">
        <HTMLImageElement src="..." class="d-block w-100" alt="..."/>
      </div>
      <div class="carousel-item">
        <HTMLImageElement src="..." class="d-block w-100" alt="..."/>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  )
}



export default Crousal;