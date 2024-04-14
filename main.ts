import { Serie } from './series.js';

import { dataSeries } from './data.js';


let seriesTbody: HTMLElement = document.getElementById('series')!;
let avgSpan: HTMLElement = document.getElementById('seasons-avg')!;
let row1: HTMLElement = document.getElementById('row1')!;

function renderSeriesInTable(series: Serie[]): void {
  console.log('Cargando series...');
  series.forEach((serie) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${serie.id}</td>
                           <td class="nameTag"><a href="#">${serie.name}</a></td>
                           <td>${serie.channel}</td>
                           <td>${serie.seasons}</td>`;
    seriesTbody.appendChild(trElement);
  });
}
 

function getSeasonsAvg(series: Serie[]): number {
  let totalSeasons: number = 0;
  let quantElem: number = 0;
  series.forEach((serie) => {
    totalSeasons += serie.seasons;
    quantElem++;
  });
  return totalSeasons/quantElem;
}

function buscarSeriePorNombre(series: Serie[], nombre: string): Serie|undefined { 
  for (const elemento of series) {
    if (elemento.name === nombre) {
      return elemento;
    }
  }
}

function seeDetails(serie: Serie): void { 
  let cardDiv = document.createElement("div");
  cardDiv.className = "col";
  cardDiv.className = "card-container";
  cardDiv.innerHTML = `<div class="card" style="width: 18rem;">
                          <img class="card-img-top" src="${serie.image}" alt="Card image cap">
                          <div class="card-body">
                            <h5 class="card-title">${serie.name}</h5>
                            <p class="card-text">${serie.description}</p>
                            <a href="${serie.link}" class="btn btn-primary">Go to page</a>
                          </div>
                        </div>`;
  if (row1 && row1.children.length >= 2) {
  const segundoHijo: HTMLElement | null = row1.children[1] as HTMLElement | null;
    if (segundoHijo) {
      row1.removeChild(segundoHijo);
    }
  }
  row1.appendChild(cardDiv);
}



renderSeriesInTable(dataSeries);

avgSpan.innerHTML = `${getSeasonsAvg(dataSeries).toFixed(1)}`;

let nameTag: HTMLCollectionOf<Element> = document.getElementsByClassName("nameTag");

for (let i = 0; i < nameTag.length; i++) {
  nameTag[i].addEventListener('click', () => {
    clicEnCelda(nameTag[i] as HTMLElement);
  });
}

function clicEnCelda(celda: HTMLElement) {
  const contenido: string= celda.innerText;
  let serie: Serie | undefined = buscarSeriePorNombre(dataSeries, contenido);
  if (serie !== undefined ) {
    seeDetails(serie);
  }
}
