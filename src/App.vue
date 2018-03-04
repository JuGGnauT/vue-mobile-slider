<template>
    <div id="app">
        <div class="slider-wrapper">
            <Slider :autoPlay="true" :interval="4000">
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
                sliders: [
                    {
                        "linkUrl": "https://y.qq.com/m/act/classic/v3/index.html?ADTAG=jiaodiantu",
                        "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000003fOVte2g89l6.jpg",
                        "id": 14520
                    }, {
                        "linkUrl": "https://y.qq.com/m/act/chunwan2018/v3/index.html?ADTAG=jiaodiantu",
                        "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M0000044SNAC19jwin.jpg",
                        "id": 14341
                    }, {
                        "linkUrl": "https://y.qq.com/m/act/HiddenSinger2/v3/index.html?ADTAG=jiaodiantu&_video=true",
                        "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000004KzpJN0GWUnZ.jpg",
                        "id": 14545
                    }, {
                        "linkUrl": "http://y.qq.com/w/album.html?albummid=00399uHz0x76pg",
                        "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M0000037tAz71yXxw9.jpg",
                        "id": 14519
                    }, {
                        "linkUrl": "https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=610955",
                        "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000003bQK163eMtsJ.jpg",
                        "id": 14508
                    }]
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