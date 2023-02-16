import * as ECharts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
import Vue from "vue";
const HANDLER = "_vue_resize_handler";
function bind(el, binding) {
    el[HANDLER] = binding.value
        ? binding.value
        : () => {
            let chart = ECharts.getInstanceByDom(el);
            if (!chart) {
                return;
            }
            chart.resize();
        };
    // 监听绑定的div大小变化，更新 echarts 大小
    elementResizeDetectorMaker().listenTo(el, el[HANDLER]);
}
function unbind(el) {
    // window.removeEventListener("resize", el[HANDLER]);
    elementResizeDetectorMaker().removeListener(el, el[HANDLER]);
    delete el[HANDLER];
}
// 自定义指令：v-chart-resize 示例：v-chart-resize="fn"
Vue.directive("chart-resize", { bind, unbind });
