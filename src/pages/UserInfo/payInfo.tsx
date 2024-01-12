import React from 'react';

const PayInfoPage = () => {
  const dataList =  [
				{
					title: '标准版',
					list: [
						'主视觉及海报设计',
						'线上路演会议服务',
						'IR展示模块搭建',
						'会议宣传推广',
						'线上+线下会议音视频采集',
						'买卖方精准邀请',
						'重点投资人数据库维护',
						'股东变动及重仓机构分析'
					]
				},
				{
					title: '旗舰版',
					tips: '包含标准版全部服务,另加:',
					list: [
						'定制化资本市场报告',
						'行业动态与产业情报跟踪',
						'同业公司动态跟踪',
						'分析师动态及观点跟踪',
						'路演PPT与一图看懂制作',
						'股价异动分析报告'
					]
				},
				{
					title: '尊享版',
					tips: '包含旗舰版全部服务,另加:',
					list: [
						'公司价值梳理',
						'资本市场传播策略',
						'稿件传播',
						'买方关系管理',
						'卖方关系管理',
						'上市公司股份管理'
					]
				}
			],
  return (
    <div>
      <div class="wrap-bottom">
				<h3>服务内容</h3>
				<div class="wrap-card-item">
					<div class="card-item-1" v-for="(item, index) in serviceList" :key="index">
						<div class="title">
							<img :src="require(`@/assets/images/ir-service/version${index + 1}.png`)" />
							<b>{{ item.title }}</b>
							<span class="tags">IRM系统全模块</span>
						</div>
						<h5>服务</h5>
						<p class="extra-info" v-show="item.tips">{{ item.tips }}</p>
						<div class="text">
							<p v-for="(v, k) in item.list" :key="k"><c-svg-icon name="ir-sel" />{{ v }}</p>
						</div>
					</div>
				</div>
			</div>
    </div>
  )

}