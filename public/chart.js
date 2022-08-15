
setup();

async function getInfo() {

  const forms = [];
  const timesAnswered = [];
  const res = await fetch(route + "areas/infoForms");
  const response = await res.json()
  console.log(response);

  response.forms.forEach( form => {
    forms.push(form.description);
    timesAnswered.push(form.timesAnswered);

  });


  return [forms, timesAnswered];
  
}


async function setup() {

  var data = await getInfo();


  console.log(data);

  new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: data[0],
      datasets: [
        {
          label: "Formularios Contestados",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: data[1]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Formularios contestados  '
      }
    }
  });
  
  new Chart(document.getElementById("doughnut-chart2"), {
    type: 'doughnut',
    data: {
      labels: ["3 - 7 años", "8 - 12 años", "13 - 18 años", "Adultos"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [3,2,1,3]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Personas Registradas'
      }
    }
  });
  
  // new Chart(document.getElementById("doughnut-chart3"), {
  //   type: 'doughnut',
  //   data: {
  //     labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
  //     datasets: [
  //       {
  //         label: "Population (millions)",
  //         backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
  //         data: [2478,5267,734,784,433]
  //       }
  //     ]
  //   },
  //   options: {
  //     title: {
  //       display: true,
  //       text: 'Predicted world population (millions) in 2050'
  //     }
  //   }
  // });
  
  // new Chart(document.getElementById("doughnut-chart4"), {
  //   type: 'doughnut',
  //   data: {
  //     labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
  //     datasets: [
  //       {
  //         label: "Population (millions)",
  //         backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
  //         data: [2478,5267,734,784,433]
  //       }
  //     ]
  //   },
  //   options: {
  //     title: {
  //       display: true,
  //       text: 'Predicted world population (millions) in 2050'
  //     }
  //   }
  // });
}



