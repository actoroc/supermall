<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <swipe :topImages="topImages" class="detailSwipe"></swipe>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
    </ul>
  </div>
</template>

<script>
import detailNavBar from "./childitem/detailNavBar";
import swipe from "./childitem/detailSwipe";
import detailBaseInfo from "./childitem/detailBaseInfo";
import detailShopInfo from "./childitem/detailShopInfo";

import { getDetail, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  components: {
    detailNavBar,
    detailBaseInfo,
    detailShopInfo,
    swipe,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
    });
  },
};
</script>

<style lang='less' scoped>
.detailSwipe {
  padding-top: 44px;
}
</style>
