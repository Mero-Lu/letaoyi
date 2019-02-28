
$(function(){

    // 先从localStorage里面获取数据
    function getHistory(){
        var jsonstr = localStorage.getItem('search_list') || '[]';
        var arr = JSON.parse(jsonstr);
        return arr;
    }
    render();
    function render(){
        var arr = getHistory();
        var htmlstr = template('searchTpl',{arr:arr});
        $('.lt_history').html(htmlstr);
        // console.log(arr);
    }

    // 清空历史记录
    $('.lt_history').on('click','.btn_empty',function(){
        // 参数1: message 内容
        // 参数2: title   标题
        // 参数3: btnArr  按钮文本数组
        // 参数4: callback 按钮点击的回调函数
        mui.confirm('你确定要清空么?','温馨提示',['取消','确定'],function(e){
            // console.log(e);
            if(e.index == 1) {
                localStorage.removeItem('search_list');
                render();
            }
        })
    })

    // 点击单个按钮删除
    $('.lt_history').on('click','.btn_delete',function(){
        // 获取储存的下标
        var index = $(this).data('index');
        var arr = getHistory();
        arr.splice(index,1);
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();
    })

    // 添加单个历史功能
    $('.search_btn').on('click',function(e){
        // console.log(11)
        var txt = $('.search_input').val().trim();
        if(txt == ''){
            // mui提示框
            mui.toast('请输入搜索关键字');
            return;
        }

        // 获取数组
        var arr = getHistory();
        // 判断数组里面有没有重复的
        var num = arr.indexOf(txt);
        if(num != -1) {
            arr.splice(num,1);
        }
        if(arr.length >= 7) {
            arr.pop();
        }

        arr.unshift(txt);
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();

        $('.search_input').val('');
    })


})