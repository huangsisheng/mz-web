import  Vue from "vue";

export const directiveFun = () => {
    Vue.directive('scroll-show', {
        inserted(el, binding) {
            let scope = binding.arg || '200';
            window.addEventListener('scroll', function (e) {
                if (this.scrollY > Number(scope)) {
                    binding.value.value = true;
                } else {
                    binding.value.value = false;
                }
            })
        }
    })

    Vue.directive('to-top', {
        inserted(el, binding) {
            let e = binding.arg || 'click';
            el.addEventListener(e, function () {
                let scrollToptimer = setInterval(function () {
                    let top = document.documentElement.scrollTop + document.body.scrollTop;
                    let speed = top / 4;
                    top -= speed;
                    document.documentElement.scrollTop = document.body.scrollTop = top;
                    if (top == 0) {
                        clearInterval(scrollToptimer);
                        scrollToptimer = null
                    }
                }, 30)
            })
        }
    })
}
