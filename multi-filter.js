const multiSection = document.querySelector('.news-filter');
if(multiSection) {

    async function getData() {
        try {
            const response = await fetch('json/multiFilterData.json');
            console.log(response);
            if(response.status != 200) {
                console.log("data is not fetch");
            }
            const wholeData = await response.json();
            // console.log(wholeData);
            showData(wholeData)
        } catch (error) {
            console.error(error.message);
        }
    }

    function showData (data) {
        console.log(data);
        const cardWrap = document.querySelector('.news-filter .card-wrapper');
        // console.log(cardWrap);
        let card = [];
        data.forEach((item) => {
             card += `<div class="card">
                        <a href="#" class="emptyLink">.</a>
                        <div class="img-wrap">
                            <img src="" alt="">
                        </div>
                        <div class="content">
                            <h2>${item.title}</h2>
                            <p>${item.content}</p>
                        </div>
                    </div>`;
        })
        cardWrap.innerHTML = card;
    }

    function filterListAcet () {
        const resourceList = document.querySelector('.news-filter .multiFilter .multi-wrap .multi_filter_wrap');
        if(resourceList) {
            console.log(resourceList);
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
    })

}