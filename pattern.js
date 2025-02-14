const sectionWrap = document.querySelector('.patternWarp');
if(sectionWrap) {
    //Right Star Pattern
    const starPattern = sectionWrap.querySelector('.left-star-pattern');
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
        var pattern = "";
        for(var i = 1; i <= 5; i++) {
            for(var j = i; j <= 5; j++) {
                pattern += `<span>*</span>
                <span>  </span>`;
            }
            pattern += `</br>`;
        }
        revStarPattern.innerHTML = pattern;

      

    }

    //Right Star pattern
    const rightPattern = sectionWrap.querySelector('.right-pattern');
    if(rightPattern) {
        var patternR = "";
        for (var i = 0; i < 5; i++) {
            for(var j = i+1; j < 5; j++) {
                patternR += `<span class="space"> </span>`;
            }
            for(var k = 0; k <= i; k++) {
                patternR += `<span>*</span>
                            <span> </span>`;
            }
            patternR += `</br>`;
        }
        rightPattern.innerHTML = patternR
    }

    //Right Reverse Star pattern
    const rightRevPattern = sectionWrap.querySelector('.right-rev-pattern');
    if(rightRevPattern) {
        var patternR = "";
        for (var i = 0; i < 5; i++) {
            for(var j = i; j < 5; j++) {
                patternR += `<sapn> </span>
                            <span>*</span>`;
            }
            patternR += `</br>`;
            for(var k = 0; k <= i; k++) {
                patternR += `<span class="space"></span>`;
            }
           
        }
        rightRevPattern.innerHTML = patternR
    }

    //Triangle Star Pattern 
    const trianglePattern = sectionWrap.querySelector('.triangle-pattern');
    if(trianglePattern) {
        var triangle = "";
        for (var i = 0; i < 5; i++) {
            for (var j = i + 1; j < 5; j++) {
                triangle += `<span class="space"></span>`;
            }
            for (var k = 0; k <= i; k++) {
                triangle += `<span>*</span>
                <span class="space"></span>`;
            }
            for (var l = i+1; l < 5; l++) {
                triangle += `<span class="space"></span>`;
            }
            triangle += `</br>`;
        }
        trianglePattern.innerHTML = triangle 
    }

    // Reverse Triangle Pattern
    const revTrianglePattern = sectionWrap.querySelector('.rev-triangle-pattern');
    if(revTrianglePattern) {
        let revTriangle = "";
        for(var i = 0; i < 5; i++) {
            for(var j = i; j < 5; j++) {
                revTriangle += `<span>*</span>
                                    <span class="space"></span>`;
            }
            revTriangle += `</br>`;
            for(var k = 0; k <= i; k++) {
                revTriangle += `<span class="space"></span>`;
            }
        }
        revTrianglePattern.innerHTML = revTriangle
    }

    //Left Reverse Triangle Pattern
    const leftTrianglePattern = sectionWrap.querySelector('.left-triangle-pattern');
    if(leftTrianglePattern) {
        let leftTriangle = "";
        for(var i = 0; i < 5; i++) {
            for(var j = 0; j <= i; j++) {
                leftTriangle += `<span>*</span>
                                <span></span>`;
            }
            for(var k = i+1; k < 5; k++) {
                leftTriangle += `<span class="space"></span>`
            }
            leftTriangle += `</br>`;
        }
        for(var l = 0; l < 5; l++) {
            for(var h = l+1; h < 5; h++) {
                leftTriangle += `<span>*</span>
                                <span></span>`;
            }
            leftTriangle += `</br>`;
        }
        leftTrianglePattern.innerHTML = leftTriangle
    }

    //Paramid Triangle Pattern
    const paraTrianglePattern = sectionWrap.querySelector('.paramid-triangle-pattern');
    if(paraTrianglePattern) {
        let paraTriangle = ""
        for(let i = 1; i < 6; i++) {
            for(let j = i; j < 6; j++) {
                paraTriangle += `<span class="space"></span>
                <span class="space"></span>`
            }
            for(let k = 1; k <= (i*2)-1; k++) {
                paraTriangle += `
                                <span>*</span>
                                <span class="space"></span>`
            }
            paraTriangle += `</br>`;
        } 
        paraTrianglePattern.innerHTML = paraTriangle
    }

    //Right Triangle Pattern
    const rightTrianglePattern = sectionWrap.querySelector('.right-triangle-pattern');
    if(rightTrianglePattern) {
        let rightTriangle = "";
        for(let i = 0; i < 5; i++) {
            for(let j = i+1; j < 5; j++) {
                rightTriangle += `<span class="space"></span>`;
            }
            for(let k = 0; k <= i; k++) {
                rightTriangle += `<span>*</span>
                            <span></span>`;
            }
            rightTriangle += `</br>`;
        }
        for(let l = 0; l < 5; l++) {
            for(let h = 0; h <= l; h++) {
                rightTriangle += `<span class="space"></span>`;
            }
            for(let m = l+1; m < 5; m++) {
                rightTriangle += `<span>*</span>
                                <span></span>`;
            }
            rightTriangle += `</br>`;
        }

        rightTrianglePattern.innerHTML = rightTriangle

    }


    //Alphabet Star Pattern
    const alphabetPattern = sectionWrap.querySelector('.alphabet-pattern');
    if(alphabetPattern) { 
        let alpStar = "";
        // for (var i = 0; i < 7; i++) {
		// 	for (var j = 0 ; j < 5; j++) {
		// 		if (j == 0 && i != 0 || j == 4 && i != 0 || i == 0 && j != 0 && j != 4 || i == 3) {
        //             alpStar += `<span>*</span>
        //             <span></span>`;
		// 		} else {
        //             alpStar += `<span></span>`;
		// 		}
        //         alpStar += `</br>`;
		// 	}
            
		// }
        for (var i = 0; i < 7; i++) {
			for (var j = 0; j < 5; j++) {
				if (j == 0 && i != 0 ) {
                    alpStar += `<span>*</span>
                              <span></span>`;
				} else if(j == 4 && i != 0) {
                    alpStar += `<span>*</span>
                    <span></span>`;
				} else if(i == 0 && j != 0 && j != 4) {
                    alpStar += `<span>*</span>
                    <span></span>`;
                } else if(i == 3) {
                    alpStar += `<span>*</span>
                    <span></span>`;
                } else {
                    alpStar += `<span class="space"></span>`;
                }
			}
            alpStar += `</br>`;
		}
        alphabetPattern.innerHTML = alpStar;
    }
}