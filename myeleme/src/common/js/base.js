export default function(){
    var ww=window.innerWidth;
	var width=ww>750?750:ww;
	document.querySelector("html").style.fontSize=width/7.5+"px";
}