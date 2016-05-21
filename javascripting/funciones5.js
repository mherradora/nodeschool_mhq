function addCommas(nStr) {
  //Funcion tomada de: http://stackoverflow.com/questions/6392102/add-commas-to-javascript-output
  //La modificamos para colocar "." en lugar de "," pues el resultado final debe exportarse a Excel
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
	x1 = x1.replace(rgx, '$1' + '.' + '$2');
    };
    return x1 + x2;
};

function clickHere(base,control) {
	$(base).mouseover(function(){
		$(control).slideToggle(300);
	 	$(this).toggleClass('close');
	 });
};

function clickUpdate(base) {
	$(base).click(function(){
		if(base=='#TipoOlaB'){
			for(j=0;j<opsA.length;j++){
			  if(opsA[j]!='#TipoOlaA'){$(opsA[j]).attr('style','text-align:right;');};
			};
			$('#Resetear').attr('style','text-align:right;')
			$('#content').attr('style','background-color:white;float:left;padding-left:1%;')
			$('#grafo').attr('style','background-color:white;float:left;padding-left:1%;')
		};
		$('#test1 svg').replaceWith('<svg></svg>');
	 	egmGN(true);
	});
};

function reseteo(base){
	$(base).click(function(){
		for(j=0;j<opsA.length;j++){
			$(opsB[j]).slideUp();
		};
		egmGN(false);
		for(j=0;j<opsA.length;j++){
		  if(opsA[j]!='#TipoOlaA'){$(opsA[j]).attr('style','text-align:right;display: none;');};
		};
		$('#Resetear').attr('style','text-align:right;display: none;')
		$('#content').attr('style','background-color:white;float:left;padding-left:1%;display: none;')
		$('#grafo').attr('style','background-color:white;float:left;padding-left:1%;display: none;')
		$('#test1 svg').replaceWith('<svg></svg>');
	});
};

function seleccionador(egmTemp,sList,sVar){
		var n=0;
		var egmTempX = new Array();
		var egmTemp1 = new Array();
		for(j=0;j<sList.length;j++)
		{
			switch (sVar)
			{
				case 1:
					var egmTempX = jQuery.grep(egmTemp, function(n,k){
						  return (n.O == sList[j]);
						});
					break;
				case 2:
					var egmTempX = jQuery.grep(egmTemp, function(n,k){
						  return (n.Pr == sList[j]);
						});
					break;
				case 3:
					var egmTempX = jQuery.grep(egmTemp, function(n,k){
						  return (n.S == sList[j]);
						});
					break;
				case 4:
					var egmTempX = jQuery.grep(egmTemp, function(n,k){
						  return (n.E == sList[j]);
						});
					break;
				case 5:
					var egmTempX = jQuery.grep(egmTemp, function(n,k){
						  return (n.NSE == sList[j]);
						});
					break;
				case 6:
					var egmTempX = jQuery.grep(egmTemp, function(n,k){
						  return (n.NAA == sList[j]);
						});
					break;
				case 7:
					var egmTempX = jQuery.grep(egmTemp, function(n,k){
						  return (n.T == sList[j]);
						});
					break;
			};
			egmTemp1 = egmTemp1.concat(egmTempX);
		};
		return egmTemp1;
};

function selecter(dataset,n){
  var data = [];
  for (i = 0; i < n; i++) {
    data.push({
      M: dataset[i].M,
      Al: dataset[i].Al,
      Af: dataset[i].Af,
      P: dataset[i].P,
      GN: dataset[i].GN,
      T: dataset[i].T
    });
  };
  return data;
};

