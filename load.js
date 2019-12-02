/*
    var load = new chzDropDown();
    load.init({
        loadHeight: '100',
        box: '.box1',
        'chzEnd': function(){
            getData();
        }
    })
*/

window.chzDropDown = (function() {
    var MobileLoad = function() {
        this.loadHeight,
        this.chzEnd = this.chzEnd
    }
    MobileLoad.prototype = {
        init: function(params){
            this.params = params;
            this.loadHeight = params.loadHeight;
            this.chzEnd = params.chzEnd;
            this.chzContent = document.querySelector(params.box);
            this.chzIcon = document.querySelector('.chzIcon');
            this.startY = null;   //下拉开始的位置
            this.bindEvent();
        },
        bindEvent: function(){
            var _self = this;
            document.body.addEventListener('touchstart', function(e){
                _self.startY = e.targetTouches[0].clientY;
            });
            document.body.addEventListener('touchmove', function(ev){
                var moveY = parseInt(ev.targetTouches[0].clientY - _self.startY);   //下拉的距离
                if(moveY >= _self.loadHeight){
                    moveY = _self.loadHeight;
                    _self.chzIcon.style.display='block';
                    _self.chzIcon.style.top = moveY/2+'px';
                }else{
                    moveY = moveY;
                };
                _self.chzContent.style.transform = 'translate3d(0px, '+moveY+'px, 0px)';
            });
            document.body.addEventListener('touchend', function(ev){
                //下拉结束的位置
                var endY = parseInt(ev.changedTouches[0].clientY - _self.startY);
              //  if(!endY)return false;
                if(endY > _self.loadHeight){
                    //作为接口的请求
                    _self.chzEnd();
                };
               setTimeout(() => {
                    _self.chzIcon.style.top = '0px';
                    _self.chzIcon.style.display='none';
                    _self.chzContent.style.transform = 'translate3d(0px, 0px, 0px)';
               }, 1000);
            });
        }
    };
    return MobileLoad;
})();