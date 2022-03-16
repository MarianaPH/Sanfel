async function sendData() {
  const questions = document.getElementsByClassName("questions");
  const answers = document.getElementsByClassName('answers');
  const area = document.getElementsByClassName("Title");
  const check = document.getElementById("myCheck");
  const email = sessionStorage.getItem("email");
  
  var answerContainer = [];
  for (let index = 0; index < questions.length; index++) {
    for (let i = 0; i < 5; i++) {
      if (answers[index].children[i].children[0].checked) {
        var obj = {
          questionId : questions[index].id,
          value : answers[index].children[i].children[0].value
        }
        answerContainer.push(obj);        
      }
    }
  }
  console.log(area[0].id);
  if (answerContainer.length === 2/*questions.length*/ && check.checked) {

    var data = {
      email: email,
      data: answerContainer
    }
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(route + "forms/" + area[0].id, options);
      const response = await res.json()
      console.log(response.msg);
      swal({
        title: "Exito",
        text: response.msg,
        icon: "success",
        button: false
      });
      setTimeout(function(){window.location.replace(route + "login/isRegistered")}, 3000);
      sessionStorage.clear();
      
    } catch (error) {
      console.log(error);
    }
  }
  else {
    alert("Para continuar, selecciona todas las casillas del formulario");
  }
}

async function emailExists() {
  const email = sessionStorage.getItem("email");
  if (!email) {
    window.location.replace(route + "login/isRegistered");
  }
}

async function isRegistered() {
  const email = document.getElementById("email").value;
  const area = document.getElementById("test");
  const data = {
    email: email
  }
  var formName = area.options[area.selectedIndex].getAttribute('name');
  
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("area", area.value);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(route + "registrant/isRegistered/" + area.value , options);

    var response = await res.json();

    console.log(response.msg);
    
    if (res.status === 404) {
      swal({
        title: "Usuario no registrado",
        text: response.msg,
        icon: "warning",
        dangerMode: true,
        button: "OK"
      });
    }
    else if (res.status === 403) {
      swal({
        title: "Cuestionario contestado",
        text: response.msg,
        icon: "info",
        dangerMode: true,
        button: "OK",
      });
    }
    else 
      window.location.replace(route + "forms/" + formName);
  } catch (error) {
    console.log(error);
  }
}
