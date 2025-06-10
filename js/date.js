$(document).ready(function () {
  const mounth = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const date = new Date();
  const nameMounth = mounth[date.getMonth()];
  const year = date.getFullYear();

  const dateFormatter = `${nameMounth } ${year}`;
  $("#present-day").text(dateFormatter);
});