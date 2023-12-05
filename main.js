cocossd_status = "";
objects = [];

function setup() 
{
    canvas = createCanvas(380, 380);
    canvas.position(525, 200);
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() 
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("model_status").innerHTML = "Model Status : Detecting Objects...";
    object_name = document.getElementById("object_name").value;
    console.log(object_name);
}

function modelLoaded() 
{
    console.log("Model Loaded");
    cocossd_status = true;
}

function draw() 
{
    image(video, 0, 0, 380, 380);

    if (cocossd_status != "") 
    {
        objectDetector.detect(video, gotResult);

        r = random(255);
        g = random(255);
        b = random(255);

        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("object_status").innerHTML = "Status: An Object is Found!";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            console.log(objects[i].label);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if (objects[i].label == object_name) 
        {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name + " was detected!";
            var synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "found");
            synth.speak(utterThis); 
        }

        else
        {
            document.getElementById("object_status").innerHTML = object_name + " was not detected!";
        }
        }

        
        
    }
}

function gotResult(error, results) 
{
    if (error) 
    {
        console.log(error);
    }
        console.log(results);
        objects = results;    
    
}