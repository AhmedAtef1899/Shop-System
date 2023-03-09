let btn = document.getElementById('btn')
let pass = document.getElementById ('pass')
let user = document.getElementById ('user')
let box = document.querySelector ('.box')
btn.onclick = () =>
{
    let data = {
        user: user.value,
        pass: pass.value,
        btn: btn.innerHTML,
    }
    if (user.value == 'ahmed' && pass.value == 123456)
    {
        box.innerHTML = '<a class = "inp" href = "Ahmed.html">Input</a>';
    }
    else
    {
        alert('Wrong')
    }
}
window.onload = ()=>
{
    user.focus()
}