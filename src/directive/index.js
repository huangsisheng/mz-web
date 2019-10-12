import  Vue from "vue";

const globalDirective = () => {
    Vue.directive('scroll-show', {
        inserted(el, binding) {
            let scope = binding.arg || '200';
            window.addEventListener('scroll', function (e) {
                binding.value.value = this.scrollY > Number(scope) ? true : false
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
export default globalDirective