
const models = [
  { id: 0, code: 'Umi', text: 'U' },
  { id: 1, code: 'Fish', text: 'B' }
];


const ModelsItem = {
  id: 0,
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

const data = {
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
};


export default {
  'GET /api/queryModelList': (req: any, res: any) => {
    res.json({
      msg: "成功",
      data: { list: models },
      ret_code: 0,
      extra: {}
    });
  },
  'POST /api/queryModel': (req: any, res: any) => {
    res.json({
      msg: "成功",
      data: ModelsItem,
      ret_code: 0,
      extra: {}
    });
  },
  'POST /api/updateModelCode': (req: any, res: any) => {
    res.json({
      msg: "成功",
      data: ModelsItem,
      ret_code: 0,
      extra: {}
    });
  },
  'POST /api/modelData': (req: any, res: any) => {
    res.json({
      msg: "成功",
      data: data,
      ret_code: 0,
      extra: {}
    });
  },
  'POST /api/upload': (req: any, res: any) => {
    res.json({
      msg: "文件上传成功",
      data: { url: '/12/34' },
      // "url": "https://example.com/uploads/filename.pdf", 
      ret_code: 0,
      extra: {}
    });
  },

};


