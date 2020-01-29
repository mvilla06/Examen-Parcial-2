function watchForm(){
    let form = document.getElementsByClassName('js-search-form')[0];
    $(form).on('submit', (event)=>{
        event.preventDefault();
        let name = document.getElementById('query');
        if(!($(name).val()=="")){
            let url = 'https://restcountries.eu/rest/v2/name/'+$(name).val() + '?fullText=true';
            fetch(url,{
                method:'GET'
            })
            .then((response)=>{
                
                if(response.ok){
                    response.json().then(responseJSON=>{
                        let countryOBJ = {name:responseJSON[0].name,
                            capital:responseJSON[0].capital, 
                            flag:responseJSON[0].flag, 
                            population:responseJSON[0].population, 
                            region:responseJSON[0].region, 
                            timezones:responseJSON[0].timezones,
                            borders:responseJSON[0].borders
                        }

                        displayResults(countryOBJ);
                        
                    });
                }else{
                    let err = document.createElement('p');
                    $(err).text('Pais no existente');
                    $('main').empty();
                    $('main').append(err);
                }
            })
            .catch((error)=>{
                
                console.log(error);
            })
            
        }
    });
}


function displayResults(countryOBJ){
    $('main').empty();
    let country = document.createElement('div');
    $(country).attr('class', 'country');
    let title = document.createElement('h3');
    $(title).text(countryOBJ.name);
    let subtitle = document.createElement('h4');
    $(subtitle).text('Capital: ' +countryOBJ.capital);
    let img = document.createElement('img');
    $(img).attr('src', countryOBJ.flag);
    
    let pop = document.createElement('p');
    $(pop).text('Population: '+ countryOBJ.population);
    let reg = document.createElement('p');
    $(reg).text('Region: '+countryOBJ.region);
    let time = document.createElement('ul');
    for(let i=0; i<countryOBJ.timezones.length; i++){
        let a = document.createElement('li');
        $(a).text(countryOBJ.timezones[i]);
        $(time).append(a);
    }
    
    let bor = document.createElement('ul')
    for(let i=0; i<countryOBJ.borders.length; i++){
        let b = document.createElement('li');
        $(b).text(countryOBJ.borders[i]);
        $(bor).append(b);
    }
    $(country).append(title, subtitle, img, pop, reg, time, bor);
    $('main').append(country);
}

function init(){
    watchForm();
}


init();