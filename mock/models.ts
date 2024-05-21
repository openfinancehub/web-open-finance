
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


const news = [
    {
        avatar:
            'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: '中国2月新增人民币贷款(亿元)',
        description: 'Deserunt dolor ea eaque eos',
        rate: 4,
    },
    {
        avatar:
            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
        name: '中国2月M2货币供应年率',
        description: 'Animi eius expedita, explicabo',
        rate: 3,
    },
    {
        avatar:
            'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: '中国2月M1货币供应年率',
        description: '中国2月社会融资规模(亿元)',
        rate: 2.5,
    },
    {
        avatar:
            'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: '中国2月社会融资规模(亿元)',
        description: 'Commodi earum exercitationem id numquam vitae',
        rate: 3.5,
    },
]
const stocks = {
    title: ['名称', '直盘/交叉盘', '策略状态', '市场价格', '浮动盈亏'],
    stocksList: [
        {
            "name": "三菱日联",
            "MarketPrice": "1.1191",
            "containers": 12,
            "Floating": 809
        },
        {
            "name": "路透IFR",
            "MarketPrice": "0.8643",
            "containers": 14,
            "Floating": 680
        },
        {
            "name": "摩根士丹利",
            "status": "out",
            "MarketPrice": "0.9673",
            "containers": 10,
            "Floating": -973
        },
        {
            "name": "高盛",
            "MarketPrice": "1.0432",
            "containers": 12,
            "Floating": -432
        },
        {
            "name": "野村控股",
            "MarketPrice": "0.7842",
            "containers": 13,
            "Floating": 842
        }
    ]
}


const eventsList = {
    "经济数据一览": [
        {
            avatar:
                'https://ts1.cn.mm.bing.net/th/id/R-C.3d9746bdeba918046825d83a31dced65?rik=6eONyOiXGCflgA&riu=http%3a%2f%2fimages.huanqiu.com%2fsarons%2f2012%2f12%2f0bf9bc31ae851a6e2acf8e706539d4e6.png&ehk=69z0C5djde39lm3%2fpTLhEqp7S%2bx0ulX%2bB4VHsf4plh0%3d&risl=&pid=ImgRaw&r=0',
            name: '中国2月社会融资规模(亿元)',
            description: 'Commodi earum exercitationem id numquam vitae',
            rate: 3.5,
            time: '2024-03-26 12:00:00',
        },
        {
            avatar: 'https://ts1.cn.mm.bing.net/th/id/R-C.3d9746bdeba918046825d83a31dced65?rik=6eONyOiXGCflgA&riu=http%3a%2f%2fimages.huanqiu.com%2fsarons%2f2012%2f12%2f0bf9bc31ae851a6e2acf8e706539d4e6.png&ehk=69z0C5djde39lm3%2fpTLhEqp7S%2bx0ulX%2bB4VHsf4plh0%3d&risl=&pid=ImgRaw&r=0',
            name: '中国2月M1货币供应年率',
            description: '中国2月社会融资规模(亿元)',
            rate: 2.5,
            time: '2024-03-25 10:00:00',
        },
        {
            avatar: 'https://ts1.cn.mm.bing.net/th/id/R-C.3d9746bdeba918046825d83a31dced65?rik=6eONyOiXGCflgA&riu=http%3a%2f%2fimages.huanqiu.com%2fsarons%2f2012%2f12%2f0bf9bc31ae851a6e2acf8e706539d4e6.png&ehk=69z0C5djde39lm3%2fpTLhEqp7S%2bx0ulX%2bB4VHsf4plh0%3d&risl=&pid=ImgRaw&r=0',
            description: 'Deserunt dolor ea eaque eos',
            name: '中国5月M2货币',
            rate: 4,
            time: '2024-03-25 12:00:00',
        },
        {
            avatar: 'https://ts1.cn.mm.bing.net/th/id/R-C.3d9746bdeba918046825d83a31dced65?rik=6eONyOiXGCflgA&riu=http%3a%2f%2fimages.huanqiu.com%2fsarons%2f2012%2f12%2f0bf9bc31ae851a6e2acf8e706539d4e6.png&ehk=69z0C5djde39lm3%2fpTLhEqp7S%2bx0ulX%2bB4VHsf4plh0%3d&risl=&pid=ImgRaw&r=0',
            name: '中国2月M2货币供应年率',
            description: 'Animi eius expedita, explicabo',
            rate: 3,
            time: '2024-03-25 12:00:00',
        },
    ],
    "重点事件": [
        {
            avatar: 'https://p1.ssl.qhmsg.com/t01f35bcdab1018a879.png',
            name: '中国2月社会融资规模(亿元)',
            description: 'Commodi earum exercitationem id numquam vitae',
            rate: 3.5,
            time: '2024-03-26 12:00:00',
        },
        {
            avatar: 'https://p1.ssl.qhmsg.com/t01f35bcdab1018a879.png',
            name: '中国2月M1货币供应年率',
            description: '中国2月社会融资规模(亿元)',
            rate: 2.5,
            time: '2024-03-25 12:00:00',
        },
        {
            avatar: 'https://p1.ssl.qhmsg.com/t01f35bcdab1018a879.png',
            name: '中国2月新增人民币贷款(亿元)',
            description: 'Deserunt dolor ea eaque eos',
            rate: 4,
            time: '2024-03-25 12:00:00',
        },
    ],

}

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
    'GET /api/stocks': (req: any, res: any) => {
        res.json({
            msg: "成功",
            data: stocks,
            ret_code: 0,
            extra: {}
        });
    },
    'GET /api/events': (req: any, res: any) => {
        res.json({
            msg: "成功",
            data: eventsList,
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
    'GET /api/test': (req: any, res: any) => {
        res.json({
            msg: "成功",
            data: news,
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


