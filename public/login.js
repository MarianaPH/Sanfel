async function getAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (password && email) {
    var data = {
      email: email,
      password: password
    }
  }

  console.log(data);
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
    else 
    {
      swal({
        title: "Error",
        text: response.msg,
        icon: "warning",
        dangerMode: true,
        button: "OK"
      });
    }
  } catch (error) {
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
    const res = await fetch(route + "auth", options);
    var response = await res.json();
    console.log(response);
    console.log(res.status)
    if (res.status === 401) {
      //validar que pasa 
    }
    else window.location.replace(route + "dashboard");

  } catch (error) {
    console.log(error);
  }
}

async function tokenExists() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.log('token')
    window.location.replace(route + "login");
  }
}