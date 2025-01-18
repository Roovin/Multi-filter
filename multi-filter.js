const multiSection = document.querySelector('.news-filter');
if(multiSection) {

    var obj = {
        "page": 1,
        "rows": 9,
        "visible": 2
    }
    let selectedList = [];
    async function getData() {
        try {
            const response = await fetch('json/multiFilterData.json');
            if(response.status != 200) {
                console.log("data is not fetch");
            }
            const wholeData = await response.json();
            showData(wholeData)
            showList(wholeData);
            filterData(wholeData);
        } catch (error) {
            console.error(error.message);
        }
    }

    function showData (data) {
        const cardWrap = document.querySelector('.news-filter .card-wrapper');
        let wholeData = []
        const responsePage = pagination(data, obj.page, obj.rows);
        wholeData = responsePage.newsdata;
        
        let card = [];
        wholeData.forEach((item) => {
             card += `<div class="card">
                        <a href="#" class="emptyLink">.</a>
                        <div class="img-wrap">
                            <img src="${item.img}" alt="${item.alt}">
                        </div>
                        <div class="content">
                            <h2>${item.title}</h2>
                            <p>${item.content}</p>
                        </div>
                    </div>`;
        })
        cardWrap.innerHTML = card;
    }

    function filterData (data) {
        const list = document.querySelectorAll('.news-filter .multiFilter .list-wrap ul.list li input');
        let filtered = [];
        list.forEach((item) => {
            item.addEventListener('click', function () {
                const liValue = this.value;
                if(this.classList.contains('active')) {
                    this.classList.remove('active');
                    selectedList = selectedList.filter(item => item !== liValue)
                    filtered = [];
                    if(selectedList.length > 0) {
                        data.forEach((item) => {
                            selectedList.forEach((removeList) => {
                                if(item.content_type === removeList) {
                                    filtered.push(item);
                                }
                            })
                        })
                        selectedListShow(selectedList)
                        showData(filtered);
                    } else {
                        selectedListShow(selectedList)
                        showData(data);
                    }
                } else {
                    this.classList.add('active')
                    selectedList.push(liValue);
                    console.log(this.checked);
                    filtered = [];
                    data.forEach((item) => {
                        selectedList.forEach((seleList) => {
                            if(item.content_type === seleList) {
                                filtered.push(item);
                            }
                        })
                    })
                    selectedListShow(selectedList)
                    showData(filtered);
                }
            })
        })
        
    }
    // clearFacet(data, filtered, selectedList)
    // function clearFacet(data, filtered, selectedList) {
    //     console.log(data);
    // }

    function selectedListShow(selectedList) {
        const selectedWrap = document.querySelector('.news-filter .selectedWrap ul');
        let selectedHtml = '';
        selectedList.forEach((item) => {
            selectedHtml += ` <li>
                            <div class="selected-item">
                                <p>${item}</p>
                                <div class="cross-icon"></div>
                            </div>
                        </li>`;
        })
        
        selectedWrap.innerHTML = selectedHtml;
        crossSelected(selectedList);
    }
  
    function crossSelected (selectedList) {
        const list = document.querySelectorAll('.news-filter .multiFilter .list-wrap ul.list li input');
        const selectedWrapLi = document.querySelectorAll('.news-filter .selectedWrap ul li');
        const selectedWrap = document.querySelector('.news-filter .selectedWrap ul');
        selectedWrapLi.forEach((item) => {
            item.addEventListener('click', function () {
                const selValue = this.querySelector('.selected-item p').innerText;
                list.forEach((inputItem) => {
                    const inVlaue = inputItem.value;
                        if(inVlaue === selValue) {
                            selectedList = selectedList.filter(selItem => selItem !== selValue);

                            inputItem.click(); //click trigger
                        }
                })
                selectedListShow(selectedList)
            })
        })
    }

    function showList(data) {
        const listWrap = document.querySelector('.news-filter .multiFilter .multi-wrap .multi_filter_wrap ul.list');
       const uniqueData = data.filter((item, index, self) => index === self.findIndex((t) => t.title === item.title))
        let liList = '';
        uniqueData.forEach((item) => {
            liList += `<li>
                        <div class="item">
                            <label for="${item.id}">
                                <input type="checkbox" value="${item.content_type}" id="${item.id}">
                                ${item.content_type}
                            </label>
                        </div>
                    </li>`;
        })
        listWrap.innerHTML = liList;
    }


    function clearFacet() {
        
    }

    function pagination (data, page, rows) {
        const paginationWrap = document.querySelector('.news-filter .pagination .paginationList');
        var trimStart = (page - 1) * rows;
        var trimEnd = trimStart + rows;
        var trimData = data.slice(trimStart, trimEnd);
        var totalPages = Math.ceil(data.length / rows);
        
        let active;
        liTag = '';

        let beforePage = (page === 1) ? 1 : page - 1;
        let afterPage = (page + 2)

        if(page > 1) {
            liTag += `<li class="page show-more prev first" value="prev"><span><</span></li>`;
        }
        if(totalPages < 4) {
            if(page > 2) {
                liTag += `<li class="page dots"><span>...</span></li>`;
            }
        }
        for (let plength = beforePage; plength <= afterPage; plength++) {
            if(plength > totalPages) {
                continue;
            }
            if(plength == 0) {
                plength = plength + 1
            }
            if(page == plength) {
                active = 'active';
            } else {
                active = '';
            }

            liTag += `<li class="page show-more ${active}" value="${plength}"><span>${plength}</span></li>`;

        }

        if(page < totalPages) {
            liTag += `<li class="page show-more next" value="next"><span>></span></li>`
        }

        paginationWrap.innerHTML = liTag;

        if(totalPages <= 1) {
            paginationWrap.innerHTML = '';
        }

        pageClickHandler(data, totalPages)

        return {
            "newsdata": trimData,
            "page": totalPages
        }

    }

    function pageClickHandler (data, totalPages) {
        const list = document.querySelectorAll('.news-filter .pagination .paginationList li');
        const pagination = document.querySelector('.news-filter .pagination ul.paginationList')
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            element.addEventListener('click', function () {

                const pgValue = this.getAttribute('value'); 

                if(pgValue == 'prev') {
                    obj.page = obj.page - 1;
                } else if (pgValue == 'next') {
                    obj.page = obj.page + 1;
                } else if(pgValue == 'first') {
                    obj.page = 1;
                } else if(pgValue == 'last') {
                    obj.page = totalPages;
                } else {
                    obj.page = pgValue;
                }

                pagination.innerHTML = '';
                showData(data)

            })
        }
    }

    function filterListAcet () {
        const resourceList = document.querySelector('.news-filter .multiFilter .multi-wrap .multi_filter_wrap');
        if(resourceList) {
            resourceList.addEventListener('click', function () {
                const list = this.querySelector('.list-wrap');
                if(list.classList.contains('active')) {
                    list.classList.remove('active');
                } else {
                    list.classList.add('active');
                }
                    
            });
        }
    }


    document.addEventListener('DOMContentLoaded', function () {
        getData();
        filterListAcet();
        crossSelected(selectedList);
    
    })

}