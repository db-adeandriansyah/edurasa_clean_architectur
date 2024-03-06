
export function ProsesBar(i=0) {
    let stopProses,id,elem;
    if (i == 0) {
        i = 1;
        elem = document.querySelector('.prog-animation');
        elem.classList.remove('d-none');
        let width = 1;
        id = setInterval(frame, 10);
        function frame() {
            if (width >= 1000000000) {
                i = 0;
                finishProsesBar();
            } else {
                width++;
                elem.value = width/10;//+ "%";
            }
        }
        function finishProsesBar(){
            clearInterval(id);
            elem.value = 100;
            setTimeout(function(){
                elem.classList.add('d-none')
            },500)
        }
    }
    Object.defineProperty(this,'stopProses',{
        get:function(){
            // return finishProsesBar();//stopProses;
            clearInterval(id);
            elem.value = 100;
            setTimeout(function(){
                elem.classList.add('d-none')
            },500)
        }
    })
}