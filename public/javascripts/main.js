window.addEventListener("load",()=>{
    const fileInput=document.querySelector('input[type="file"]');
    fileInput.addEventListener("change",()=>{
	document.querySelector("form").submit();
    })
});
