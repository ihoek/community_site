// 로드 시 쿠키 읽기
window.addEventListener("DOMContentLoaded", function () {
  const idCookie = getCookie("id");

  if (!idCookie) {
    return;
  }
  const id = document.getElementById("id");

  id.value = idCookie;

  // 쿠키 가져오기
  function getCookie(name) {
    let cookies = document.cookie.split("; ");
    // console.log(cookies);
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return "";
  }
});

// 아이디, 비밀번호 입력값이 일단 들어가면 로그인 버튼 'disabled' 해제
const id = document.getElementById("id");
const password = document.getElementById("password");
const login_btn = document.querySelector(".login-btn");

const openLogin = () => {
  if (id.value != "" && password.value != "") {
    login_btn.disabled = false;
  } else {
    login_btn.disabled = true;
  }
};
id.addEventListener("input", openLogin);
password.addEventListener("input", openLogin);

// 로그인
const content01 = document.querySelector(".content01");
const content02 = document.querySelector(".content02");
const saveId = document.getElementById("saveId");

const login = () => {
  // if (id.value == '') {
  //   content01.innerHTML = `<div>아이디를 입력해주세요.</div>`;
  //   return;
  // }
  // if (password.value == '') {
  //   content02.innerHTML = `<div>비밀번호를 입력해주세요.</div>`;
  // }

  axios
    .post("/login", { id: id.value, pw: password.value })
    .then((res) => {
      if (res.data.result) {
        // 아이디 저장 체크 시 쿠키에 아이디 저장
        if (saveId.checked) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7);
          document.cookie = `id=${id.value}; expires=${expirationDate.toUTCString()}; path=/`;
        } else {
          document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
        // 토큰이 있으면 홈으로 이동
        window.location.href = "/";
      } else {
        alert(result.data.message);
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      alert("로그인에 실패했습니다");
    });
};
login_btn.addEventListener("click", login);
