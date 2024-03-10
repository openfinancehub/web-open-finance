import React from 'react';
import { Button } from 'antd';

import './index.less'

import vSel from '@/assets/images/ir-sel.svg'

const PayVersionPage = () => {
	const dataList = [
		{
			title: '标准版',
			list: [
				'主视觉及海报设计',
				'主视觉及海报设计',
				'主视觉及海报设计',
				'主视觉及海报设计',
				'主视觉及海报设计111'
			],
			price: 0
		},
		{
			title: '旗舰版',
			tips: '包含标准版全部服务,另加:',
			list: [
				'投资报告分析瞎说的',
				'投资报告分析瞎说的',
				'投资报告分析瞎说的',
				'股价异动分析报告'
			],
			price: 20
		},
		{
			title: '尊享版',
			tips: '包含旗舰版全部服务,另加:',
			list: [
				'股价异动分析报告',
				'资本市场传播策略',
				'股价异动分析报告',
				'上市公司股份分析'
			],
			price: 50
		}
	];
	return (
		<div>
			<div className="wrap-bottom">
				<h3>系统版本</h3>
				<div className='wrap-card-item'>
					{
						dataList.map((item, index) => {
							return (
								<>
									<div className="card-item-1">
										<div className="title">
											<img src={require(`@/assets/images/version${index + 1}.png`)} />
											<b>{item.title}</b>
											<span className="tags">${item.price}<i className='normal'>/月</i></span>
										</div>
										<div className='wrap-btn'> <Button type='primary' ghost>点击购买</Button></div>
										<h5>服务</h5>
										<p className="extra-info" v-show="item.tips">{item.tips}</p>
										<div className="text">
											{
												item.list.map((v, k) => (
													<p key={k}>
														<img src={vSel} alt='' />
														{/* <c-svg-icon name="ir-sel" /> */}
														{v}
													</p>

												))
											}

										</div>
									</div>

								</>
							)
						})
					}

				</div>


			</div>
		</div>
	)

}

export default PayVersionPage;