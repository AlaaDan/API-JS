function articles(data){
    for(article of data){
        //console.log(article.description)
        //console.log(article.title)
        const articleTag = document.querySelector('article');
        const h3 = document.createElement('h3')
        h3.innerHTML = article.title
        h3.setAttribute('class', 'title')
        articleTag.append(h3)
        const p = document.createElement('p')
        p.innerHTML = article.description
        h3.appendChild(p)
        p.style.display = 'none'
        h3.addEventListener('click', ()=>{
            
            if(p.style.display === 'block'){
                p.style.display = 'none'
            }
            else{
                p.style.display = 'block'
            }
        })        
    }
}

async function gettingInfo(){
    const response = await fetch('https://unstats.un.org/SDGAPI/v1/sdg/Goal/List')
    const data = await response.json();
    //console.log(data)
    articles(data)
}
gettingInfo()
