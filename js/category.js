
$(function(){
    // 区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条
    });

    // 渲染左侧模板
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        dataType: 'json',
        success: function(info){
            console.log(info);
            var htmlStr = template('leftTpl',info);
            $('#uu').html( htmlStr );
            renderId(info.rows[0].id);
        }
    })

    // 实现左侧菜单切换功能
    $('#uu').on('click','a',function(){
        $('#uu a').removeClass('current');  //移除所有a上面的类
        $(this).addClass('current');   //给当前的a添加上current类

        // 获取a身上的id
        var id = $(this).data('id');
        renderId(id);
    })

    // 渲染二级分类
    // renderId(1);
    function renderId(id){
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id,
            },
            dataType: 'json',
            success: function(info){
                console.log(info);
                var htmlstr = template('rightTpl',info);
                $('#right').html(htmlstr);
            }
        })
    }


})