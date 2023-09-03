
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


export default {
  'GET /api/queryModelList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: models },
      errorCode: 0
    });
  },
  'POST /api/queryModel': (req: any, res: any) => {
    res.json({
      success: true,
      data: ModelsItem,
      errorCode: 0
    });
  },
  'POST /api/updateModelCode': (req: any, res: any) => {
    res.json({
      success: true,
      data: ModelsItem,
      errorCode: 0
    });
  }
};


