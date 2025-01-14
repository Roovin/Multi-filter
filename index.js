// Header
const header = document.querySelector('header');

if(header) {
    const navLi = document.querySelectorAll('header .main-nav nav > ul > li');
    function init(winWidth) {
        if(navLi) {
            if(winWidth > 992) {
                navLi.forEach((element) => {
                    const subMenuWrap = element.querySelector('.subMenu');
                    if(subMenuWrap) {
                        subMenuWrap.style.height = ``;
                    }
                    element.addEventListener('mouseenter', function () {
                        const subMenuWrap = this.querySelector('.subMenu');
                        if(subMenuWrap) {
                            subMenuWrap.classList.add('active');
                            this.classList.add('rotate');
                        }
                    })
                    element.addEventListener('mouseleave', function () {
                        const subMenuWrap = this.querySelector('.subMenu');
                        if(subMenuWrap) {
                            subMenuWrap.classList.remove('active');
                            this.classList.remove('rotate');
                        }
                    })
                })
            } else {
                navLi.forEach((element) => {
                    const subList  = element.querySelector('.subMenu');
                    if(subList) {
                        const subUlList = subList.querySelector('ul').offsetHeight;
                        subList.style.height = `0px`;
                    }
                    element.addEventListener("click", function () {
                        if(this.classList.contains('rotate')) {
                            this.classList.remove('rotate');
                            const subMenuAdd = this.querySelector('.subMenu');
                            if (subMenuAdd ) subMenuAdd.classList.remove('active');
                                subMenuAdd.style.height = `0px`
                        } else {
                            navLi.forEach((item) => {
                                item.classList.remove('rotate');
                             const subMenuWrap = item.querySelector('.subMenu');

                             if (subMenuWrap ) {
                                 subMenuWrap.classList.remove('active'); 
                                 subMenuWrap.style.height = `0px`;
                             }
                            })
                            const subMenuAdd = this.querySelector('.subMenu');
                           
                           if (subMenuAdd ) subMenuAdd.classList.add('active');
                           this.classList.add('rotate')
                           const listHeight = subMenuAdd.querySelector('ul').offsetHeight;
                            subMenuAdd.style.height = `${listHeight}px`
                        }
                    })
                });
            }
        }
    }

    function humburger() {
        const humBurger = document.querySelector('header .main-nav .humburger');
        if(humBurger) {
            humBurger.addEventListener('click', function () {
                    const paraElem = this.parentElement;
                    const mobileNav = paraElem.querySelector('.row');
                    const searchBox = document.querySelector('header .search-box-wrap');
                    if(this.classList.contains('active')) {
                        this.classList.remove('active');
                        mobileNav.classList.remove('mobileHeaderShow');
                    } else {
                        if(searchBox.classList.contains('show-search')) {
                            searchBox.classList.remove('show-search');
                            searchBox.style.top = '-100%';
                        }
                        this.classList.add('active');
                        mobileNav.classList.add('mobileHeaderShow');
                    }
            })
        }
    }

    function searchBoxfacet (winWidth) {
        // Desktop Search box open
        const searchWrap = document.querySelector('header .main-nav .top-nav .search-wrap');
        const searchBox = document.querySelector('header .search-box-wrap');
        const crossBtn = document.querySelector('header .search-box-wrap .cross-btn');
        const humBurger = document.querySelector('header .main-nav .humburger');
        if(winWidth > 991) {
            if(searchWrap) {
                searchWrap.addEventListener('click', function () {
                    const headrHeight = header.offsetHeight;
                    searchBox.style.top = `${headrHeight}px`;
                    searchBox.classList.add('show-search');
                })
                crossBtn.addEventListener('click', function () {
                    searchBox.style.top = '-100%';
                    searchBox.classList.remove('show-search');
                })
            } 
        } else {
            // Mobile Search box open
            const searchMobileWrap = document.querySelector('header .main-nav .mobileSearch');
            const paraElem = searchMobileWrap.parentElement;
            const mobileNav = paraElem.querySelector('.row');
            if(searchMobileWrap) {
                searchMobileWrap.addEventListener('click', function () {
                    if(humBurger.classList.contains('active')) {
                        humBurger.classList.remove('active');
                        mobileNav.classList.remove('mobileHeaderShow');
                    }
                    const headrHeight = header.offsetHeight;
                    searchBox.style.top = `${headrHeight}px`;
                    searchBox.classList.add('show-search');
                })
                crossBtn.addEventListener('click', function () {
                    searchBox.style.top = '-100%';
                    searchBox.classList.remove('show-search');
                })
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var winWidth = window.innerWidth;
        init(winWidth);
        humburger(winWidth);
        searchBoxfacet(winWidth);
    });

    window.addEventListener('resize', function () {
        var winWidth = window.innerWidth;
        init(winWidth);
        humburger();
        searchBoxfacet(winWidth);
        // mobileNavOpen(winWidth);
        const humBurger = document.querySelector('header .main-nav .humburger');
    
    })
      
}