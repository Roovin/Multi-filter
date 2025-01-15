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

const blog = document.querySelector('.blogs')
if(blog) {
    
    var obj = {
        "page": 1,
        "rows": 6,
        "visible": 2
    }

    function blogList () {
        const filterWrap = document.querySelector('.blogs .filterListWrap .filter_wrap p');
        filterWrap.addEventListener('click', function () {
            const listToggle = this.parentElement;
            const list = listToggle.querySelector('.list-wrap');
            if(list.classList.contains('active')) {
                list.classList.remove('active')
            } else {
                list.classList.add('active')
            }
        })
    }

    async function getData () {
        try {
           const response = await fetch('json/data.json');
            if (response.status != 200) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            showList(data)
            showData(data)
            filterData(data)
            clearBtn(data)
        } catch (error) {
            console.error(error.message);
        }
    }
    function showList (data) {
        const listWrap = document.querySelector('.blogs .filterListWrap .filter_wrap .list');
        const uniqueData = data.filter((obj, index, self) => 
            index === self.findIndex((t) => t.title === obj.title)
        )
        uniqueData.forEach((element) => {
            const listLi = `<li>
                                <p>${element.content_type}</p>
                            </li>`;
            listWrap.innerHTML += listLi;
        })
    }   
    function showData (data) {
        let wholeData = [];
        wholeData = data;
        
        var pageData = pagination(wholeData, obj.page, obj.rows);
        wholeData = pageData.cardData;

        if(wholeData) {
            const htmlWrap = document.querySelector('.blogs .card-wrapper');
            htmlWrap.innerHTML = '';
            wholeData.forEach((element) => {
                const card = `<div class="card">
                                <a href="/" class="emptyLink">.</a>
                                <div class="wrap">
                                    <h4>${element.title}</h4>
                                    <p>${element.content}</p>
                                </div>
                            </div>`;

                htmlWrap.innerHTML += card
            })
        }
    }

    function filterData (data) {
        const listLi = document.querySelectorAll('.blogs .filterListWrap .filter_wrap ul.list li');
        let pushdata = [];
        let wholeData = [];
        listLi.forEach((element) => {
            element.addEventListener('click', function () {
                pushdata = [];
                const liVal = this.querySelector('p').innerText;
                data.forEach((ele) => {
                    if(ele.content_type === liVal) {
                        pushdata.push(ele);
                    }
                })
                wholeData = pushdata;
                showData(wholeData)
            })
        })
    }

    function clearBtn (data) {
        const clear = document.querySelector('.blogs .filterWrapper .clear-btn ');
        if(clear) {
            clear.addEventListener('click', function () {
                showData(data);
            })
        }
    }

    function pagination (data, page, rows) {
        const paginationWrap = document.querySelector('.blogs .pagination .paginationList')
        var trimStart = (page - 1) * rows;
        var trimEnd = trimStart + rows
        var trimData = data.slice(trimStart, trimEnd)
        var totalPages = Math.ceil(data.length / rows);
        console.log(totalPages);
        let active;
        liTag = ''
        
        let beforePage = (page == 1) ? 1 : parseInt(page) - 2;
        let afterPage = parseInt(page) + 2;

        if(page > 1) {
            liTag += `<li class="page show-more prev first" value="first"><span>First</span></li> <li class="page show-more prev" value="prev"><span>Prev</span></li>`;
        }
        if (totalPages > 5) {
            if (page > 3) {
                liTag += `<li class="page dots"><span>...</span></li>`;
            }
        }

        for(let plength = beforePage; plength <= afterPage; plength++) {
        
            if(plength > totalPages) {
                continue;
            }
            if(plength == 0) {
                plength = plength + 1;
            }
            if(page == plength) {
                active = "active";
            } else {
                active = "";
            }

            liTag += `<li class="page numb ${active}" value="${plength}"><span>${plength}</span></li>`;
        }

        if(page < totalPages) {
            liTag += `<li class="page show-more next" value="next"><span>Next</span></li> <li class="page show-more next last" value="last"><span>Last</span></li>`
        }

        paginationWrap.innerHTML = liTag;

        if(totalPages <= 1) {
            paginationWrap.innerHTML = '';
        }

        pageClickHandler(data, totalPages);

        return {
            "cardData" : trimData,
            "pages" : totalPages
        }
    }

    function pageClickHandler (data, totalPages) {
        const paginationWrap = document.querySelectorAll('.blogs .pagination ul.paginationList');
        const paginationLi = document.querySelectorAll('.blogs .pagination ul.paginationList li');
        // console.log(paginationLi);
        paginationLi.forEach(element => {
            element.addEventListener('click', function () {
                // console.log(this);
                const pgValue = this.getAttribute('value');
                
                if(pgValue === 'prev') {
                    // obj.page = (parseInt((obj.page) - 1))
                    obj.page = obj.page - 1
                } else if(pgValue == 'next') {
                    // obj.page = (parseInt((obj.page) + 1))
                    obj.page = obj.page + 1
                } else if (pgValue == 'first') {
                    obj.page = 1
                } else if (pgValue == 'last') {
                    obj.page = totalPages
                } else {
                    obj.page = pgValue
                }

                paginationWrap.innerHTML = '';
                showData(data)

            })
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        blogList();
        getData();

    })
}