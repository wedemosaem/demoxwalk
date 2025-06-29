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

    // const backgroundImage = response.data.peliculaList.items[0].primaryImage._path;
    const backgroundImage = response.data.peliculaList.items[0].cover._path;
    document.getElementById(fichaDiv.id).innerHTML = "<section><img src=" + AEM_HOST + backgroundImage + "></section>";  

    const adventureTitle = response.data.peliculaList.items[0].titulo;
    document.getElementById(fichaDiv.id).innerHTML += "<section><h3>"+ adventureTitle + "</h3></section>";

    // const adventureDesc = response.data.peliculaList.items[0].description.plaintext;
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




