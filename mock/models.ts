
const ModelsItem = {
  id: "version",
  code: `import numpy as np

  class Polynomial:
      def __init__(self, coefficients):
          self.coefficients = np.array(coefficients)
          
      def evaluate(self, x):
          powers = np.arange(len(self.coefficients))
          return np.sum(self.coefficients * x**powers)
      
      def differentiate(self):
          powers = np.arange(1, len(self.coefficients))
          new_coefficients = self.coefficients[1:] * powers
          return Polynomial(new_coefficients)
      
      def integrate(self, constant=0):
          powers = np.arange(len(self.coefficients) + 1)
          new_coefficients = self.coefficients / powers
          new_coefficients = np.insert(new_coefficients, 0, constant)
          return Polynomial(new_coefficients)
      
      def __str__(self):
          terms = []
          for i, coef in enumerate(self.coefficients[::-1]):
              power = len(self.coefficients) - i - 1
              if coef != 0:
                  if power == 0:
                      terms.append(f"{coef:.2f}")
                  elif power == 1:
                      terms.append(f"{coef:.2f}x")
                  else:
                      terms.append(f"{coef:.2f}x^{power}")
          return " + ".join(terms[::-1])
  
  # 示例用法
  coefficients = [3, 0, -1, 2]
  poly = Polynomial(coefficients)
  
  x_value = 2
  result = poly.evaluate(x_value)
  print(f"Polynomial value at x = {x_value}: {result}")
  
  derivative = poly.differentiate()
  print(f"Derivative: {derivative}")
  
  integral = poly.integrate(constant=1)
  print(f"Integral: {integral}")
  `,
  text: '这是一点解释说明的文本'
}

const defaultData = {
  "chart": {
    "type": "pie",
    "appendix": {
      "title": ""
    },
    "relation": [
      { "source": "a", "target": "b" },
      { "source": "a", "target": "c" },
      { "source": "a", "target": "d" },
      { "source": "c", "target": "e" }],
    "nodes": {
      "a": [
        { "text": "曝光UV", "value": "1000万", "icon": "", "trend": "45.9%" },
        { "text": "点击", "value": "1000万", "icon": "", "trend": "45.9%" }],
      "b": { "text": "曝光UV", "value": "1000万", "icon": "", "trend": "45.9%" },
      "c": { "text": "曝光UV", "value": "1000万", "icon": "", "trend": "45.9%" },
      "d": { "text": "曝光UV", "value": "1000万", "icon": "", "trend": "45.9%" },
      "e": { "text": "曝光UV", "value": "1000万", "icon": "", "trend": "45.9%" },
    },
  }
}


const modelData = {
  id: 'A0',
  value: {
    title: 'Get financial analysis',
    items: [
      {
        text: '3031万',
        value: '80%',
      },
    ],
    percent: 0.8,
  },
  children: [
    {
      id: 'A1',
      value: {
        title: '降本增收项目1',
        percent: 0.7,
        items: [
          {
            text: '1152万',
          },
          {
            text: '占比',
            value: '70%',
          },
        ],
      },
      children: [
        {
          id: 'A11',
          value: {
            title: '降本增收项目1-1',
            items: [
              {
                text: '1152万',
              },
              {
                text: '占比',
                value: '30%',
              },
            ],
          },
        },
        {
          id: 'A12',
          value: {
            title: '降本增收项目1-2',
            items: [
              {
                text: '1152万',
              },
              {
                text: '占比',
                value: '30%',
              },
            ],
          },
        },
        {
          id: 'A13',
          value: {
            title: '降本增收项目1-3',
            items: [
              {
                text: '1152万',
              },
              {
                text: '占比',
                value: '30%',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'A2',
      value: {
        title: '降本增收项目2',
        percent: 0.3,
        items: [
          {
            text: '595万',
          },
          {
            text: '占比',
            value: '30%',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
          },
        ],
      },
    },
  ],
}

const news = [
  { title: '全球绿色能源投资增长显著，推动可持续发展进程', content: `随着全球气候变化问题日益严峻，绿色能源已成为各国竞相发展的重要领域。近年来，全球绿色能源投资呈现出强劲增长态势，为推动可持续发展进程注入了新的动力。

  据统计，今年全球绿色能源投资总额已达到数千亿美元，其中太阳能、风能、水能等清洁能源项目占据主导地位。这些投资不仅为各国经济增长提供了新的动力，同时也为全球应对气候变化、实现绿色低碳发展提供了有力支持。
  
  在全球范围内，欧洲、亚洲和北美地区的绿色能源投资表现尤为突出。欧洲各国政府纷纷出台政策，鼓励企业和个人投资绿色能源项目，以实现碳中和目标。亚洲地区，中国、印度等新兴市场国家也在积极发展绿色能源产业，以推动经济转型升级。北美地区，美国和加拿大在绿色能源技术研发和创新方面取得了一系列重要突破。
  
  绿色能源投资的快速增长，不仅带动了相关产业链的发展，也为全球创造了大量就业机会。据国际可再生能源机构（IRENA）报告，到XXXX年，全球可再生能源行业将创造超过XXXX万个就业机会，为全球经济增长和社会稳定作出重要贡献。
  
  然而，绿色能源投资也面临着诸多挑战。首先，绿色能源项目的投资回报周期长、风险相对较高，需要政府、企业和金融机构共同努力，提供稳定的政策支持和资金保障。其次，部分地区的电力基础设施薄弱，难以满足清洁能源的大规模接入需求。此外，一些国家对于化石能源的依赖程度较高，转型难度较大。
  
  针对这些挑战，各国政府和国际组织正在积极寻求解决方案。一方面，通过加强国际合作，推动绿色能源技术的研发和创新，降低清洁能源的成本和风险。另一方面，加大对电力基础设施的投资，提高清洁能源的接入能力和消纳水平。同时，加强对化石能源的环境监管和税收征管，推动能源结构的优化和转型。
  
  总体来看，全球绿色能源投资前景广阔，发展潜力巨大。随着各国政府对可持续发展和应对气候变化问题的重视程度不断提升，以及清洁能源技术的不断进步和成本降低，预计未来几年全球绿色能源投资将继续保持快速增长态势。这将为全球应对气候变化、实现绿色低碳发展提供有力支持，同时也将为各国经济增长和社会稳定带来重要机遇。` },
  { title: '新闻2', content: '111122223333' },
]

export default {
  'GET /api/getNews': (req: any, res: any) => {
    res.json({
      msg: "成功",
      data: news,
      ret_code: 0,
      extra: {}
    });
  },
  'POST /api/updateCode': (req: any, res: any) => {
    res.json({
      msg: "成功",
      data: ModelsItem,
      ret_code: 0,
      extra: {}
    });
  },
  'POST /api/test': (req: any, res: any) => {
    res.json({
      msg: "成功",
      data: defaultData,
      ret_code: 0,
      extra: {}
    });
  },
  'POST /api/upload': (data: any, res: any) => {

    res.json({
      msg: "文件上传成功",
      data: { url: '/12/34' },
      // "url": "https://example.com/uploads/filename.pdf", 
      ret_code: 0,
      extra: {}
    });
  },

};


