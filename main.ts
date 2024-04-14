import { Serie } from './series.js';

import { dataSeries } from './data.js';


let seriesTbody: HTMLElement = document.getElementById('series')!;
let avgSpan: HTMLElement = document.getElementById('seasons-avg')!;

function renderSeriesInTable(series: Serie[]): void {
  console.log('Cargando series...');
  series.forEach((serie) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${serie.id}</td>
                           <td>${serie.name}</td>
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

renderSeriesInTable(dataSeries);

avgSpan.innerHTML = `${getSeasonsAvg(dataSeries).toFixed(1)}`;

