const sectionWrap = document.querySelector('.patternWarp');
if(sectionWrap) {
    //Right Star Pattern
    const starPattern = sectionWrap.querySelector('.right-star-pattern');
    if(starPattern) {
        let pattern = ""; 
        for(var i = 1; i <= 5; i++) {
            pattern += `<span>  </span>`
            for(var j = 1; j <= i; j++) {
                pattern +=`<span>*</span>
                 <span>  </span>`
            }
            pattern += `</br>`
        }
        starPattern.innerHTML = pattern
    }

    //Reverse Right Star Pattern
    const revStarPattern = sectionWrap.querySelector('.reverse-right-pattern');
    if(revStarPattern) {
        let pattern = "";
        for(var i = 1; i <= 5; i++) {
            pattern =+ `<span>  </span>`;
            for(var j = i; j < 5; j++) {
                pattern += `<span>*</span>
                <span> </span>`;
            }
            pattern += `</br>`;
        }
        revStarPattern.innerHTML = pattern
    }

}