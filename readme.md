vue-mobile-slider,移动端使用的轮播组件
### 版本
vue2.0+
### 特点
* 轻量（12kb+）
* 配置简单

### 安装

```html
  npm install vue-mobile-slider --save
```
### 如何使用

```html
<template>
    <div id="app">
        <div class="slider-wrapper">
            <Slider :autoPlay="true" :interval="4000" :autoPlay="true" :speend="400" items="false">
                <div v-for="item in sliders">
                    <a :href="item.linkUrl">
                        <img :src="item.picUrl"/>
                    </a>
                </div>
            </Slider>
        </div>
    </div>
</template>
<script>
    import Slider from 'vue-mobile-slider'

    export default {
        data() {
            return {
                sliders: []
            }
        },
        components: {
            Slider
        }
    }
</script>
<style lang="scss">
    .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
</style>
```
###  \<script\>标签直接引入

```html

    <div class="slider-wrapper">
        <Slider :autoPlay="true" :interval="4000" :loop="true" @change="handleChange">
            <div v-for="item in sliders">
                <a :href="item.linkUrl">
                    <img :src="item.picUrl"/>
                </a>
             </div>
         </Slider>
    </div>

    <script src="../dist/vue-mobile-slider.js"></script>
    Vue.component('slider',VueSlider)

    new Vue({
            el:'#app',
            data:{
                sliders: []
            },
            methods:{
                handleChange(index){
                    console.log(index)
                }
            }
        })
```
### API

|Name|Type|Default|Default|
|---|:---:|---|---|
|loop|Boolean|true|是否循环播放|
|autoPlay|Boolean|true|是否自动播放|
|interval|Number|4000(ms)|播放间隔|
|speed|Number|400|过渡动画时长|
|items|Boolean|true|是否显示指示栏|

### 注意
包裹组件的容器需加上这些样式
```html
    .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
```
### Slot

```html
<Slider :autoPlay="true" :interval="4000" :loop="true" @change="handleChange">
    <div v-for="item in sliders">
        <a :href="item.linkUrl">
            <img :src="item.picUrl"/>
        </a>
    </div>
</Slider>
```
