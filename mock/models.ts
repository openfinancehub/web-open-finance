
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
  {
    id: '1',
    avatar:
      'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: '中国2月新增人民币贷款(亿元)',
    description: 'Deserunt dolor ea eaque eos',
    rate: 4,
  },
  {
    id: '2',
    avatar:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
    name: '中国2月M2货币供应年率',
    description: 'Animi eius expedita, explicabo',
    rate: 3,
  },
  {
    id: '3',
    avatar:
      'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: '中国2月M1货币供应年率',
    description: '中国2月社会融资规模(亿元)',
    rate: 2.5,
  },
  {
    id: '4',
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: '中国2月社会融资规模(亿元)',
    description: 'Commodi earum exercitationem id numquam vitae',
    rate: 3.5,
  },
]

const newsList = [
  {
    id: '1',
    name: '中国2月新增人民币贷款(亿元)',
    description: 'Deserunt dolor ea eaque eos',
    rate: 4,
  },
  {
    id: '2',
    name: '中国2月M2货币供应年率',
    description: 'Animi eius expedita, explicabo',
    rate: 3,
  },
  {
    id: '3',
   name: '中国2月M1货币供应年率',
    description: '中国2月社会融资规模(亿元)',
    rate: 2.5,
  },
]

const market = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
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
  'GET /api/getMarket': (req: any, res: any) => {
    res.json({
      msg: "成功",
      data: market,
      ret_code: 0,
      extra: {}
    });
  },
  'GET /api/stocks/focused': (req: any, res: any) => {
    res.json({
      msg: "成功",
      data: newsList,
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


