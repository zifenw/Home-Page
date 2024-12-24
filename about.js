const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')

    closeAllSubMenus()
}

function toggleSubMenu(button){
    // Check if the screen width is 800px or less
    //const isSmallScreen = window.matchMedia("(max-width: 800px)").matches;

    // if(isSmallScreen && !button.nextElementSibling.classList.contains('show')){
    //     closeAllSubMenus()
    // }

    
    if(!button.nextElementSibling.classList.contains('show')){
        closeAllSubMenus()
    }

    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')

    if(sidebar.classList.contains('close')){
        sidebar.classList.toggle('close')
        toggleButton.classList.toggle('rotate')
    }
}




function closeAllSubMenus(){
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show')
        ul.previousElementSibling.classList.remove('rotate')
    })

}


function saveMenuState() {
    const menuState = Array.from(sidebar.querySelectorAll('.sub-menu'))
        .map(menu => menu.classList.contains('show'));
    localStorage.setItem('menuState', JSON.stringify(menuState));
}

function restoreMenuState() {
    const savedState = JSON.parse(localStorage.getItem('menuState') || '[]');
    const subMenus = sidebar.querySelectorAll('.sub-menu');
    savedState.forEach((isOpen, index) => {
        if (isOpen && subMenus[index]) {
            subMenus[index].classList.add('show');
            subMenus[index].previousElementSibling.classList.add('rotate');
        }
    });
}

window.addEventListener('beforeunload', saveMenuState);
document.addEventListener('DOMContentLoaded', restoreMenuState);






function setActive(element) {
    // 获取所有的 <li> 中的 <a>
    const links = document.querySelectorAll('.sub-menu a');

    // 移除所有链接的 active 状态
    links.forEach(link => {
        link.parentElement.classList.remove('active');
    });

   // 给当前点击的 <a> 的父级 <li> 添加 active 状态
   element.parentElement.classList.add('active');

   // 保存当前点击的 href 到 localStorage
   const href = element.getAttribute('href');
   localStorage.setItem('activeLink', href);
}

function restoreActive() {
    // 从 localStorage 中获取上一次点击的链接
    const activeLink = localStorage.getItem('activeLink');

    if (activeLink) {
        // 查找对应的链接元素
        const activeElement = document.querySelector(`a[href="${activeLink}"]`);

        if (activeElement) {
            // 设置为 active 状态
            activeElement.parentElement.classList.add('active');
        }
    }
}
function removeActive() {
    // 检查当前 URL 是否与 .sub-menu 的链接匹配
    const links = document.querySelectorAll('.sub-menu a');
    const currentUrl = window.location.href;
    let isMatch = false;

    links.forEach(link => {
        if (link.href === currentUrl) {
            isMatch = true;
        }
    });

    if (!isMatch) {
        // 如果没有匹配项，则移除所有链接的 active 状态
        links.forEach(link => {
            link.parentElement.classList.remove('active');
        });
    }
}


document.addEventListener('DOMContentLoaded', restoreActive);
document.addEventListener('DOMContentLoaded', removeActive);

