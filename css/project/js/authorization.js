


const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('login');
localStorage.setItem('login', myParam)

if (!myParam){
    location.href = "http://localhost:5500";
}