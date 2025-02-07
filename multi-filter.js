const multiSection = document.querySelector('.news-filter');
if(multiSection) {

    const clearBtnShow = document.querySelector('.news-filter .multiFilter .clear-btn ');
    var obj = {
        "page": 1,
        "rows": 9,
        "visible": 2
    }
    let selectedList = [];
    let wholeData = [];
    let filtered = [];
    async function getData() {
        try {
            const response = await fetch('json/multiFilterData.json');
            if(response.status != 200) {
                console.log("data is not fetch");
            }
            wholeData = await response.json();
            showData(wholeData)
            showList(wholeData);
            filterData(wholeData, selectedList);
            searchFacet(wholeData);
        } catch (error) {
            console.error(error.message);
        }
    }



    function clearFacet(data, filtered, selectedList) {

        const clearBtn = document.querySelector('.news-filter .multiFilter .clear-btn p');
        const Relist = document.querySelectorAll('.news-filter .multiFilter .multi_filter_wrap.resource .list-wrap ul.list li input');
        const SoList = document.querySelectorAll('.news-filter .multiFilter .multi_filter_wrap.solution .list-wrap ul.list li input');

        clearBtn.addEventListener('click', function () {
            filtered = [];
            data = wholeData;
            selectedList = [];
            Relist.forEach((item) => {
               item.classList.remove('active');
               item.checked = false
            })
            SoList.forEach((soItem) => {
                soItem.classList.remove('active');
                soItem.checked = false
            })

            clearBtnShow.style.display = 'none'
            showData(data)
            selectedListShow(selectedList);
            filterData(data, selectedList);
        })
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

    function filterData (data, selectedList) {
        const list = document.querySelectorAll('.news-filter .multiFilter .list-wrap ul.list li input');
        // const Relist = document.querySelectorAll('.news-filter .multiFilter .resource .list-wrap ul.list li input');
        // const SoList = document.querySelectorAll('.news-filter .multiFilter .solution .list-wrap ul.list li input');
        if(list.length > 0) {
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
                                    if(item.content_type === removeList || item.solution_type === removeList) {
                                        filtered.push(item);
                                    }
                                })
                            })
                            selectedListShow(selectedList)
                            showData(filtered);
                            clearFacet(data, filtered, selectedList)
                        } else {
                            selectedListShow(selectedList)
                            showData(data);
                            clearFacet(data, filtered, selectedList)
                        }
                    } else {
                        this.classList.add('active')
                        selectedList.push(liValue);
                        filtered = [];
                        data.forEach((item) => {
                            selectedList.forEach((seleList) => {
                                if(item.content_type === seleList || item.solution_type === seleList) {
                                    filtered.push(item);
                                }
                            })
                        })
                        filtered = filtered.filter((filItem, index, self) => index === self.findIndex((t) => t.id === filItem.id))
                        selectedListShow(selectedList)
                        showData(filtered);
                        clearFacet(data, filtered, selectedList)
                    }
                })
            })
        }
        // if (SoList.length > 0) {
        //     SoList.forEach((item) => {
        //         item.addEventListener('click', function () {
        //             console.log(this);
        //             const soListValue = this.value;
        //             if(this.classList.contains('active')) {
        //                 this.classList.remove('active');
        //                 selectedList = selectedList.filter((item) => item != soListValue);
        //                 filtered = [];
        //                 if(selectedList.length > 0) {
        //                     data.forEach((item) => {
        //                         selectedList.forEach((selectItem) => {
        //                             if(item.solution_type === selectItem || item.content_type === selectItem) {
        //                                 filtered.push(soListValue);
        //                             }
        //                         })
        //                     })
        //                 }
        //                 selectedListShow(selectedList)
        //                 showData(filtered);
        //                 clearFacet(data, filtered, selectedList)
        //             } else {
        //                 this.classList.add('active');
        //                 filtered = [];
        //                 selectedList.push(soListValue);
        //                 data.forEach((item) => {
        //                     selectedList.forEach((selectItem) => {
        //                         if(item.solution_type === selectItem || item.content_type === selectItem) {
        //                             filtered.push(item);
        //                         }
        //                     })
        //                 })
        //                 const uniqueData = filtered.filter((itemdata, index, self) => index === self.findIndex((t) => t.id === itemdata.id))
        //                 filtered = uniqueData;
        //                 selectedListShow(selectedList)
        //                 showData(filtered);
        //                 clearFacet(data, filtered, selectedList)
                        
        //             }
        //         })
        //     })
        // }
    }

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
        if(selectedList.length > 0) {
            clearBtnShow.style.display = 'block'
        }
        selectedWrap.innerHTML = selectedHtml;
        crossSelected(selectedList);
    }
  
    function crossSelected (selectedList) {
        const Relist = document.querySelectorAll('.news-filter .multiFilter .resource .list-wrap ul.list li input');
        const Solist = document.querySelectorAll('.news-filter .multiFilter .solution .list-wrap ul.list li input');
        const list = document.querySelectorAll('.news-filter .multiFilter .list-wrap ul.list li input');
        const selectedWrapLi = document.querySelectorAll('.news-filter .selectedWrap ul li');
        const selectedWrap = document.querySelector('.news-filter .selectedWrap ul');
        selectedWrapLi.forEach((item) => {
            item.addEventListener('click', function () {
                const selValue = this.querySelector('.selected-item p').innerText;
                if(list) {
                    list.forEach((inputItem) => {
                        const inVlaue = inputItem.value;
                            if(inVlaue === selValue) {
                                selectedList = selectedList.filter(selItem => selItem !== selValue);
    
                                inputItem.click(); //click trigger
                            }
                    })
                }
                // if(Solist) {
                //     Solist.forEach((inputItem) => {
                //         const inVlaue = inputItem.value;
                //             if(inVlaue === selValue) {
                //                 selectedList = selectedList.filter(selItem => selItem !== selValue);
    
                //                 inputItem.click(); //click trigger
                //             }
                //     })
                // }
                console.log(selectedList);
                selectedListShow(selectedList)
            })
        })
    }

    function showList(data) {
        const listWrap = document.querySelector('.news-filter .multiFilter .multi-wrap .multi_filter_wrap ul.list');
        const listWrapSolution = document.querySelector('.news-filter .multiFilter .multi-wrap .multi_filter_wrap.solution ul.list');
        const resourceUniqueData = data.filter((item, index, self) => index === self.findIndex((t) => t.content_type === item.content_type))
        const solutionUniqueData = data.filter((card, index, self) => index == self.findIndex((t) => t.solution_type === card.solution_type))
        let reLiList = '';
        let solLiList = '';
        resourceUniqueData.forEach((item) => {
            reLiList += `<li>
                        <div class="item">
                            <label for="re-${item.id}">
                                <input type="checkbox" value="${item.content_type}" id="re-${item.id}">
                                ${item.content_type}
                            </label>
                        </div>
                    </li>`;
        })
        solutionUniqueData.forEach((item) => {
            solLiList += `<li>
                <div class="item">
                    <label for="so-${item.id}">
                        <input type="checkbox" value="${item.solution_type}" id="so-${item.id}">
                        ${item.solution_type}
                    </label>
                </div>
            </li>`;
        })
        listWrap.innerHTML = reLiList;
        listWrapSolution.innerHTML = solLiList;

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
        const resourceList = document.querySelectorAll('.news-filter .multiFilter .multi-wrap .multi_filter_wrap');
        if(resourceList) {
            resourceList.forEach((item) => {
                item.addEventListener('click', function () {
                    const list = this.querySelector('.list-wrap');
                    const arrow = this.querySelector('.arrow');
                    if(list.classList.contains('active')) {
                        list.classList.remove('active');
                        arrow.classList.remove('rotate')
                    } else {
                        resourceList.forEach((items) => {
                            const listWrap = items.querySelector('.list-wrap');
                            const listArrow = items.querySelector('.arrow');
                            listWrap.classList.remove('active')
                            listArrow.classList.remove('rotate');
                        })
                        list.classList.add('active');
                        arrow.classList.add('rotate');
                    }
                });
            })
        }
    }

    function searchFacet(data) {
        console.log(data);
        const searchInput = document.querySelector('.news-filter .multiFilter .searchWrap form input');
        searchInput.addEventListener('keyup', function () {
            console.log(this);
        })
    }


    document.addEventListener('DOMContentLoaded', function () {
        getData();
        filterListAcet();
        crossSelected(selectedList);
        
        clearBtnShow.style.display = 'none';
    
    })


    document.addEventListener('click', function (e) {
        const filterWrap = document.querySelectorAll('.news-filter .multiFilter .multi-wrap .multi_filter_wrap p');
        const filterWrapper = document.querySelectorAll('.news-filter .multiFilter .multi-wrap .multi_filter_wrap');
        filterWrap.forEach((item) => {
            if(e.target !== item) {
                // filterWrapper.querySelectors
                filterWrapper.forEach((filterItem) => {
                    let listWrap = filterItem.querySelector('.list-wrap');
                    let arrow = filterItem.querySelector('.arrow');
                    // console.log(listWrap);
                })
                // console.log(listWrap);
                // console.log(arrow);
                // listWrap.classList.remove('active');
                // arrow.classList.remove('rotate');
            }
        })
        // if(e.target === )
    })

}