// Header
const header = document.querySelector('header');

if(header) {
    const navLi = document.querySelectorAll('header .main-nav nav > ul > li');
    function init(winWidth) {
        if(navLi) {
            console.log(winWidth);
            if(winWidth > 991) {
                navLi.forEach((element) => {
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
                    element.addEventListener("click", function () {
                        if(this.classList.contains('rotate')) {
                            this.classList.remove('rotate');
                            const subMenuAdd = this.querySelector('.subMenu');
                            if (subMenuAdd ) subMenuAdd.classList.remove('active');
                        } else {
                            navLi.forEach((item) => {
                                item.classList.remove('rotate');
                             const subMenuWrap = item.querySelector('.subMenu');
                             if (subMenuWrap ) subMenuWrap.classList.remove('active');
                            })
                           const subMenuAdd = this.querySelector('.subMenu');
                           if (subMenuAdd ) subMenuAdd.classList.add('active');
                           this.classList.add('rotate')
                        }
                    })
                });
            }
        }
    }

    function humburger (winWidth) {
        const humBurger = document.querySelector('header .main-nav .humburger');
        humBurger.addEventListener('click', function () {
          if(winWidth < 991) {
            console.log(winWidth);
              const paraElem = this.parentElement;
              const mobileNav = paraElem.querySelector('.row');
              if(this.classList.contains('active')) {
                  this.classList.remove('active');
                  mobileNav.classList.remove('mobileHeaderShow');
              } else {
                  this.classList.add('active');
                  mobileNav.classList.add('mobileHeaderShow');
              }
          }
        })
    }


    document.addEventListener('DOMContentLoaded', function () {
        var winWidth = window.innerWidth;
        init(winWidth);
        humburger(winWidth);
        mobileNavOpen(winWidth);
    });

    // window.addEventListener('resize', function () {
    //     var winWidth = window.innerWidth;
    //     init(winWidth);
    //     humburger(winWidth);
    //     mobileNavOpen(winWidth);
    // })
      
}