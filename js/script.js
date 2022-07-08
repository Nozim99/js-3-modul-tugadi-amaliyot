window.addEventListener("DOMContentLoaded", () => {
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    loader = document.querySelector(".loader");

  // Loader
  // setTimeout(() => {
  //   loader.style.opacity = "0";
  //   setTimeout(() => {
  //     loader.style.display = "none";
  //   }, 500);
  // }, 2000);

  // Tabs
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }
  });

  // Timer

  const deadline = "2022-09-07";

  function getTimeRemaining(endTime) {
    const timer = Date.parse(endTime) - Date.parse(new Date());
    let days, hours, minutes, seconds;

    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor(((timer / 1000) * 60 * 60) % 24);
      minutes = Math.floor((timer / (1000 * 60)) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minutes, seconds };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updatClock, 1000);

    updatClock();

    function updatClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach((item) => {
    item.addEventListener("click", () => {
      openModal();
    });
  });

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target == modal) {
      closeModal();
    }
  });

  // const modalTimerId = setInterval(openModal, 3000);

  // klaviaturadan Esc tugmasini bossa quyidagi ko'd ishga tushadi
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "visible";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    // clearInterval(modalTimerId);
  }

  // sahifa oxiriga borganda modal oynasi chiqadi
  window.addEventListener("scroll", showModalByScroll);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  // Class
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.classes = classes;
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 11000;
      this.parent = document.querySelector(parentSelector);
      this.changeToUZS();
    }

    changeToUZS() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      // class berilmasa menu__item clasi qo'shiladi. default qilib belgilandi
      if(this.classes.length){
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((classname) => element.classList.add(classname));
      }

      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Price:</div>
            <div class="menuy__item-total"><span>${this.price}</span> uzs/month</div>
          </div>
      `;

      this.parent.append(element);
    }
  }
  new MenuCard(
    "img/tabs/1.png",
    "usual",
    'Plan "Usual"',
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati veritatis amet porro facilis? Esse nihil aspernatur harum sint a quibusdam minima blanditiis, hic natus incidunt recusandae? Velit, ad deleniti.",
    10,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/2.jpg",
    "plan",
    'Plan "Premium"',
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati veritatis amet porro facilis? Esse nihil aspernatur harum sint a quibusdam minima blanditiis, hic natus incidunt recusandae? Velit, ad deleniti.",
    20,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/3.jpg",
    "vip",
    'Plan "VIP"',
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati veritatis amet porro facilis? Esse nihil aspernatur harum sint a quibusdam minima blanditiis, hic natus incidunt recusandae? Velit, ad deleniti.",
    30,
    ".menu .container",
    "menu__item"
  ).render();
});
