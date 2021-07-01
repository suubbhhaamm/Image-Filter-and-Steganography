var image = null;
var grayImage = null;
var redImage = null;
var greenImage = null;
var blueImage = null;
var rbImage = null;
var blurrImage = null;
var negImage = null;
var imgcan;
imgcan = document.getElementById("can");

function upload()
{
  var file = document.getElementById("finput");
  image = new SimpleImage(file);
  grayImage = new SimpleImage(file);
  redImage = new SimpleImage(file);
  greenImage = new SimpleImage(file);
  blueImage = new SimpleImage(file);
  rbImage = new SimpleImage(file);
  blurrImage = new SimpleImage(file);
  negImage = new SimpleImage(file);
  image.drawTo(imgcan);
}

function makeGrayscale()
{
  if (imageLoader())
    {
      for (var pixel of grayImage.values())
      {
          var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
          pixel.setRed(avg);
          pixel.setGreen(avg);
          pixel.setBlue(avg);
      }    
      grayImage.drawTo(imgcan);
    }
}

function makeNegative()
{
  if(imageLoader())
    {
      for(var pixel of negImage.values())
        {
          pixel.setRed(255 - pixel.getRed());
          pixel.setGreen(255 - pixel.getGreen());
          pixel.setBlue(255 - pixel.getBlue());
        }
      negImage.drawTo(imgcan);
    }
}

function makeRed()
{
   if (imageLoader())
    {
      for (var pixel of redImage.values())
      {
          pixel.setRed(255);
      }
      redImage.drawTo(imgcan);
    }
}

function makeGreen()
{
   if (imageLoader())
    {
      for (var pixel of greenImage.values())
      {
        pixel.setGreen(255);
      }
      greenImage.drawTo(imgcan);
    }
}

function makeBlue()
{
   if (imageLoader())
    {
      for (var pixel of blueImage.values())
      {
          pixel.setBlue(255);
      }
      blueImage.drawTo(imgcan);
    }
}

function makeRainbow()
{
  if(imageLoader())
    {
      for(var pixel of rbImage.values())
        {
          if(pixel.getX() <= rbImage.getWidth()/7)
            {
               pixel.setRed(255);
            }
          if(pixel.getX() > rbImage.getWidth()/7 && pixel.getX() <= (rbImage.getWidth()*2)/7)
            {
              pixel.setGreen(127);
              pixel.setRed(255);
            }
          
          if(pixel.getX() > (rbImage.getWidth()*2)/7 && pixel.getX() <= (rbImage.getWidth()*3)/7)
            {
              pixel.setGreen(255);
              pixel.setRed(255);
            } 
          
         if( pixel.getX() > (rbImage.getWidth()*3)/7 && pixel.getX() <= (rbImage.getWidth()*4)/7)
            {
              pixel.setGreen(255);
            } 
          
          if( pixel.getX() > (rbImage.getWidth()*4)/7 && pixel.getX() <= (rbImage.getWidth()*5)/7)
            {
              pixel.setBlue(255);
            }
          
          if(pixel.getX() > (rbImage.getWidth()*5)/7 && pixel.getX() <= (rbImage.getWidth()*6)/7)
            {
              pixel.setBlue(130);
              pixel.setRed(75);
            }
          
          if(pixel.getX() > (rbImage.getWidth()*6)/7)
          {
            pixel.setBlue(211);
            pixel.setRed(148);
          }
        }
      rbImage.drawTo(imgcan);
    }
}

function makeBlurr()
{
  if(imageLoader())
    {
      for(var pixel of blurrImage.values())
        {
          var x = pixel.getX();
          var y = pixel.getY();
          var xx;
          var yy;
          var randNum = Math.round(Math.random()*10);
          if(randNum > 5)
            {
              if(x+randNum < (blurrImage.getWidth()/5))
                xx = x+randNum;
              else
                xx = x-randNum;
              if(y+randNum < (blurrImage.getHeight()/5))
                yy = y+randNum;
              else
                yy = y-randNum;
            blurrImage.setPixel(x,y,blurrImage.getPixel(xx,yy));
            }
        }
      blurrImage.drawTo(imgcan);
    }
}
  
function resetImage()
{
   if (imageLoader())
    {
      upload();
    }
}

function imageLoader()
{
  if(image == null || !image.complete())
    {
      alert("Please upload image file first");
      return "false"; 
    }
  else
    {
      return "true";
    }
}

var image2 = null;
var image3 = null;
var imgcan2 = null;

function upload2()
{
  imgcan2 = document.getElementById("stcan1");
  var file = document.getElementById("finput2");
  image2 = new SimpleImage(file);
  image2.drawTo(imgcan2);
}

