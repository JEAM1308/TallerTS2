import { dataSeries } from './data.js';
var seriesTbody = document.getElementById('series');
var avgSpan = document.getElementById('seasons-avg');
var row1 = document.getElementById('row1');
function renderSeriesInTable(series) {
    console.log('Cargando series...');
    series.forEach(function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(serie.id, "</td>\n                           <td class=\"nameTag\"><a href=\"#\">").concat(serie.name, "</a></td>\n                           <td>").concat(serie.channel, "</td>\n                           <td>").concat(serie.seasons, "</td>");
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
function buscarSeriePorNombre(series, nombre) {
    for (var _i = 0, series_1 = series; _i < series_1.length; _i++) {
        var elemento = series_1[_i];
        if (elemento.name === nombre) {
            return elemento;
        }
    }
}
function seeDetails(serie) {
    var cardDiv = document.createElement("div");
    cardDiv.className = "col";
    cardDiv.className = "card-container";
    cardDiv.innerHTML = "<div class=\"card\" style=\"width: 18rem;\">\n                          <img class=\"card-img-top\" src=\"".concat(serie.image, "\" alt=\"Card image cap\">\n                          <div class=\"card-body\">\n                            <h5 class=\"card-title\">").concat(serie.name, "</h5>\n                            <p class=\"card-text\">").concat(serie.description, "</p>\n                            <a href=\"").concat(serie.link, "\" class=\"btn btn-primary\">Go to page</a>\n                          </div>\n                        </div>");
    if (row1 && row1.children.length >= 2) {
        var segundoHijo = row1.children[1]; // Obtén el segundo hijo
        if (segundoHijo) {
            row1.removeChild(segundoHijo);
        }
    }
    row1.appendChild(cardDiv);
}
renderSeriesInTable(dataSeries);
avgSpan.innerHTML = "".concat(getSeasonsAvg(dataSeries).toFixed(1));
var nameTag = document.getElementsByClassName("nameTag");
var _loop_1 = function (i) {
    nameTag[i].addEventListener('click', function () {
        clicEnCelda(nameTag[i]);
    });
};
for (var i = 0; i < nameTag.length; i++) {
    _loop_1(i);
}
function clicEnCelda(celda) {
    var contenido = celda.innerText;
    var serie = buscarSeriePorNombre(dataSeries, contenido);
    if (serie !== undefined) {
        seeDetails(serie);
    }
}
