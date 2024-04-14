import { dataSeries } from './data.js';
var seriesTbody = document.getElementById('series');
var avgSpan = document.getElementById('seasons-avg');
function renderSeriesInTable(series) {
    console.log('Cargando series...');
    series.forEach(function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(serie.id, "</td>\n                           <td>").concat(serie.name, "</td>\n                           <td>").concat(serie.channel, "</td>\n                           <td>").concat(serie.seasons, "</td>");
        seriesTbody.appendChild(trElement);
    });
}
function getSeasonsAvg(series) {
    var totalSeasons = 0;
    var quantElem = 0;
    series.forEach(function (serie) {
        totalSeasons += serie.seasons;
        quantElem++;
    });
    return totalSeasons / quantElem;
}
renderSeriesInTable(dataSeries);
avgSpan.innerHTML = "".concat(getSeasonsAvg(dataSeries).toFixed(1));
