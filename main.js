prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
 });
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture"src="'+data_uri+'"/>';

    });
}
console.log("ml5 version:","ml5.version");
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-rG28WgeD/model.json',modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function speak() {
var synth=window.speechSynthesis;
speak_data1="Prediction is"+prediction1;
speak_data2="Prediction is"+prediction2;
var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utterThis);
}
function check(){
    img=document.getElementById("capture");
    classifier.classify(img,gotResults);
}
function gotResults(error,results){
    if(error){
        console.error(error);
        return;
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label == "best"){
            document.getElementById("update_emoji1").innerHTML="👍";
        }
        if(results[0].label == "amazing"){
            document.getElementById("update_emoji1").innerHTML="👌";
        }
        if(results[0].label == "victory"){
            document.getElementById("update_emoji1").innerHTML="✌";
        }
///////////////////////////////////////////////////
if(results[1].label == "best"){
    document.getElementById("update_emoji2").innerHTML="👍";
}
if(results[1].label == "amazing"){
    document.getElementById("update_emoji2").innerHTML="👌";
}
if(results[1].label == "victory"){
    document.getElementById("update_emoji2").innerHTML="✌";
}
        
    }

}