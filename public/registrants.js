async function selectLivingPlaceForm() {
  var option = document.getElementById('countrySelect').value;
  if(option == 'México')
  {
    document.getElementById('form1-q-1').style.display = "inline";
    document.getElementById('form1-q-2').style.display = "inline";
    document.getElementById('form1-q-3').style.display = "inline";
   
    document.getElementById('form2-q-1').style.display = "none";
    document.getElementById('form2-q-2').style.display = "none";
  }
  else if(option == 'otro')
  {
    document.getElementById('form2-q-1').style.display = "inline"    
    document.getElementById('form2-q-2').style.display = "inline";
  
    document.getElementById('form1-q-1').style.display = "none";
    document.getElementById('form1-q-2').style.display = "none";
    document.getElementById('form1-q-3').style.display = "none";
  }
}

async function showWorkshops() {

  if (document.getElementsByClassName("adult").length > 0) {
    return;
  }
  document.getElementById('workshops_header').style.display = "inline";
  document.getElementById('titleDig').style.display = "inline";
  
  var option = document.getElementById('age').value;
  if (option < 8) {  
    document.getElementById('workshops_5_7').style.display = "inline";
    document.getElementById('workshop_5_7_dig').style.display = "inline"; 
    document.getElementById('workshops_8_12').style.display = "none";
    document.getElementById('workshop_8_12_dig').style.display = "none";
    document.getElementById('workshops_13_17').style.display = "none";
    document.getElementById('workshop_13_17_dig').style.display = "none"; 
  } 
  else if (option > 7 && option <13) {
    document.getElementById('workshops_8_12').style.display = "inline";
    document.getElementById('workshop_8_12_dig').style.display = "inline";
    document.getElementById('workshops_5_7').style.display = "none";
    document.getElementById('workshop_5_7_dig').style.display = "none"; 
    document.getElementById('workshops_13_17').style.display = "none";
    document.getElementById('workshop_13_17_dig').style.display = "none"; 
  }
  else if (option >12) {
    document.getElementById('workshops_8_12').style.display = "none";
    document.getElementById('workshop_8_12_dig').style.display = "none";
    document.getElementById('workshops_5_7').style.display = "none";
    document.getElementById('workshop_5_7_dig').style.display = "none"; 
    document.getElementById('workshops_13_17').style.display = "inline";
    document.getElementById('workshop_13_17_dig').style.display = "inline"; 

  }
}

async function sendRegistrationData() {
  

  const body = document.getElementsByClassName("data");
  const arrayTaller = document.getElementsByClassName("taller");
  console.log(arrayTaller);


  var data = { };
  data.nombre = body[0].value;
  data.apellidos = body[1].value;
  data.fechaNacimiento = body[2].value;
  data.edad = body[3].value;
  data.curp = body[5].value;
  data.escolaridad = body[6].value;
  data.email = body[7].value;


  for (let index = 0; index < body.length; index++) {


    if (body[index].id === 'sexoDiv') {

      if (body[index].children[2].children[0].checked) {
      
        console.log(body[index].children[2].children[0].name, body[index].children[2].children[0].value)
      }
      else{
        console.log(body[index].children[3].children[0].name, body[index].children[3].children[0].value)
      }

    }else if(body[index].id === "paisSelect"){

      if (body[index].children[0].children[0].children[2].value == "México") {
        
        data.pais = body[index].children[0].children[0].children[2].value;
        data.colonia = body[index].children[1].children[0].children[1].value;
        data.alcaldia = body[index].children[1].children[1].children[1].value;
        data.estado = body[index].children[1].children[2].children[2].value;

      }
      else{

        data.pais = body[index].children[2].children[0].children[1].value;
        data.estado = body[index].children[2].children[1].children[1].value;

      }

    }else if (body[index].id === "talleres") {

      
    }else{

      // console.log(body[index].name,body[index].value);
    }
    
  }
  
  console.log(data,'fin registro' );
}

// http://localhost:5002/registrant/registerUser method="post"