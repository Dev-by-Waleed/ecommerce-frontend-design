//fav any product
const fav = document.getElementsByClassName('favourite')
for (let i = 0; i <= 13; i++) {
    fav[i].addEventListener('click', () => {
        fav[i].innerHTML = '<i class="fa-solid fa-heart"></i>'
    });
};

// to GRID
document.getElementById('gridBtn').addEventListener('click', () => {
    document.getElementById('Content-A').style.display= 'none';
    document.getElementById('Content-G').style.display= 'block'
    document.getElementById('gridBtn').style.backgroundColor= '#EFF2F4'
        document.getElementById('pageBtn').style.backgroundColor= 'inherit'
})
// to PAGE
document.getElementById('pageBtn').addEventListener('click', () => {
    document.getElementById('Content-G').style.display= 'none';
    document.getElementById('Content-A').style.display= 'block'
    document.getElementById('pageBtn').style.backgroundColor= '#EFF2F4'
    document.getElementById('gridBtn').style.backgroundColor= 'inherit'
})