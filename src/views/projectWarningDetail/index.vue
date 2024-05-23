<template>
  <PageWrapper>
    <Card title="数据总览">
      <Row>
        <Col :span="12">
          <div ref="chartControlRef" class="min-h-400px"></div>
          <div class="mt-6"></div>
        </Col>
        <Col :span="12">
          <div ref="chartControlRef2" class="min-h-400px"></div>
        </Col>
      </Row>
    </Card>

    <Card title="各部门进行中项目预警总览">
      <div ref="chartBarRef" class="w-full min-h-500px"></div>
    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Ref, onMounted, reactive, ref, watchEffect } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Row, Col } from 'ant-design-vue';
  import { statisticsProjectApi, statisticsProjectByDeptApi } from '/@/api/project/project';
  import { warningColorEnum, warningStatusEnum } from '/@/enums/projectControl';

  const router = useRouter();

  const { hasPermission } = usePermission();
  // 图表
  const chartControlRef = ref<HTMLDivElement | null>(null);
  const chartControlRef2 = ref<HTMLDivElement | null>(null);
  const chartBarRef = ref<HTMLDivElement | null>(null);
  const { setOptions: setControlOptions } = useECharts(chartControlRef as Ref<HTMLDivElement>);
  const { setOptions: setControlOptions2 } = useECharts(chartControlRef2 as Ref<HTMLDivElement>);
  const { setOptions: setBarOptions } = useECharts(chartBarRef as Ref<HTMLDivElement>);

  const chartData1 = ref<{ value: number; name: string }[]>([]);
  let chartData3 = reactive({
    xData: [],
    redStatus: [],
    yellowStatus: [],
  });

  (async () => {
    const apiArr = [statisticsProjectApi, statisticsProjectByDeptApi];
    const res = await Promise.all(apiArr.map((api) => api()));
    console.log(res);
    chartData1.value = res[0].map((item) => ({
      value: item.number,
      name: warningStatusEnum[item.warningStatus],
      itemStyle: {
        color: warningColorEnum[item.warningStatus],
      },
    }));
    console.log(chartData1.value);

    // const redArr = res[1].find((item) => +item.warningStatus === 2);
    // const yellowArr = res[1].find((item) => +item.warningStatus === 0);
    // const yellowDept = yellowArr && yellowArr.statisticsProjectDtoList.map((x) => x.deptName);
    // const redDept = redArr && yellowArr.statisticsProjectDtoList.map((x) => x.deptName);

    // console.log(redArr, yellowArr);
    // chartData3 = Object.assign(chartData3, {});
  })();
  watchEffect(() => {
    setControlOptions({
      legend: {
        show: false,
        bottom: '0',
        left: 'center',
      },
      textStyle: {
        color: '#999',
        fontWeight: 'normal',
        fontSize: 14,
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          top: 0,
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            alignTo: 'labelLine',
            formatter: '{name|{b}}\n{time|{c} }',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            distance: 10,
            rich: {
              time: {
                fontSize: 10,
                color: '#999',
              },
            },
          },
          labelLine: {
            length: 15,
            length2: 100,
            maxSurfaceAngle: 80,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '12',
              fontWeight: 'bold',
            },
          },
          data: chartData1.value,
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDelay: function () {
            return Math.random() * 100;
          },
        },
      ],
    });
  });
  onMounted(() => {
    console.log(chartData1.value, 'test');

    setControlOptions2({
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: '1%',
        left: 'center',
      },
      series: [
        {
          color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '12',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
          ],
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDelay: function () {
            return Math.random() * 100;
          },
        },
      ],
    });

    setBarOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {},
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
        axisLabel: {
          formatter: '{value} 元',
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['第一部门', '第二部门', '第三部门', '第四部门'],
      },
      series: [
        {
          name: '红色预警',
          type: 'bar',
          data: [18203, 23489, 29034, 104970],
          label: {
            show: true,
          },
          itemStyle: {
            color: '#FF7455',
          },
        },
        {
          name: '黄色预警',
          type: 'bar',
          data: [19325, 23438, 31000, 121594],
          label: {
            show: true,
          },
          itemStyle: {
            color: '#EFAD03',
          },
        },
      ],
    });
  });
</script>
