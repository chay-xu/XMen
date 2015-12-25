/**
 * @author : xucaiyu
 * @created : 2015-9-14
 * @desc : 
 */
(function(){
    var hasTouch = 'ontouchstart' in window,
        PCevts = {
            'touchstart': hasTouch ? 'touchstart' : 'mousedown',
            'touchmove': hasTouch ? 'touchmove' : 'mousemove',
            'touchend': hasTouch ? 'touchend' : 'mouseup',
            'touchcancel': hasTouch ? 'touchcancel' : 'mouseout',
            'tap': hasTouch ? 'tap' : 'click'
        };

    var utils = {
            
        }

    // 一次删除input值按钮
    function clearInput() {
        $('.clear-input-box .clear-ipt').on('focus', showHideClear)
        .on('blur', function(){
            var _self = $(this);

            setTimeout(function(){
                _self.next().css('display','none');
            }, 200)
        })
        .on('keyup', showHideClear)

        // 判断value值显示或隐藏
        function showHideClear() {
            var _self = $(this),
                val = _self.val(),
                $next = _self.next();

            if( val ){
                $next.css('display','inline');
            }else{
                $next.css('display','none');
            }
        }
        // 清除值
        $('.clear-input-box .clear-button').click(function(){
            var _self = $(this),
                $prev = _self.prev();

            $prev.val('');
            $prev.focus();
            _self.css('display','none');
        })
        // 清除值
        $('.clear-banner-box .clear-button').on('click', function(){
            var _self = $(this),
                $prev = _self.prev();

            $('.clear-banner-box .clear-button').off('click');
            $('.clear-banner-box').remove();
        })
    }

    clearInput();

    // 数字加减
    function step( callback ){
        var $el = $('.step-box'),
            $num = $el.find('.step-num'),
            $prev = $el.find('.step-prev'),
            $next = $el.find('.step-next'),
            step = $el.attr('data-step'),
            max = $el.attr('data-max'),
            min = $el.attr('data-min'),
            num = $num.val();

        step = step ? Number( step ) : 0;
        max = typeof max == 'string' ? Number( max ) : true;
        min = typeof min === 'string' ? Number( min ) : true;

        $prev.on( PCevts['tap'], function(){
            var val = Number( $num.val() );

            if( val == min ) return;
            val -= step;

            // 是否小于最小值
            if( min !== true ){
                val = val <= min ? min : val;
            }
            
            $num.val( val )
            callback && callback( val );
            // 最小值时prev添加disable样式
            // 其他值时next移除disable样式
            if( min >= val ){
                $next.removeClass('step-disable')
                $prev.addClass('step-disable')
            }else{
                $next.removeClass('step-disable')
            }
        })
        $next.on( PCevts['tap'], function(){
            var val = Number( $num.val() );

            if( val == max ) return;
            val += step;

            if( max !== true ){
                val = val >= max ? max : val;
            }
            
            $num.val( val )
            callback && callback( val );
            // 最大值时next添加disable样式
            // 其他值时prev移除disable样式
            if( max <= val ){
                $prev.removeClass('step-disable')
                $next.addClass('step-disable')
            }else{
                $prev.removeClass('step-disable')
            }
        })

        // $num.on('blur', numBlurFn)

        // function numBlurFn(){
        //     var val = parseInt( $num.val() ) || num,
        //         r = (val - num) % step;
        //     // 如果不能被步长整除，减去余数
        //     if( r != 0 ){
        //         val = (val - r) + step;
        //         showErrorMsg('只能进行百元为单位的充值!')
        //         isMeony = false;
        //     }
        //     if( val <= min ){
        //         val = min
        //     }
        //     if( val >= max ){
        //         val = max
        //     }

        //     $num.val( val );
        //     callback( val );

        //     if( val <= min ){
        //         $next.removeClass('adjust-disable')
        //         $prev.addClass('adjust-disable')
        //     }else if( val >= max ){
        //         $prev.removeClass('adjust-disable')
        //         $next.addClass('adjust-disable')
        //     }else{
        //         $prev.removeClass('adjust-disable')
        //         $next.removeClass('adjust-disable')
        //     }

        // }
        // 初始化
        // numBlurFn()
    }

    step()

})()	