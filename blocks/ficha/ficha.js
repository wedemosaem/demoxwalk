// put your AEM publish address here
// this fixes having to manually change the AEM host here
const AEM_HOST = checkDomain()

function checkDomain(){
  if (window.location.hostname.includes("hlx.page") || window.location.hostname.includes("localhost")){
    return "https://publish-p157306-e1665625.adobeaemcloud.com/"    
  }else{
    return window.location.origin 
  }
}

export default function decorate(block) {

  const slugDiv = block.querySelector('div:nth-child(1)'); 
  const slugID = document.createElement('div');
  slugID.id = 'slug';
  slugDiv.replaceWith(slugID);
  slugID.innerHTML = `${slugDiv.innerHTML}`;
  const slug = slugID.textContent.trim();
  
  const quoteDiv = block.querySelector('div:last-of-type');
  const fichaDiv = document.createElement('div');
  fichaDiv.id = "ficha-" + slug; 
  quoteDiv.replaceWith(fichaDiv);


fetch(AEM_HOST + '/graphql/execute.json/aem-demo-assets/item-by-id;slug=' + slug)
.then(response => response.json())
.then(response => {
    // console.log(JSON.stringify(response,0,3));

            const cover_image_path = AEM_HOST + response.data.peliculaList.items[0].cover._path;
            const titulo =  response.data.peliculaList.items[0].titulo;
            const calificacion =  response.data.peliculaList.items[0].calificacion;
            const sinopsis =  response.data.peliculaList.items[0].sinopsis;
            const info =  response.data.peliculaList.items[0].info;
            const equipotecnico =  response.data.peliculaList.items[0].equipotecnico;

            fichaDiv.innerHTML = `
            <div class="brick slab-secondary brick-divided brick-third">
            <div class="wrapper">
                <div class="g brick-content">
                <div class="gi lap-one-third">
                    <div class="ee-info">
                    <div class="cover">
                        <img src=src="${cover_image_path}" alt="${titulo}" title="${titulo}">
                    </div>
                    </div>
                    <div class="ee-stars">
                    <h2 class="heading light">Valoración de usuarios</h2>
                    <div class="rating-content j-stars">
                        <div class="stars">
                        <!-- stars markup could be dynamic if needed -->
                        </div>
                        <div class="rating-value">
                        <span class="rating">${calificacion}</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="gi lap-two-thirds">
                    <div class="ee-info-2">
                    <div class="g">
                        <div class="gi desk-one-half col1ee">
                        <ul class="list-actions">
                            <li><a href="#" class="button-link button-link-right"><span class="icon icon-play"></span>Soy cliente</a></li>
                        </ul>
                        </div>
                        <div class="gi desk-one-half col2ee">
                        <a href="#" class="button sc-btn-c2c"><span>Suscribirme ahora</span></a>
                        <div class="mplus-tags">
                            <!-- SVG icon omitted for brevity -->
                            Incluido en suscripción de 9,99€
                        </div>
                        </div>
                    </div>
                    <div class="g">
                        <div class="gi desk-one-third">
                        <div class="heading"><h3>Título</h3></div>
                        <p>${titulo}</p>
                        </div>
                        <div class="gi desk-two-thirds">
                        <div class="heading"><h2>Sinopsis</h2></div>
                        <div class="show-content">
                            <div class="text show-more-height">
                            <p>${sinopsis}</p>
                            </div>
                        </div>
                        </div>
                        <div class="gi desk-one-third">
                        <div class="heading"><h3>Info</h3></div>
                        <p>${info}</p>
                        <div class="moral">
                            <div class="heading"><h3>Calificación</h3></div>
                            <h2>${calificacion}</h2>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <section class="g brick-content datos-tecnicos">
                <div class="gi lap-one-third">
                    <div class="h-delta"><h2>Equipo Técnico</h2></div>
                </div>
                <div class="gi lap-two-thirds">
                    <div class="g">
                    <div class="gi lap-one-half">
                        <p>${equipotecnico}</p>
                    </div>
                    </div>
                </div>
                </section>
            </div>
            </div>`;







    // const backgroundImage = response.data.peliculaList.items[0].primaryImage._path;
    // const backgroundImage = response.data.peliculaList.items[0].cover._path;
    // document.getElementById(fichaDiv.id).innerHTML = "<section><img src=" + AEM_HOST + backgroundImage + "></section>";  

    // const adventureTitle = response.data.peliculaList.items[0].titulo;
    // document.getElementById(fichaDiv.id).innerHTML += "<section><h3>"+ adventureTitle + "</h3></section>";

    // const adventureDesc = response.data.peliculaList.items[0].sinopsis.plaintext;
    // document.getElementById(fichaDiv.id).innerHTML += "<section>" + adventureDesc + "</section>";

    // const adventureType = response.data.peliculaList.items[0].adventureType;
    // document.getElementById(fichaDiv.id).innerHTML += "<section>" + "Adventure Type: " + adventureType + "</section>";

    // const tripLength = response.data.peliculaList.items[0].tripLength;
    // document.getElementById(fichaDiv.id).innerHTML += "<section>" +"Trip Length: " + tripLength + "</section>";

    // const tripDifficulty = response.data.peliculaList.items[0].difficulty;
    // document.getElementById(fichaDiv.id).innerHTML += "<section>" + "Difficulty: " + tripDifficulty + "</section>";

    // const groupSize = response.data.peliculaList.items[0].groupSize;
    // document.getElementById(fichaDiv.id).innerHTML += "<section>" + "Group Size: " + groupSize + "</section>";

    // const tripItinerary= response.data.peliculaList.items[0].itinerary.html;
    // document.getElementById(fichaDiv.id).innerHTML += "<section>" + "Itinerary: </br>" + tripItinerary + "</section>";

})
.catch(error => {
  console.log('Error fetching data:', error);
});

}




