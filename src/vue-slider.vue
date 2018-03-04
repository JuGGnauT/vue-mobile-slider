<template>
    <div class="slider">
        <div class="slider-group" ref="sliderGroup"
             @touchstart="touchstartFn"
             @touchmove="touchmoveFn"
             @touchend="touchendFn"
             @transitionend="transitionEndFn"
        >
            <slot></slot>
        </div>
        <div class="dots" v-if="items">
            <span class="dot" v-for="dot,idx in dots"
                  :class="{active:idx=== index}"></span>
        </div>
    </div>
</template>
<script>

    function prefixStyle(type) {

        function prefixStr(style) {
            return style.charAt(0).toUpperCase() + style.substr(1)
        }

        var style = prefixStr(type)

        var STYLE_MAP = {
            webkit: `webkit${style}`,
            moz: `moz${style}`,
            o: `o${style}`,
            ms: `ms${style}`,
            normal: type,
        }

        var div = document.createElement('div')

        for (let k in STYLE_MAP) {

            if (div.style[STYLE_MAP[k]] !== undefined) {
                return STYLE_MAP[k]
            }
        }
    }

    var pfTransform = prefixStyle('transform')
    var pfTransitionDuration = prefixStyle('transitionDuration')
    var pfTransitionTimingFunction = prefixStyle('transitionTimingFunction')


    export default {
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            },
            speed: {
                type: Number,
                default: 400
            },
            items: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                dots: [],
                currentIndex: 0,
                children: [],
                animated: false
            }
        },
        computed: {
            index() {
                return this.loop ? this.currentIndex - 1 : this.currentIndex
            }
        },
        created() {
            this.touch = {}
        },
        mounted() {
            let sliderGroup = this.$refs.sliderGroup;
            let children = sliderGroup.children;
            if (this.loop) {
                let firstNode = children[children.length - 1].cloneNode(true);
                let lastNode = children[0].cloneNode(true);

                sliderGroup.insertBefore(firstNode, children[0]);
                sliderGroup.appendChild(lastNode);

                this._goPage(1)
            } else {
                this._goPage(0)
            }
            this.children = [...sliderGroup.children]
            this._initDots()
            this._initSlider()

            if (this.autoPlay) {
                this._play()
            }

            window.addEventListener('resize', () => {
                this._initSlider()
            }, false)
        },
        methods: {
            _play() {
                var self = this
                if (self.timeout) {
                    clearTimeout(self.timeout)
                }

                function autoPlay() {
                    self.timeout = setTimeout(() => {
                        autoPlay()
                        self.next()
                    }, self.interval)
                }

                autoPlay()
            },
            _goPage(n, isTransition) {
                this.currentIndex = n
                this._translateX(-1 * n * window.innerWidth, isTransition)
            },
            _clearTransition() {
                this.$refs.sliderGroup.style[pfTransitionDuration] = '0ms';
            },
            _translateX(x, isTransition) {
                let sliderGroup = this.$refs.sliderGroup
                if (isTransition) {
                    this.animated = true
                    sliderGroup.style[pfTransitionTimingFunction] = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
                    sliderGroup.style[pfTransitionDuration] = `${this.speed}ms`;
                } else {
                    this._clearTransition()
                }
                sliderGroup.style[pfTransform] = `translate3d(${x}px,0,0)`;
            },
            _getTranslateX(transform) {
                return Number(transform.match(/^translate3d\((.*)px,.*,.*\)/)[1]);
            },
            touchstartFn(ev) {
                if (this.animated) {
                    return
                }
                if (this.autoPlay) this._play()
                this.touch.initial = true;
                const touche = ev.touches[0];
                this.touch.startX = touche.pageX;
                this.touch.startY = touche.pageY;
                let transform = this.$refs.sliderGroup.style[pfTransform];
                this.touch.offsetX = this._getTranslateX(transform);
            },
            touchmoveFn(ev) {
                if (!this.touch.initial) {
                    return
                }

                this.touch.deltaX = ev.touches[0].pageX - this.touch.startX;
                this.touch.deltaY = ev.touches[0].pageY - this.touch.startY;

                if (Math.abs(this.touch.deltaX) < Math.abs(this.touch.deltaY)) {
                    return
                } else {
                    ev.preventDefault()
                }

                this._translateX(this.touch.deltaX + this.touch.offsetX);

                if (!this.loop) {
                    let translateX = this._getTranslateX(this.$refs.sliderGroup.style[pfTransform])
                    if (translateX > window.innerWidth / 10 || translateX < -(this.children.length - 1) * window.innerWidth - window.innerWidth / 10) {
                        this.touch.initial = false
                        this._goPage(this.currentIndex, true)
                    }
                } else {
                    if (Math.abs(this.touch.deltaX) >= window.innerWidth - window.innerWidth / 10) {
                        this.touch.initial = false
                        this.touch.deltaX > 0 ? this.prev() : this.next()
                    }
                }


            },
            touchendFn() {
                if (!this.touch.initial) {
                    return
                }
                const deltaX = this.touch.deltaX;
                if (Math.abs(deltaX) > window.innerWidth / 10) {
                    deltaX > 0 ? this.prev() : this.next()
                } else {
                    // 复位
                    this._goPage(this.currentIndex, true)
                }
                this.touch.deltaX = 0
                this.touch.initial = false;

            },
            transitionEndFn() {
                this.animated = false
                let currentIndex = this.currentIndex;
                if (this.loop) {
                    if (this.currentIndex === this.children.length - 1) {
                        currentIndex = 1
                        this._goPage(1)
                    } else if (this.currentIndex === 0) {
                        this._goPage(this.children.length - 2)
                        currentIndex = this.children.length - 2
                    }
                } else {
                    currentIndex++
                }
                this.$emit('change', currentIndex)
            },
            next() {

                if (!this.loop && this.autoPlay && this.currentIndex === this.children.length - 1) {
                    this._goPage(0, true)
                    return
                }
                this._goPage(this.currentIndex + 1, true)
            },
            prev() {

                this._goPage(this.currentIndex - 1, true)
            },
            _initSlider() {

                this.children.forEach((div, idx) => {
                    if (div.className.indexOf('slider-item') === -1) {
                        let classNameArr = div.className.split(' ');
                        div.className = div.className + (classNameArr > 1 ? ' ' : '') + 'slider-item';
                    }
                    div.style.width = window.innerWidth + 'px';
                })

                this.$refs.sliderGroup.style.width = this.children.length * window.innerWidth + 'px';
            },
            _initDots() {
                this.dots = new Array(this.loop ? this.children.length - 2 : this.children.length)
            },
        }
    }

</script>
<style lang="scss" rel="stylesheet/scss">
    $color-text-l: rgba(255, 255, 255, 0.5);
    $color-text-ll: rgba(255, 255, 255, 0.8);
    .slider {
        min-height: 1px;
        .slider-group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            .slider-item {
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;
                a {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;
                }
                img {
                    display: block;
                    width: 100%;
                }
            }
        }
        .dots {
            position: absolute;
            right: 0;
            left: 0;
            bottom: 12px;
            text-align: center;
            font-size: 0;
            .dot {
                display: inline-block;
                margin: 0 4px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: $color-text-l;
                &.active {
                    width: 20px;
                    border-radius: 5px;
                    background: $color-text-ll;
                }
            }
        }

    }
</style>