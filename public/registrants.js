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

async function registration() {
  console.log(document.forms[0]);
  console.log('registro' );
}

