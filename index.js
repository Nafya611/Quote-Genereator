const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const laoder=document.getElementById("loader");

// show loading
function loading(){
  laoder.hidden=false;
  quoteContainer.hidden=true;


}
// hide loading
function complete(){
  if(!laoder.hidden){
    quoteContainer.hidden=false;
    laoder.hidden=true; 
  }
}


//////////// get  quote from api
async function getQuote(){
  loading(); 
  const apiURL='https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
 
  try{
    const response=await fetch(apiURL);
    const data= await response.json();
     //seting author unknown  
     if(data.quoteAuthor===''){
        authorText.innerText='Unknown';
     }else{
       authorText.innerText=data.quoteAuthor;
    
      }
    //adjusting quote properties based number of its character
      if(data.quoteText.length>120){
        quoteText.classList.add("long-quote");
      }else{
        quoteText.classList.remove('long-quote');
      }
    quoteText.innerText=data.quoteText;
    // stop loader,show a quote
    complete();

}catch(error){
    getQuote();
    console.log('whoops, no quote',error);
  }

}



///////////////Tweet Quote

function tweetQuote(){
  const quote=quoteText.innerText;
  const author=authorText.innerText;
  const twitterUrl =`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl,"-blank");
}

//Event listeners

newQuoteBtn=document.querySelector("#new-quote");
twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener("click",getQuote);
 
//on load
getQuote();
