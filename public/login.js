async function getAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (password && email) {
    var data = {
      email: email,
      password: password
    }
  }
  

  // console.log(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Req-Type": "login"
    },
    body: JSON.stringify(data),
  };
  
  try {
    const res = await fetch(route + "validate", options);
    var response = await res.json();
    
    if (res.status === 200) {
      validateToken(response.token);
      sessionStorage.setItem("token", response.token);
    }
  } catch (error) {
    document.getElementById('alertDangerLogin').style.display = "inline";
    setTimeout(function(){ document.getElementById('alertDangerLogin').style.display ='none'}, 3000);
    console.log(error);
  }
}

async function validateToken(token) {
  const options = {
    method: "GET",
    headers: {
        "x-auth-token": token,
      }
  };

  try {
    var res = await fetch(route + "auth", options);
    var response = await res.json();
    if (res.status === 401) {
      //validar que pasa a
    }
    else{
      window.location.replace(route + "admin/dashboard");
      res = await fetch(route + "admin/dashboardInfo", options);
      response = await res.json();
      console.log(response, res);
      sessionStorage.setItem("data", response);

      //poner en sesion storage
    } 

  } catch (error) {
    console.log(error);
  }
}

async function tokenExists() {
  const token = sessionStorage.getItem("token");
  if (token) {
    document.body.style.opacity = 1;
    hideForms();
  }
  else{
    console.log('token')
    window.location.replace(route + "login");
  }
}

function hideForms() {
  var countryForms = document.getElementsByClassName("countryForm");
  document.getElementById('alertSuccess').style.display = "none";
  document.getElementById('alertDanger').style.display = "none";
  var talleres = document.getElementsByClassName('taller');
  // talleres[0].style.display = "none";

  
  for (let index = 0; index < talleres.length; index++) {
    talleres[index].style.display = "none"; 
  }

  for (let index = 0; index < countryForms.length; index++) {
    countryForms[index].style.display = "none"
  }
}

async function downloadInfo() {
  console.log("download")
  try {
    const response = await fetch(route + "registrant/info");
    const res = await response.json();
    if (response.status === 200) {
      document.getElementById('alertSuccess').style.display ='block';
      setTimeout(function(){ document.getElementById('alertSuccess').style.display ='none'}, 3000);
    }
    console.log(response);
    console.log(res);
  } catch (error) {
    console.log(error)
  }
}

async function hideAlertLogin() {
  document.getElementById('alertDangerLogin').style.display = "none";
}