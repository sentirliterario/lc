$("#lcForm").on("submit", function (e) {
  e.preventDefault();
  const data = $("#lcForm")
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});

  const start_date = new Date(data.start_date);
  const end_date = new Date(data.end_date);
  const diff = Math.abs(end_date - start_date);
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1; // +1 for today consideration
  let rest_chapters = data.qty_cap % days;
  const chapters_by_day = (data.qty_cap - rest_chapters) / days;
  const middle_day = Math.ceil(days / 2);
  let debat_date = new Date(data.start_date);
  debat_date = new Date(debat_date.setDate(debat_date.getDate() + middle_day));

  let iterable_chapters = 0;

  const daysData = [];
  for (let i = 0; i < days; i++) {
    let iterable_date = start_date;
    iterable_date = iterable_date.setDate(iterable_date.getDate() + 1);
    let final_date = new Date(iterable_date);
    let initial_chapter = iterable_chapters;
    iterable_chapters += chapters_by_day;
    if (rest_chapters > 0) {
      iterable_chapters++;
      rest_chapters--;
    }

    daysData.push({
      day: final_date,
      start_chapter: initial_chapter,
      end_chapter: iterable_chapters,
    });
  }
  let saveData = {
    title: data.title,
    start: data.start_date,
    end: data.end_date,
    book: data.book,
    picture: data.picture,
    infos: data.infos,
    debat_date,
    days: daysData,
  };
  localStorage.setItem("lc-generator-data", JSON.stringify(saveData));

  window.location.href = "result.html";
});

if ($("body").hasClass("result")) {
  const data = JSON.parse(localStorage.getItem("lc-generator-data"));
  $(".title").html(data.title);
  $(".infos").html(data.infos.replaceAll("\n", "<br>"));
  $(".book").html(data.book);
  $(".book-image").attr("src", data.picture);
  document.addEventListener("DOMContentLoaded", function () {
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      customButtons: {
        myCustomButton: {
          text: "Cronograma de leitura",
          click: function () {
            alert("clicked the custom button!");
          },
        },
      },
      now: "2022-11-05",
      initialDate: data.start,
      initialView: "dayGridMonth",
      locale: "pt-br",
      headerToolbar: {
        start: "listMonth",
        center: "myCustomButton",
        end: "dayGridMonth",
      },
      events: [
        {
          title: "In??cio",
          start: data.start,
        },
        {
          title: "Debate 50%",
          start: data.debat_date,
          editable: true,
          allDay: true,
          color: "#fed7aa",
          textColor: "#000000",
        },
        {
          title: "Debate final",
          start: data.end,
          editable: true,
          allDay: true,
          color: "#fed7aa",
          textColor: "#000000",
        },
      ],
    });
    calendar.render();
    data.days.forEach((el) => {
      calendar.addEvent({
        title: `Cap. ${el.start_chapter} at?? ${el.end_chapter}`,
        start: el.day,
        display: "block",
        color: "#f97316",
        editable: true,
        allDay: true,
      });
    });
  });
} else if ($("body").hasClass("lc-novembro")) {
  document.addEventListener("DOMContentLoaded", function () {
    isMobile = window.innerWidth <= 640;
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      customButtons: {
        myCustomButton: {
          text: "Cronograma de leitura",
        },
      },
      buttonText: {
        month: "m??s",
        list: "lista",
      },
      now: "2022-11-14",
      initialDate: "2022-11-01",
      initialView: isMobile ? "listMonth" : "dayGridMonth",
      locale: "pt-br",
      headerToolbar: {
        start: "listMonth",
        center: isMobile ? "" : "myCustomButton",
        end: "dayGridMonth",
      },
      events: [
        {
          title: "In??cio",
          start: "2022-11-01",
          color: "#16a34a",
        },
        {
          title: "Final",
          start: "2022-11-26",
          color: "#dd2b2b",
        },
        {
          title: "Debate 50%",
          start: "2022-11-13",
          color: "#FFCA79",
          textColor: "#000000",
        },
        {
          title: "Debate final",
          start: "2022-11-26",
          color: "#FFCA79",
          textColor: "#000000",
        },
        {
          title: 'At?? "O homem ?? porta"',
          start: "2022-11-01",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Portas"',
          start: "2022-11-02",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "A quem interessar possa"',
          start: "2022-11-03",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "A biblioteca da meia noite"',
          start: "2022-11-04",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Sobrecarga de arrependimento"',
          start: "2022-11-05",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "A pen??ltima atualiza????o de status"',
          start: "2022-11-06",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Fogo"',
          start: "2022-11-07",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "A vida bem sucedida"',
          start: "2022-11-08",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Erro de sistema"',
          start: "2022-11-09",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Andando em c??rculos"',
          start: "2022-11-10",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Ilha"',
          start: "2022-11-11",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Expectativa"',
          start: "2022-11-12",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Deus e outros bibliotec??rios"',
          start: "2022-11-13",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Selvagens e livres"',
          start: "2022-11-14",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Uma bandeja de prata com p??es de mel"',
          start: "2022-11-15",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Amor e dor"',
          start: "2022-11-16",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Uma vida leve"',
          start: "2022-11-17",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "O bar da ??ltima chance"',
          start: "2022-11-18",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Perdida na biblioteca"',
          start: "2022-11-19",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "A vida perfeita"',
          start: "2022-11-20",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Triciclo"',
          start: "2022-11-21",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "Um novo jeito de enxergar"',
          start: "2022-11-22",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "N??o se atreva a desistir, Nora Sneed"',
          start: "2022-11-23",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "O outro lado do desespero"',
          start: "2022-11-24",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "O vulc??o"',
          start: "2022-11-25",
          color: "#FF7A0D",
        },
        {
          title: 'At?? "A biblioteca da meia noite"',
          start: "2022-11-26",
          color: "#FF7A0D",
        },
      ],
    });
    calendar.render();
  });
}