function egmGN(desgrafo)
	{
	//Definición de las variables numerica y de texto
	var n = 0;
	var base = 0;
	var total = 0;
	//var nOla = 2508607;
	var nOla = 2508625;
	var enun = ""; //</table>";

	//Definición de las variables tipo Array
	var gnS = new Array();
	var tipoS = new Array();
	var olaS = new Array();
	var proS = new Array();
	var sexS = new Array();
	var ageS = new Array();
	var nseS = new Array();
	var naaS = new Array();
	var listElim = new Array();
	var generales = new Array();
	var generales0 = new Array();
	var totalPersonas0 = new Array();
	var totalPersonas0X = new Array();
	var totalPersonas1 = new Array();
	var egmTemp0 = new Array();

	//Copiamos el contenido de egmData en egmTemp
	var egmTemp = egmData;

	//Según el valor de desgrafo limpiamos las selecciones o llenamos los arrays de selección con los datos correspondientes
	if(desgrafo){
		var gnS = $( "#gn" ).val() || [];
		var tipoS = $( "#tipo" ).val() || [];
		var olaS = $( "#ola" ).val() || [];
		var proS = $( "#prov" ).val() || [];
		var sexS = $( "#sex" ).val() || [];
		var ageS = $( "#age" ).val() || [];
		var nseS = $( "#nse" ).val() || [];
		var naaS = $( "#naa" ).val() || [];
	} else {
		$( "#gn" ).val("");
		$( "#tipo" ).val("");
		$( "#ola" ).val("");
		$( "#prov" ).val("");
		$( "#sex" ).val("");
		$( "#age" ).val("");
		$( "#nse" ).val("");
		$( "#naa" ).val("");
	}
	//alert(gnS.length);
	//alert(tipoS.length);
	//alert(olaS.length);
	//alert(proS.length);

	//alert(sexS.length);
	//alert(ageS.length);
	//alert(nseS.length);
	//alert(naaS.length);
	//Definimos los elementos que deben aparecer en el enunciado de selección
	//Con uso de la función seleccionador delimitamos la base solo a los elementos que se han ido seleccionando

	if(gnS.length>0){enun=enun + "<tr><td>Subgrupo:</td><td>" + gnS.join(", ") + "</td></tr>";};
	if(olaS.length>0){enun=enun + "<tr><td>Ola:</td><td>" + olaS.join(", ") + "</td></tr>";
	  egmTemp=seleccionador(egmTemp, olaS, 1);};
	if(tipoS.length>0){enun=enun + "<tr><td>Tipo:</td><td>" + tipoS.join(", ") + "</td></tr>";};
	if(proS.length>0){enun=enun + "<tr><td>Provincia:</td><td>" + proS.join(", ") + "</td></tr>";
	  egmTemp=seleccionador(egmTemp, proS, 2);};
	if(sexS.length>0){enun=enun + "<tr><td>Sexo:</td><td>" + sexS.join(", ") + "</td></tr>";
	  egmTemp=seleccionador(egmTemp, sexS, 3);};
	if(ageS.length>0){enun=enun + "<tr><td>Edad:</td><td>" + ageS.join(", ") + "</td></tr>";
	  egmTemp=seleccionador(egmTemp, ageS, 4);};
	if(nseS.length>0){enun=enun + "<tr><td>NSE:</td><td>" + nseS.join(", ") + "</td></tr>";
	  egmTemp=seleccionador(egmTemp, nseS, 5);};
	if(naaS.length>0){enun=enun + "<tr><td>NAA:</td><td>" + naaS.join(", ") + "</td></tr>";
	  egmTemp=seleccionador(egmTemp, naaS, 6);};

	tipoS = tipoS.concat('Pr');
	//alert(tipoS);
	//alert(totalPersonas.length);
	//Sumarizamos la cantidad de personas para cada medio
	for(i=0;i<totalPersonas.length;i++){
		totalPersonas[i].P=0;
		//Se construye una base a partir de egmTemp0 para cada medio
		egmTemp0 = jQuery.grep(egmTemp, function(n,k){
			  return (n.M == totalPersonas[i].M);
			});
		if(egmTemp0.length>0){
			for(k=0;k<egmTemp0.length;k++){
				totalPersonas[i].P=totalPersonas[i].P+egmTemp0[k].P;
				};/*final del for para egmTemp0.length*/
			};/*final del if de egmTemp0.length*/
		//alert(totalPersonas[i].P);
	};/*final del for para allMedia.length*/

	//Reducimos el array de totalPersonas solo a los medios que tienen personas para la selección hecha
	totalPersonas0 = jQuery.grep(totalPersonas, function(n, j){
		  return (n.P > 0);
		});/*final de jQuery.grep*/
	//alert(totalPersonas0.length);
	//En caso de que se hayan seleccionado medios de nación se reduce el array de totalPersonas0 segun corresponde
	if (document.egm.gn[0].selected==true){
	  totalPersonas0 = jQuery.grep(totalPersonas0, function(n,k){
	    return (n.GN == "GN");
	  });
	};
	//alert(totalPersonas0.length);
	//Se usan los datos de tipo de medio para definir la base de las fracciones
	if (tipoS.length>1){
	  for(i=0;i<tipoS.length;i++){
		totalPersonas1 = jQuery.grep(totalPersonas0, function(n,k){
			  return (n.T == tipoS[i]);
		});
		totalPersonas0X = totalPersonas0X.concat(totalPersonas1);
	  }
	  totalPersonas0 = totalPersonas0X;
	}
	//alert(totalPersonas0.length);
	//alert(prov0.length);
	//Se usan los datos de tipo de provincia para definir la base de las fracciones
	for(i=0;i<prov0.length;i++){
		//alert(prov0[i]);
		generales0 = jQuery.grep(totalPersonas0, function(n,k){
			  return (n.M == prov0[i]);
		});
		//alert(generales0.length);
		generales = generales.concat(generales0);
	}
	//alert(generales.length);

	for(i=0;i<generales.length;i++){
			total=total+generales[i].P;
	};/*final del for para generales.length*/

	for(i=0;i<totalPersonas0.length;i++){
	  for(k=0;k<prov0.length;k++){
	    if(totalPersonas0[i].M==prov0[k]){
	      listElim = listElim.concat(i);
	    };
	  };
	};

	for(k=0;k<listElim.length;k++){
	  totalPersonas0.splice(listElim[k]-k,1);
	};

	for(i=0;i<totalPersonas0.length;i++){
		totalPersonas0[i].Al = totalPersonas0[i].P*100/total;
		switch (olaS[0])
		{
			case "A4a13":
				var varCase = totalPersonas0[i].A4a13;
				break;
			case "O4a13":
				var varCase = totalPersonas0[i].O4a13;
				break;
			case "A3a13":
				var varCase = totalPersonas0[i].A3a13;
				break;
			case "O3a13":
				var varCase = totalPersonas0[i].O3a13;
				break;
			case "A2a13":
				var varCase = totalPersonas0[i].A2a13;
				break;
			case "O2a13":
				var varCase = totalPersonas0[i].O2a13;
				break;
			case "A1a13":
				var varCase = totalPersonas0[i].A1a13;
				break;
			case "O1a13":
				var varCase = totalPersonas0[i].O1a13;
				break;
			case "A4a12":
				var varCase = totalPersonas0[i].A4a12;
				break;
			case "A3a12":
				var varCase = totalPersonas0[i].A3a12;
				break;
			case "O3a12":
				var varCase = totalPersonas0[i].O3a12;
				break;
		};
		totalPersonas0[i].Af = (totalPersonas0[i].P*nOla*100)/(varCase*total);
	};/*final del for para totalPersonas.length*/

	/* Este es el sort*/
	totalPersonas0.sort(function(a,b) {
	  return parseInt(b.P,10) - parseInt(a.P,10);
	});

	//Damos contenido a la tabla que tiene los resultados
	$('#t1').html('<table id="t1" class="table table-hover"><tr><td>Medio</td><td>Alcance</td><td>Alcance (%)</td><td>Afinidad</td></tr></table>')

	for(i=0;i<totalPersonas0.length;i++){
	  varAlcance = totalPersonas0[i].Al.toFixed(0);
	  varAfinidad = totalPersonas0[i].Af.toFixed(0);
	  varPers = addCommas(totalPersonas0[i].P);
	  if(i<10){
		$('#t1').append('<tr id=ids"' + i + '"><td>' + totalPersonas0[i].M + '</td><td style="text-align:right;">' + varPers + '</td><td style="text-align:right;">' + varAlcance + '</td><td style="text-align:right;">' + varAfinidad + '</td></tr>');
	  } else {
		$('#t1').append('<tr id=ids"' + i + '" style="display: none;"><td>' + totalPersonas0[i].M + '</td><td style="text-align:right;">' + varPers + '</td><td style="text-align:right;">' + varAlcance + '</td><td style="text-align:right;">' + varAfinidad + '</td></tr>');
	  }/*final del if de i para el top ten*/
	};/*final del for para totalPersonas.length*/

	//Colocamos la leyenda con las selecciones realizadas

	$('#t0').html("<table id='t0' class='table table-hover'><tr><td>Filtro</td><td>Variable</td></tr><tr><td>Universo:</td><td>" + total.toFixed(0) + "</td></tr>" + enun + "</table>");
        //Copiamos los medios seleccionados y los filtramos para solo graficar los 10 primeros
	if(totalPersonas0.length<10) {
	  var totalPersonas1 = selecter(totalPersonas0,totalPersonas0.length);
	} else {
	  var totalPersonas1 = selecter(totalPersonas0,10);
	};
// 	alert(totalPersonas1.length)
// 	for(i=0;i<totalPersonas1.length;i++){
// // 		alert(totalPersonas1[i].Af)
// 	}
	graficador(totalPersonas1);

	var canvas = document.getElementById("test");
	//var img    = canvas.toDataURL("image/png");

	//$("lDownLoad").attr('href',img)
	}
