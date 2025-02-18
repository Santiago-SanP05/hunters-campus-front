<template>
    <div class="shimmer">
        <div class="shimmer__wrapper">
            <div class="shimmer__item">
                <div>
                    <div class="shimmer__block" style="max-width: 148px"></div>
                    <div class="shimmer__block" style="max-width: 128px"></div>
                    <div class="shimmer__block" style="max-width: 158px"></div>
                </div>
                <div>
                    <div class="shimmer__block" style="max-width: 515px"></div>
                </div>
            </div>
            <div class="shimmer__item">
                <div>
                    <div class="shimmer__block" style="max-width: 64px"></div>
                    <div class="shimmer__block" style="max-width: 286px"></div>
                </div>
                <div>
                    <div class="shimmer__block" style="max-width: 351px"></div>
                </div>
            </div>
            <div class="shimmer__item">
                <div>
                    <div class="shimmer__block" style="max-width: 254px"></div>
                    <div class="shimmer__block" style="max-width: 129px"></div>
                    <div class="shimmer__block" style="max-width: 162px"></div>
                </div>
                <div>
                    <div class="shimmer__block" style="max-width: 190px"></div>
                </div>
            </div>
            <div class="shimmer__item">
                <div>
                    <div class="shimmer__block" style="max-width: 59px"></div>
                    <div class="shimmer__block" style="max-width: 124px"></div>
                    <div class="shimmer__block" style="max-width: 161px"></div>
                </div>
                <div>
                    <div class="shimmer__block" style="max-width: 185px"></div>
                </div>
            </div>
            <div class="shimmer__item">
                <div>
                    <div class="shimmer__block" style="max-width: 59px"></div>
                    <div class="shimmer__block" style="max-width: 124px"></div>
                    <div class="shimmer__block" style="max-width: 161px"></div>
                </div>
                <div>
                    <div class="shimmer__block" style="max-width: 185px"></div>
                </div>
            </div>
            <div class="shimmer__item">
                <div>
                    <div class="shimmer__block" style="max-width: 208px"></div>
                    <div class="shimmer__block" style="max-width: 123px"></div>
                    <div class="shimmer__block" style="max-width: 159px"></div>
                </div>
                <div>
                    <div class="shimmer__block" style="max-width: 194px"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

body {
    background-color: #2c303f;
}

.shimmer {
    max-width: 824px;
    max-height: 60vh;
    overflow: hidden;
    margin: 50px auto;

    &__wrapper {
        background-color: #fff;
        border-radius: 4px;
        overflow: hidden;
    }

    &__item {
        background: #fff;
        min-height: 79px;
        padding: 14px 32px 13px;
        display: flex;
        flex-wrap: wrap;
        &:not(:last-child) {
            border-bottom: 1px solid rgba(40, 45, 58, 0.1);
        }
        > div {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            flex-basis: 100%;
            max-width: 100%;
        }
    }

    &__block {
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        animation-delay: 0.5s;
        background-color: #ededed;
        background-image: linear-gradient(
        90deg,
        #ededed 14.36%,
        #d7d6d6 56.29%,
        #ededed 100%
        );
        background-repeat: no-repeat;
        background-size: 244px 104px;
        position: relative;
        height: 19px;
        border-radius: 10px;
        width: 100%;
        margin: 3px 6px 3px 0px;
    }
}

@keyframes placeHolderShimmer {
    0% {
        background-position: calc(0% - 300px) 0;
    }

    20% {
        background-position: calc(0% - 300px) 0;
    }

    80% {
        background-position: calc(100% + 300px) 0;
    }

    100% {
        background-position: calc(100% + 300px) 0;
    }
}

</style>
