<template>
  <PageWrapper>
    <Card title="执行中项目预警总览">
      <div class="flex flex-wrap">
        <div class="mr-auto">正在管控项目：{{ count1 }}</div>
        <div class="mr-auto">黄色预警项目：{{ getWarningCount('黄色预警') }}</div>
        <div class="mr-auto">红色预警项目：{{ getWarningCount('红色预警') }}</div>
        <div class="mr-auto">正在管控阶段：{{ count2 }}</div>
        <div class="mr-auto">黄色预警阶段：{{ getPhaseWarningCount('黄色预警') }}</div>
        <div class="mr-auto">红色预警阶段：{{ getPhaseWarningCount('红色预警') }}</div>
      </div>
    </Card>
    <Card title="数据总览">
      <Row>
        <Col :span="12">执行中项目预警情况</Col>
        <Col :span="12">执行中项目阶段预警情况</Col>
      </Row>
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
  import { Ref, computed, onMounted, reactive, ref, unref, watchEffect } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Row, Col } from 'ant-design-vue';
  import {
    deptListApi,
    statisticsProjectApi,
    statisticsProjectByDeptApi,
  } from '/@/api/project/project';
  import { warningColorEnum, warningStatusOptions } from '/@/enums/projectControl';
  import { statisticsProjectPhaseApi } from '/@/api/projectPhase/projectPhase';

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
  const chartData2 = ref<{ value: number; name: string }[]>([]);
  const deptList = ref<string[]>([]);
  let chartData3 = reactive({
    redStatus: [],
    yellowStatus: [],
  });

  const count1 = computed(() => chartData1.value.reduce((prev, cur) => prev + cur.value, 0));
  const count2 = computed(() => chartData2.value.reduce((prev, cur) => prev + cur.value, 0));
  const getWarningCount = (status: string) => {
    return unref(chartData1.value).find((x) => x.name === status)?.value ?? 0;
  };
  const getPhaseWarningCount = (status: string) => {
    return unref(chartData2.value).find((x) => x.name === status)?.value ?? 0;
  };

  const getData = (data, type) => {
    const innerData = data.find((x) => x.warningStatus === type);
    if (!innerData) return unref(deptList).map(() => 0);

    const number = unref(deptList).map((dep) => {
      let obj = innerData.statisticsProjectDtoList.find((x) => x.deptName === dep);
      return obj ? +obj.number : 0;
    });
    return number;
  };
  const getChartData = (data) => {
    return data.map((item) => ({
      value: item.number,
      name: warningStatusOptions[item.warningStatus],
      itemStyle: {
        color: warningColorEnum[item.warningStatus],
      },
    }));
  };

  (async () => {
    const apiArr = [
      statisticsProjectApi,
      statisticsProjectByDeptApi,
      deptListApi,
      statisticsProjectPhaseApi,
    ];
    const res = await Promise.all(apiArr.map((api) => api()));
    deptList.value = res[2].map((x) => x.deptName);
    chartData1.value = getChartData(res[0] ?? []);
    chartData2.value = getChartData(res[3] ?? []);
    Object.assign(chartData3, {
      redStatus: getData(res[1], '2'),
      yellowStatus: getData(res[1], '1'),
    });
  })();

  watchEffect(() => {
    // 图表1
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
            formatter: '{name|{b}}\n{time|{c} }\n{percent|{d}%}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            distance: 10,
            rich: {
              time: {
                // fontSize: 14,
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
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: `管控项目:${count1.value}个`,
            fill: '#999',
            fontSize: 16,
          },
        },
      ],
    });
    // 图表2
    setControlOptions2({
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
            formatter: '{name|{b}}\n{time|{c} }\n{percent|{d}%}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            distance: 10,
            rich: {
              time: {
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
          data: chartData2.value,
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDelay: function () {
            return Math.random() * 100;
          },
        },
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: `管控阶段:${count2.value}个`,
            fill: '#999',
            fontSize: 16,
          },
        },
      ],
    });
    // 柱状图
    setBarOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        selected: {
          红色预警: true,
          黄色预警: true,
        },
      },
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
          formatter: '{value} 个',
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: unref(deptList),
      },
      series: [
        {
          name: '红色预警',
          type: 'bar',
          data: chartData3.redStatus,
          label: {
            show: true,
            position: 'top',
          },
          itemStyle: {
            color: '#FF7455',
          },
        },
        {
          name: '黄色预警',
          type: 'bar',
          data: chartData3.yellowStatus,
          label: {
            show: true,
            position: 'top',
          },
          itemStyle: {
            color: '#EFAD03',
          },
        },
      ],
    });
  });

  onMounted(() => {});
</script>
