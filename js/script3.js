let username = document.getElementsByClassName("form__name")[0];
let email = document.getElementsByClassName("form__email")[0];
let password = document.getElementsByClassName("form__password")[0];
let submit = document.getElementsByClassName("btn")[0];
let dataCheck = document.getElementsByClassName("data__check")[0];

class Autorisation {
  constructor() {}

  sendData() {
    if (this.checkData()) {
      dataCheck.textContent = "";
      fetch(
        "https://game-eqe9.onrender.com/autorisation/" +
          username.value +
          "/" +
          password.value +
          "/" +
          email.value +
          "/"
      )
        .then((json) => json.json())
        .then((data) => {
          console.log(data);
          if (data.data === "success") {
            location.href = "/css/project/index.html";
          } else {
            dataCheck.textContent = "Такого користувача не знайдено.";
          }
        });
    } else {
      dataCheck.textContent = "Перевірте правильність введених даних.";
    }
  }

  checkData() {
    if (
      username.value.length > 3 &&
      username.value.length < 20 &&
      password.value.length > 8 &&
      password.value.length < 300
    ) {
      return true;
    } else {
      return false;
    }
  }
}

let user = new Autorisation();

submit.addEventListener("click", function (e) {
  user.sendData();
  e.preventDefault();
});
