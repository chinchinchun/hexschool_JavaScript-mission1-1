const txt = document.querySelector('.input input'); //input - 添加list的文字輸入區
const btn_add = document.querySelector('.btn_add'); // a連結 - 添加list按鍵
const tab = document.querySelector('.tab'); // ul - 換頁選區
const tabLi = document.querySelectorAll('.tab li'); // li - 換頁各項標籤
const list = document.querySelector('.list'); // ul - list顯示區
const clear = document.querySelector('.list_footer a'); // a連結 - 一鍵刪除已完成list按鍵
let count = document.querySelector('.list_footer p'); // p - 顯示list的項目數


//預設list內部data 【check表示是否點擊 - true 代表已完成】
let data = [{
    content: '吃早餐',
    check: false
}, {
    content: '寫作業',
    check: false
}];


//初始渲染(印出data內的資料)
function renderData() {
    let str = "";
    let num = 0;

    //判斷tab分頁active在哪(切到哪頁)
    if (tabLi[0].getAttribute('class') == 'active' && tabLi[0].textContent == '全部') {
        data.forEach((item, index) => {
            num += 1;
            str += `<li><label class="checkbox" for=""><input type="checkbox" data-num="${index}"><span class="list_txt">${item.content}</span></label><a href="#" class="delete" data-num="${index}"></a></li>`;
        });
        list.innerHTML = str; //印在網頁上
        //若物件check顯示ture給予屬性checked : 'checked'(才會顯示打勾畫線)
        data.forEach((item, index) => {
            if (item.check == true) {
                document.querySelectorAll('.checkbox input')[index].setAttribute('checked', 'checked');
            }
        });
        count.textContent = `共有 ${num} 個項目`;
    } else if (tabLi[1].getAttribute('class') == 'active' && tabLi[1].textContent == '待完成') {
        data.forEach((item, index) => {
            if (data[index].check == false) {
                num += 1;
                str += `<li><label class="checkbox" for=""><input type="checkbox" data-num="${index}"><span class="list_txt">${item.content}</span></label><a href="#" class="delete" data-num="${index}"></a></li>`;
            }
        })
        list.innerHTML = str;
        count.textContent = `共有 ${num} 個項目`;
    } else {
        data.forEach((item, index) => {
            if (data[index].check == true) {
                num += 1;
                str += `<li><label class="checkbox" for=""><input type="checkbox" data-num="${index}"><span class="list_txt">${item.content}</span></label><a href="#" class="delete" data-num="${index}"></a></li>`;
            }
        })
        list.innerHTML = str;
        //若物件check顯示ture給予屬性checked : 'checked'(才會顯示打勾畫線)
        data.forEach((item, index) => {
            if (item.check == true) {
                document.querySelectorAll('.checkbox input')[index].setAttribute('checked', 'checked');
            }
        })
        count.textContent = `共有 ${num} 個項目`;
    }
}
renderData();


//tab換頁監聽
tab.addEventListener('click', (e) => {
    if (e.target.nodeName == 'LI') {
        tabLi.forEach((item) => {
            item.removeAttribute('class');
        })
        e.target.setAttribute('class', 'active');
        renderData();
    }
})


//新增list
btn_add.addEventListener('click', (e) => {
    if (txt.value.trim() == "") {
        alert(`請輸入待辦事項！`)
        return;
    }
    e.preventDefault();
    let obj = {};
    obj.content = txt.value.trim();
    obj.check = false;
    data.push(obj);
    txt.value = "";
    // 新增資料tab頁面跳回全部
    tabLi.forEach((item) => {
        item.removeAttribute('class');
    });
    tabLi[0].setAttribute('class', 'active');
    renderData();
})


//刪除資料
list.addEventListener('click', (e) => {
    let num = e.target.getAttribute('data-num');
    if (e.target.getAttribute('class') == "delete") {
        e.preventDefault();
        data.splice(num, 1);
    }
    renderData();
});


//checkbox點選監測
list.addEventListener('click', (e) => {
    let num = e.target.getAttribute('data-num');
    if (e.target.nodeName == 'INPUT' && e.target.checked == true) {
        data[num].check = true;
        e.target.setAttribute('checked', 'checked');
    } else if(e.target.nodeName == 'INPUT' && e.target.checked == false){
        data[num].check = false;
        e.target.removeAttribute('checked');
    }else{
        return;
    }
    renderData();
});


//footer監測 - 一鍵刪除已完成項目
clear.addEventListener('click', (e) => {
    e.preventDefault();
    let finish = []; // 儲存已完成list在data中的索引值
    data.forEach((item, index) => {
        if (item.check == true) {
            finish.push(index);
        }
    })
    finish.forEach((item, index) => {
        data.splice(item - index, 1);
    })
    renderData();
})