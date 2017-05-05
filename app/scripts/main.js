var mainContainer;
var minShapes = 10;
var maxShapes = 50;
var minSize = 10;
var maxSize = 150;
var spaceTextures = ['images/space_texture_one.png', 'images/space_texture_two.png', 'images/space_texture_three.png', 'images/space_texture_four.png', 'images/space_texture_five.png'];

function init() {
  mainContainer = document.querySelector('main');

  $.getJSON('../content.json', function(data) {
    $.each(data.sections, function(i, sectionData) {
      var newSection = document.createElement('section');
      newSection.id = 'section-' + i;
      newSection.classList.add('parallax-section');
      mainContainer.appendChild(newSection);

      var ranShapeNum = minShapes + Math.round(Math.random() * maxShapes);
      var shapeContainer = document.createElement('div');
      shapeContainer.classList.add('shape-container');
      newSection.appendChild(shapeContainer);

      for(var s = 0 ; s < ranShapeNum; s++) {
        var newShape = document.createElement('div');
        newShape.classList.add('shape');
        var ranSize = minSize + Math.random() * maxSize;
        var ranX = -300 + Math.random() * window.innerWidth + 300;
        var ranY = -600 + Math.random() * 1200;
        TweenMax.set(newShape, {x:ranX, y:ranY, width:ranSize, height:ranSize, backgroundColor:tinycolor.random().toHexString()});

        newShape.setAttribute('data-top-bottom', 'background-image:linear-gradient(0deg,' + tinycolor.random().toHslString() + ',' + tinycolor.random().toHslString() + ');' + 'top:' + ranY + 'px;');
        newShape.setAttribute('data-bottom-top', 'background-image:linear-gradient(' + Math.round(-360 + Math.random()* 720) + 'deg,' + tinycolor.random().toHslString() + ',' + tinycolor.random().toHslString() + ');' + 'top:' + Math.random() * 600 + 'px;');
        // var ranID = 'shape-' + Math.round(Math.random()*100000000000);
        // console.log(ranID);
        // newShape.id = ranID;
        // newShape.setAttribute('data-anchor-target', ranID);

        shapeContainer.appendChild(newShape);
      }

      TweenMax.set(newSection, {backgroundColor:tinycolor.random().toHexString()});

      var contentContainer = document.createElement('div');
      contentContainer.classList.add('container');
      newSection.appendChild(contentContainer);

      var contentRow = document.createElement('div');
      contentRow.classList.add('row');
      contentContainer.appendChild(contentRow);

      var contentColumn = document.createElement('div');
      contentColumn.classList.add('col-sm-12', 'content-block');
      contentRow.appendChild(contentColumn);

      var sectionHeader = document.createElement('h3');
      sectionHeader.innerHTML = sectionData.title;
      contentColumn.appendChild(sectionHeader);

      var sectionBody = document.createElement('div');
      sectionBody.innerHTML = sectionData.body;
      sectionBody.classList.add('section-body');
      contentColumn.appendChild(sectionBody);

      if(sectionData.cta) {
        var sectionCTA = document.createElement('div');
        sectionCTA.classList.add('section-cta');
        sectionCTA.innerHTML = sectionData.cta;
        contentColumn.appendChild(sectionCTA);
      }

      var ranDeg = Math.round(Math.random()*360) + 'deg,';
      var ranSpace = Math.random() * 10;
      if(ranSpace > 5) {
        var ranBackground = Math.floor(Math.random()*spaceTextures.length);
        newSection.setAttribute('data-center', 'background-position: 50% 0px;');

        newSection.setAttribute('data-top-bottom', 'background-image: url(' + spaceTextures[ranBackground] + '), linear-gradient(' + ranDeg + tinycolor.random().toHslString() + ',' + tinycolor.random().toHslString() + '); background-position: 50% -200px;');

        newSection.setAttribute('data-bottom-top', 'background-image: url(' + spaceTextures[ranBackground] + '), linear-gradient(' + ranDeg + tinycolor.random().toHslString() + ',' + tinycolor.random().toHslString() + '); background-position: 50% 200px;');

        newSection.setAttribute('data-anchor-target', '#section-' + i);
      } else {
        newSection.setAttribute('data-top-bottom', 'background-image:linear-gradient(' + ranDeg + tinycolor.random().toHslString() + ',' + tinycolor.random().toHslString() + ');');

        newSection.setAttribute('data-bottom-top', 'background-image:linear-gradient(' + ranDeg + tinycolor.random().toHslString() + ',' + tinycolor.random().toHslString() + ');');
      }
    });

    var s = skrollr.init({
         forceHeight: false
     });
  });
}

window.addEventListener('load', init);
