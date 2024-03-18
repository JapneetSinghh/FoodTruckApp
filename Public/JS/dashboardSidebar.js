dashboardNav = document.getElementById('dashboardNav');
dashboardMain = document.getElementById('dashboardMain');
dashboardMenuBtn = document.querySelector('.dashboardMenuBtn');
closeSidebarButton = document.querySelector('#closeSidebarButton');

dashboardMenuBtn.addEventListener('click', () => {
    dashboardNav.classList.toggle('responsiveSidebar')
    dashboardMain.classList.toggle('responsiveSidebar');
})

closeSidebarButton.addEventListener('click',()=>{
    dashboardMain.classList.toggle('responsiveSidebar');
})


