const typeColors = {
    normal: "lightgray",
    fighting: "sienna",
    flying: "skyblue",
    poison: "mediumorchid",
    ground: "peru",
    rock: "goldenrod",
    bug: "greenyellow",
    ghost: "indigo",
    steel: "lightsteelblue",
    fire: "orangered",
    water: "lightblue",
    grass: "yellowgreen",
    electric: "gold",
    psychic: "hotpink",
    ice: "lightskyblue",
    dragon: "slateblue",
    dark: "darkslategray",
    fairy: "pink",
    stellar: "turquoise",
    unknown: "darkgray",
  };
  
  let pokemon=[];
  
  
  let main = document.querySelector("main");
  console.log(main);
  
  async function getPokemon(i) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let json = await data.json();
    return json;
  }
  for (let i = 1; i < 152; i++) {
    let result = getPokemon(i);
  
    result
      .then((data) => {
        // console.log(data);
        pokemon.push(data);
      
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  
setTimeout(()=>{
    console.log(pokemon);
    displayData(pokemon,"all");
},1000)

function displayData(pok,x){
    if(x!='all'){
       pok= pok.filter((data)=>{
            console.log(data.types[0].type.name.toLowerCase()==x.toLowerCase(),data.types[0].type.name.toLowerCase(),x.toLowerCase());
            
            return data.types[0].type.name.toLowerCase()==x.toLowerCase();
        })

    }
    console.log(pok);
    main.innerHTML=``;
    pok.map((data)=>{
       
        let container=document.createElement('div');
          container.classList='cards-container';
          let cards=document.createElement('div');
          const background=data.types[0].type.name;
          cards.style.backgroundColor=typeColors[background];
          cards.classList=`cards `
          let div = document.createElement("div");
          let backdiv = document.createElement("div");
          div.classList = "front";
          div.innerHTML = `
                    <p>#${data.id}</p>
                    <img src="${data.sprites.front_default}" alt="">
                    <p>${data.name}</p>
                    <p>${data.types[0].type.name}</p>
                    `;
          backdiv.innerHTML = `
            <p>#${data.id}</p>
               <img src="${data.sprites.front_shiny}" alt="">
              
                 <p>${data.name}</p>
                 <div>
                 <p>Abilities:</p>
                 <p>${data.abilities
                   .map((abi) => {
                     return abi.ability.name;
                   })
                   .join(",")}</p>
                    </div>
                `;
          backdiv.classList = "back";
          cards.appendChild(div);
          cards.appendChild(backdiv);
          container.appendChild(cards);
          main.appendChild(container);

    })
}
  
  let filterByType=document.querySelector('.filterbtn');
  let select=document.querySelector("select");
  filterByType.addEventListener('click',()=>{
    console.log('clicked',select.value);
    
    displayData(pokemon,select.value)
    
  });
  let reset=document.querySelector('.reset')
  reset.addEventListener('click',()=>{
    
    displayData(pokemon,"all")
    
  });