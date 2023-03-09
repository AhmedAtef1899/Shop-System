let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let btnCr = document.getElementById('btnCr');
let mood = 'create';
let tmp;
window.onload = () =>
{
    title.focus()
}
function getTotal()
{
    if (price != '')
    {
        result = +price.value+ +taxes.value+ +ads.value- +discount.value;
        total.innerHTML = result;
        total.style.background='green'
    }
    else
    {
        total.innerHTML = '';
        total.style.background='brown';
    }
}
let datapro;
if(localStorage.product != null)
{
    datapro = JSON.parse(localStorage.product)
}
else
{
     datapro = [];
}
btnCr.onclick = () =>
{
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value, 
    }
    if(title.value != '' && price.value != '' && count.value <= 1000)
    {
        if (mood === 'create')
        {
            if(newpro.count > 1)
            {
                for (let i=0; i<newpro.count;i++)
                {
                    datapro.push(newpro)
                }
            }
            else
            {
                datapro.push(newpro)
            }
        }
        else
        {
            datapro[tmp] = newpro;
            mood = 'create';
            btnCr.innerHTML = 'Create'
            count.style.display = 'block';
        }
        clear();
    }
    localStorage.setItem('product',JSON.stringify(datapro))
    show();
}
function clear()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
function show()
{
    let table = '';
    for (let i=0;i<datapro.length;i++)
    {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="update(${i})" id = "update"> update </button>
            <td><button onclick = "remove(${i})" id = "delete"> delete </button>
        </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let clear  = document.getElementById('clear')
    if(datapro.length > 0)
    {
        clear.innerHTML = `<button onclick="DeleteAll()" id="del">DeleteAll</button>`
    }
    else
    {
        datapro.length = '';
    }
}
show()
function remove(i)
{
   datapro.splice(i,1);
   localStorage.product = JSON.stringify(datapro)
   show()
}
function DeleteAll()
{
    localStorage.clear()
    datapro.splice(0)
    show()
    let del = document.getElementById('del')
    del.style.display = 'none'
}
function update(i)
{
     title.value = datapro[i].title;
     price.value = datapro[i].price;
     taxes.value = datapro[i].taxes;
     ads.value = datapro[i].ads;
     discount.value = datapro[i].discount;
     getTotal();
     count.style.display = 'none'
     category.value = datapro[i].category;
     btnCr.innerHTML = 'Update';
     mood = 'update';
     tmp = i;
     scroll ({
        top: 0,
        behavior: 'smooth'
     })
}
let searchMood = 'title';
function getSearch(id)
{
    let search = document.getElementById('search');
    if (id == 'searchTitle')
    {
        searchMood  = 'title'
        search.placeholder = 'Search By Title';
    }
    else
    {
        searchMood = 'category'
        search.placeholder = 'Search By Category';
    }
    search.focus()
}
function searchData(value)
{  
    let table ='';
    if (searchMood == 'title')
    {
        for (let i =0; i<datapro.length;i++)
        {
            if (datapro[i].title.toLowerCase().includes(value) ||datapro[i].category.toLowerCase().includes(value) )
            {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="update(${i})" id = "update"> update </button>
                    <td><button onclick = "remove(${i})" id = "delete"> delete </button>
                </tr>`;
            }
        }
    }
    else if (searchMood == 'category')
    {
        for (let i =0; i<datapro.length;i++)
        {
            if (datapro[i].category.toLowerCase().includes(value))
            {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="update(${i})" id = "update"> update </button>
                    <td><button onclick = "remove(${i})" id = "delete"> delete </button>
                </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
//Project By Ahmed Atef