function upload3()
{
  imgcan2 = document.getElementById("stcan2");
  var file = document.getElementById("finput3");
  image3 = new SimpleImage(file);
  image3.drawTo(imgcan2);
}

function checkLoaded()
{
  if(image2 == null || !image2.complete())
    {
      alert("Please upload image to view.");
      return "false"; 
    }
  else
    {
      if(image3 == null || !image3.complete())
        {
          alert("Please upload image to hide");
          return "false";
        }
      else
        {
          return "true";
        }
    }
}

function chop2hide(img1)
{
  for(var pixel of img1.values())
  {
    pixel.setRed(Math.floor(pixel.getRed()/16) * 16);
    pixel.setGreen(Math.floor(pixel.getGreen()/16) * 16);
    pixel.setBlue(Math.floor(pixel.getBlue()/16) * 16);
   }
   return img1;
}


function shift(img2)
{
  for(var pixel of img2.values())
    {
      pixel.setRed(Math.floor(pixel.getRed()/16));
      pixel.setGreen(Math.floor(pixel.getGreen()/16));
      pixel.setBlue(Math.floor(pixel.getBlue()/16));
    }
  return img2;
}

function combineImage(img1,img2)
{
  var output = new SimpleImage(img1.getWidth(), img1.getHeight());
  for(var pixel of output.values())
    {
      var x = pixel.getX();
      var y = pixel.getY();
      var pixel1 = img1.getPixel(x,y);
      var pixel2 = img2.getPixel(x,y);
      pixel.setRed(pixel1.getRed() + pixel2.getRed());
      pixel.setGreen(pixel1.getGreen() + pixel2.getGreen());
      pixel.setBlue(pixel1.getBlue()+pixel2.getBlue());
    }
  return output;
}

function cropImage(pic, minWidth, minHeight)
{
  var outImage = new SimpleImage(minWidth, minHeight);
  for(var outPixel of outImage.values())
    {
      var x = outPixel.getX();
      var y = outPixel.getY();
      var pixel = pic.getPixel(x,y);
      outPixel.setRed(pixel.getRed());
      outPixel.setGreen(pixel.getGreen());
      outPixel.setBlue(pixel.getBlue());
    }
  return outImage;
}

function hideImage()
{
  if(checkLoaded())
  {
  var minWidth = image2.getWidth();
  var minHeight = image2.getHeight();
  if(image3.getWidth() < minWidth)
    minWidth = image3.getWidth();
  if(image3.getHeight() < minHeight)
    minHeight = image3.getHeight();
  var img1 = cropImage(image2, minWidth, minHeight);
  var img2 = cropImage(image3, minWidth, minHeight);
  img1 = chop2hide(img1);
  img2 = shift(img2);
  var output = combineImage(img1, img2);
  var imgcan3 = document.getElementById("stcan3");
  output.drawTo(imgcan3);
  }
}

var image4 = null;

function upload4()
{
  var imgcan = document.getElementById("stcan4");
  var file = document.getElementById("finput4");
  image4 = new SimpleImage(file);
  image4.drawTo(imgcan);
}

function checkForUpload()
{
  if(image4 == null || !image4.complete())
    {
      alert("No image selected to extract.");
      return "false";
    }
  else
    return "true";
}

function extractImage()
{
  var output = new SimpleImage(image4.getWidth(), image4.getHeight());
  for(var outPixel of output.values())
    {
      var x = outPixel.getX();
      var y = outPixel.getY();
      var pixel = image4.getPixel(x,y);
      outPixel.setRed(Math.floor(pixel.getRed()/16)*16);
      outPixel.setGreen(Math.floor(pixel.getGreen()/16)*16);
      outPixel.setBlue(Math.floor(pixel.getBlue()/16)*16);
    }
  return output;
}

function extractHiddenImage()
{
  var output = new SimpleImage(image4.getWidth(), image4.getHeight());
  for(var outPixel of output.values())
    {
      var x = outPixel.getX();
      var y = outPixel.getY();
      var pixel = image4.getPixel(x,y);
      outPixel.setRed(Math.floor(pixel.getRed()%16)*16);
      outPixel.setGreen(Math.floor(pixel.getGreen()%16)*16);
      outPixel.setBlue(Math.floor(pixel.getBlue()%16)*16);
    }
  return output;
}

function showImage()
{
  if(checkForUpload())
    {
      var viewImage = extractImage();
      var hiddenImage = extractHiddenImage();
      var imgcan1 = document.getElementById("stcan5");
      viewImage.drawTo(imgcan1);
      var imgcan2 = document.getElementById("stcan6");
      hiddenImage.drawTo(imgcan2);
    }
}