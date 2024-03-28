
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
    "data": [
        {
            "time": "2017-06-27T11:00:00.000Z",
            "windSpeed": 9,
            "R": "NNW",
            "waveHeight": 2.64
        },
        {
            "time": "2017-06-27T12:30:00.000Z",
            "windSpeed": 10,
            "R": "NNW",
            "waveHeight": 2.57
        },
        {
            "time": "2017-06-27T14:00:00.000Z",
            "windSpeed": 12,
            "R": "NNW",
            "waveHeight": 2.49
        },
        {
            "time": "2017-06-27T15:30:00.000Z",
            "windSpeed": 12,
            "R": "NNW",
            "waveHeight": 2.44
        },
        {
            "time": "2017-06-27T17:00:00.000Z",
            "windSpeed": 11,
            "R": "NNW",
            "waveHeight": 2.38
        },
        {
            "time": "2017-06-27T18:30:00.000Z",
            "windSpeed": 10,
            "R": "NNW",
            "waveHeight": 2.34
        },
        {
            "time": "2017-06-27T20:00:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 2.3
        },
        {
            "time": "2017-06-27T21:30:00.000Z",
            "windSpeed": 11,
            "R": "NNW",
            "waveHeight": 2.26
        },
        {
            "time": "2017-06-27T23:00:00.000Z",
            "windSpeed": 12,
            "R": "NNW",
            "waveHeight": 2.22
        },
        {
            "time": "2017-06-28T00:30:00.000Z",
            "windSpeed": 12,
            "R": "N",
            "waveHeight": 2.18
        },
        {
            "time": "2017-06-28T02:00:00.000Z",
            "windSpeed": 12,
            "R": "N",
            "waveHeight": 2.13
        },
        {
            "time": "2017-06-28T03:30:00.000Z",
            "windSpeed": 12,
            "R": "N",
            "waveHeight": 2.09
        },
        {
            "time": "2017-06-28T05:00:00.000Z",
            "windSpeed": 12,
            "R": "NNE",
            "waveHeight": 2.04
        },
        {
            "time": "2017-06-28T06:30:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 2.01
        },
        {
            "time": "2017-06-28T08:00:00.000Z",
            "windSpeed": 9,
            "R": "N",
            "waveHeight": 1.99
        },
        {
            "time": "2017-06-28T09:30:00.000Z",
            "windSpeed": 8,
            "R": "NNW",
            "waveHeight": 2
        },
        {
            "time": "2017-06-28T11:00:00.000Z",
            "windSpeed": 8,
            "R": "NW",
            "waveHeight": 2.01
        },
        {
            "time": "2017-06-28T12:30:00.000Z",
            "windSpeed": 8,
            "R": "NW",
            "waveHeight": 2.06
        },
        {
            "time": "2017-06-28T14:00:00.000Z",
            "windSpeed": 9,
            "R": "WNW",
            "waveHeight": 2.12
        },
        {
            "time": "2017-06-28T15:30:00.000Z",
            "windSpeed": 10,
            "R": "WNW",
            "waveHeight": 2.19
        },
        {
            "time": "2017-06-28T17:00:00.000Z",
            "windSpeed": 11,
            "R": "WNW",
            "waveHeight": 2.27
        },
        {
            "time": "2017-06-28T18:30:00.000Z",
            "windSpeed": 12,
            "R": "WNW",
            "waveHeight": 2.33
        },
        {
            "time": "2017-06-28T20:00:00.000Z",
            "windSpeed": 13,
            "R": "NW",
            "waveHeight": 2.39
        },
        {
            "time": "2017-06-28T21:30:00.000Z",
            "windSpeed": 13,
            "R": "NW",
            "waveHeight": 2.43
        },
        {
            "time": "2017-06-28T23:00:00.000Z",
            "windSpeed": 14,
            "R": "NW",
            "waveHeight": 2.46
        },
        {
            "time": "2017-06-29T00:30:00.000Z",
            "windSpeed": 16,
            "R": "NW",
            "waveHeight": 2.48
        },
        {
            "time": "2017-06-29T02:00:00.000Z",
            "windSpeed": 18,
            "R": "NNW",
            "waveHeight": 2.49
        },
        {
            "time": "2017-06-29T03:30:00.000Z",
            "windSpeed": 20,
            "R": "WNW",
            "waveHeight": 2.53
        },
        {
            "time": "2017-06-29T05:00:00.000Z",
            "windSpeed": 22,
            "R": "W",
            "waveHeight": 2.58
        },
        {
            "time": "2017-06-29T06:30:00.000Z",
            "windSpeed": 26,
            "R": "WSW",
            "waveHeight": 2.89
        },
        {
            "time": "2017-06-29T08:00:00.000Z",
            "windSpeed": 30,
            "R": "WSW",
            "waveHeight": 3.21
        },
        {
            "time": "2017-06-29T09:30:00.000Z",
            "windSpeed": 30,
            "R": "SW",
            "waveHeight": 3.58
        },
        {
            "time": "2017-06-29T11:00:00.000Z",
            "windSpeed": 29,
            "R": "SW",
            "waveHeight": 3.94
        },
        {
            "time": "2017-06-29T12:30:00.000Z",
            "windSpeed": 29,
            "R": "SW",
            "waveHeight": 4.08
        },
        {
            "time": "2017-06-29T14:00:00.000Z",
            "windSpeed": 29,
            "R": "SW",
            "waveHeight": 4.22
        },
        {
            "time": "2017-06-29T15:30:00.000Z",
            "windSpeed": 28,
            "R": "SW",
            "waveHeight": 4.25
        },
        {
            "time": "2017-06-29T17:00:00.000Z",
            "windSpeed": 28,
            "R": "SW",
            "waveHeight": 4.28
        },
        {
            "time": "2017-06-29T18:30:00.000Z",
            "windSpeed": 29,
            "R": "SSW",
            "waveHeight": 4.37
        },
        {
            "time": "2017-06-29T20:00:00.000Z",
            "windSpeed": 30,
            "R": "SSW",
            "waveHeight": 4.45
        },
        {
            "time": "2017-06-29T21:30:00.000Z",
            "windSpeed": 29,
            "R": "SSW",
            "waveHeight": 4.45
        },
        {
            "time": "2017-06-29T23:00:00.000Z",
            "windSpeed": 27,
            "R": "SSW",
            "waveHeight": 4.45
        },
        {
            "time": "2017-06-30T00:30:00.000Z",
            "windSpeed": 26,
            "R": "SSW",
            "waveHeight": 4.32
        },
        {
            "time": "2017-06-30T02:00:00.000Z",
            "windSpeed": 25,
            "R": "SSW",
            "waveHeight": 4.2
        },
        {
            "time": "2017-06-30T03:30:00.000Z",
            "windSpeed": 22,
            "R": "SSW",
            "waveHeight": 4.01
        },
        {
            "time": "2017-06-30T05:00:00.000Z",
            "windSpeed": 20,
            "R": "SSW",
            "waveHeight": 3.82
        },
        {
            "time": "2017-06-30T06:30:00.000Z",
            "windSpeed": 19,
            "R": "SSW",
            "waveHeight": 3.66
        },
        {
            "time": "2017-06-30T08:00:00.000Z",
            "windSpeed": 19,
            "R": "SSW",
            "waveHeight": 3.51
        },
        {
            "time": "2017-06-30T09:30:00.000Z",
            "windSpeed": 17,
            "R": "SSW",
            "waveHeight": 3.37
        },
        {
            "time": "2017-06-30T11:00:00.000Z",
            "windSpeed": 14,
            "R": "SSW",
            "waveHeight": 3.22
        },
        {
            "time": "2017-06-30T12:30:00.000Z",
            "windSpeed": 12,
            "R": "SSW",
            "waveHeight": 3.09
        },
        {
            "time": "2017-06-30T14:00:00.000Z",
            "windSpeed": 10,
            "R": "SW",
            "waveHeight": 2.96
        },
        {
            "time": "2017-06-30T15:30:00.000Z",
            "windSpeed": 9,
            "R": "WSW",
            "waveHeight": 2.83
        },
        {
            "time": "2017-06-30T17:00:00.000Z",
            "windSpeed": 9,
            "R": "W",
            "waveHeight": 2.7
        },
        {
            "time": "2017-06-30T18:30:00.000Z",
            "windSpeed": 10,
            "R": "W",
            "waveHeight": 2.58
        },
        {
            "time": "2017-06-30T20:00:00.000Z",
            "windSpeed": 10,
            "R": "WNW",
            "waveHeight": 2.45
        },
        {
            "time": "2017-06-30T21:30:00.000Z",
            "windSpeed": 10,
            "R": "WNW",
            "waveHeight": 2.33
        },
        {
            "time": "2017-06-30T23:00:00.000Z",
            "windSpeed": 10,
            "R": "WNW",
            "waveHeight": 2.21
        },
        {
            "time": "2017-07-01T00:30:00.000Z",
            "windSpeed": 10,
            "R": "NW",
            "waveHeight": 2.13
        },
        {
            "time": "2017-07-01T02:00:00.000Z",
            "windSpeed": 10,
            "R": "NW",
            "waveHeight": 2.05
        },
        {
            "time": "2017-07-01T03:30:00.000Z",
            "windSpeed": 10,
            "R": "NNW",
            "waveHeight": 2.02
        },
        {
            "time": "2017-07-01T05:00:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 2
        },
        {
            "time": "2017-07-01T06:30:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 2
        },
        {
            "time": "2017-07-01T08:00:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 1.99
        },
        {
            "time": "2017-07-01T09:30:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 1.98
        },
        {
            "time": "2017-07-01T11:00:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 1.96
        },
        {
            "time": "2017-07-01T12:30:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 1.94
        },
        {
            "time": "2017-07-01T14:00:00.000Z",
            "windSpeed": 11,
            "R": "N",
            "waveHeight": 1.93
        },
        {
            "time": "2017-07-01T15:30:00.000Z",
            "windSpeed": 11,
            "R": "N",
            "waveHeight": 1.93
        },
        {
            "time": "2017-07-01T17:00:00.000Z",
            "windSpeed": 11,
            "R": "NNW",
            "waveHeight": 1.93
        },
        {
            "time": "2017-07-01T18:30:00.000Z",
            "windSpeed": 10,
            "R": "NNW",
            "waveHeight": 1.94
        },
        {
            "time": "2017-07-01T20:00:00.000Z",
            "windSpeed": 10,
            "R": "NNW",
            "waveHeight": 1.96
        },
        {
            "time": "2017-07-01T21:30:00.000Z",
            "windSpeed": 10,
            "R": "NNW",
            "waveHeight": 1.97
        },
        {
            "time": "2017-07-01T23:00:00.000Z",
            "windSpeed": 10,
            "R": "NNW",
            "waveHeight": 1.97
        },
        {
            "time": "2017-07-02T00:30:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 1.96
        },
        {
            "time": "2017-07-02T02:00:00.000Z",
            "windSpeed": 11,
            "R": "N",
            "waveHeight": 1.94
        },
        {
            "time": "2017-07-02T03:30:00.000Z",
            "windSpeed": 11,
            "R": "N",
            "waveHeight": 1.91
        },
        {
            "time": "2017-07-02T05:00:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 1.88
        },
        {
            "time": "2017-07-02T06:30:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 1.84
        },
        {
            "time": "2017-07-02T08:00:00.000Z",
            "windSpeed": 10,
            "R": "N",
            "waveHeight": 1.8
        },
        {
            "time": "2017-07-02T09:30:00.000Z",
            "windSpeed": 11,
            "R": "N",
            "waveHeight": 1.78
        },
        {
            "time": "2017-07-02T11:00:00.000Z",
            "windSpeed": 11,
            "R": "N",
            "waveHeight": 1.76
        },
        {
            "time": "2017-07-02T12:30:00.000Z",
            "windSpeed": 12,
            "R": "N",
            "waveHeight": 1.76
        },
        {
            "time": "2017-07-02T14:00:00.000Z",
            "windSpeed": 13,
            "R": "N",
            "waveHeight": 1.77
        },
        {
            "time": "2017-07-02T15:30:00.000Z",
            "windSpeed": 14,
            "R": "N",
            "waveHeight": 1.81
        },
        {
            "time": "2017-07-02T17:00:00.000Z",
            "windSpeed": 15,
            "R": "N",
            "waveHeight": 1.85
        },
        {
            "time": "2017-07-02T18:30:00.000Z",
            "windSpeed": 14,
            "R": "N",
            "waveHeight": 1.86
        },
        {
            "time": "2017-07-02T20:00:00.000Z",
            "windSpeed": 13,
            "R": "N",
            "waveHeight": 1.87
        },
        {
            "time": "2017-07-02T21:30:00.000Z",
            "windSpeed": 13,
            "R": "N",
            "waveHeight": 1.88
        },
        {
            "time": "2017-07-02T23:00:00.000Z",
            "windSpeed": 13,
            "R": "N",
            "waveHeight": 1.9
        },
        {
            "time": "2017-07-03T00:30:00.000Z",
            "windSpeed": 13,
            "R": "N",
            "waveHeight": 1.91
        },
        {
            "time": "2017-07-03T02:00:00.000Z",
            "windSpeed": 13,
            "R": "N",
            "waveHeight": 1.93
        },
        {
            "time": "2017-07-03T03:30:00.000Z",
            "windSpeed": 13,
            "R": "N",
            "waveHeight": 1.96
        },
        {
            "time": "2017-07-03T05:00:00.000Z",
            "windSpeed": 13,
            "R": "NNE",
            "waveHeight": 1.99
        },
        {
            "time": "2017-07-03T06:30:00.000Z",
            "windSpeed": 12,
            "R": "NNE",
            "waveHeight": 2.03
        },
        {
            "time": "2017-07-03T08:00:00.000Z",
            "windSpeed": 11,
            "R": "NNE",
            "waveHeight": 2.08
        },
        {
            "time": "2017-07-03T09:30:00.000Z",
            "windSpeed": 11,
            "R": "N",
            "waveHeight": 2.12
        },
        {
            "time": "2017-07-03T11:00:00.000Z",
            "windSpeed": 11,
            "R": "NNW",
            "waveHeight": 2.16
        },
        {
            "time": "2017-07-03T12:30:00.000Z",
            "windSpeed": 15,
            "R": "N",
            "waveHeight": 2.22
        },
        {
            "time": "2017-07-03T14:00:00.000Z",
            "windSpeed": 20,
            "R": "N",
            "waveHeight": 2.27
        },
        {
            "time": "2017-07-03T15:30:00.000Z",
            "windSpeed": 20,
            "R": "N",
            "waveHeight": 2.33
        },
        {
            "time": "2017-07-03T17:00:00.000Z",
            "windSpeed": 19,
            "R": "N",
            "waveHeight": 2.39
        },
        {
            "time": "2017-07-03T18:30:00.000Z",
            "windSpeed": 17,
            "R": "N",
            "waveHeight": 2.44
        },
        {
            "time": "2017-07-03T20:00:00.000Z",
            "windSpeed": 15,
            "R": "N",
            "waveHeight": 2.49
        },
        {
            "time": "2017-07-03T21:30:00.000Z",
            "windSpeed": 16,
            "R": "NNW",
            "waveHeight": 2.49
        },
        {
            "time": "2017-07-03T23:00:00.000Z",
            "windSpeed": 17,
            "R": "WNW",
            "waveHeight": 2.49
        },
        {
            "time": "2017-07-04T00:30:00.000Z",
            "windSpeed": 18,
            "R": "W",
            "waveHeight": 2.47
        },
        {
            "time": "2017-07-04T02:00:00.000Z",
            "windSpeed": 20,
            "R": "SW",
            "waveHeight": 2.44
        },
        {
            "time": "2017-07-04T03:30:00.000Z",
            "windSpeed": 21,
            "R": "SW",
            "waveHeight": 2.5
        },
        {
            "time": "2017-07-04T05:00:00.000Z",
            "windSpeed": 21,
            "R": "WSW",
            "waveHeight": 2.56
        },
        {
            "time": "2017-07-04T06:30:00.000Z",
            "windSpeed": 22,
            "R": "WSW",
            "waveHeight": 2.69
        },
        {
            "time": "2017-07-04T08:00:00.000Z",
            "windSpeed": 22,
            "R": "WSW",
            "waveHeight": 2.83
        },
        {
            "time": "2017-07-04T09:30:00.000Z",
            "windSpeed": 23,
            "R": "WSW",
            "waveHeight": 2.94
        },
        {
            "time": "2017-07-04T11:00:00.000Z",
            "windSpeed": 23,
            "R": "WSW",
            "waveHeight": 3.06
        },
        {
            "time": "2017-07-04T12:30:00.000Z",
            "windSpeed": 24,
            "R": "WSW",
            "waveHeight": 3.06
        },
        {
            "time": "2017-07-04T14:00:00.000Z",
            "windSpeed": 24,
            "R": "SW",
            "waveHeight": 3.06
        },
        {
            "time": "2017-07-04T15:30:00.000Z",
            "windSpeed": 25,
            "R": "SW",
            "waveHeight": 3.04
        },
        {
            "time": "2017-07-04T17:00:00.000Z",
            "windSpeed": 25,
            "R": "SW",
            "waveHeight": 3.03
        },
        {
            "time": "2017-07-04T18:30:00.000Z",
            "windSpeed": 26,
            "R": "SW",
            "waveHeight": 3
        },
        {
            "time": "2017-07-04T20:00:00.000Z",
            "windSpeed": 26,
            "R": "SW",
            "waveHeight": 2.97
        }
    ],
    "title": "HOBART",
    "forecast": [
        {
            "localDate": "2017-06-28",
            "day": "Wednesday",
            "minTemp": 4,
            "maxTemp": 13,
            "shortDesc": "Partly cloudy.",
            "skyIcon": "Cloudy",
            "weatherIcon": "MostlySunnyPartlyCloudy",
            "probabilityPrecip": 0,
            "rangePrecipText": "0 to 1 mm",
            "sunrise": "768",
            "sunset": "1673",
            "moonPhase": 0.682,
            "tides": "4,6,18,0.3,L,13,5,1.26,H,18,24,0.94,L,23,57,1.41,H"
        },
        {
            "localDate": "2017-06-29",
            "day": "Thursday",
            "minTemp": 5,
            "maxTemp": 11,
            "shortDesc": "Showers.",
            "skyIcon": "Showers",
            "weatherIcon": "Shower",
            "probabilityPrecip": 70,
            "rangePrecipText": "0 to 1 mm",
            "sunrise": "768",
            "sunset": "1673",
            "moonPhase": 0.901,
            "tides": "4,7,11,0.38,L,13,52,1.29,H,19,32,0.89,L"
        },
        {
            "localDate": "2017-06-30",
            "day": "Friday",
            "minTemp": 3,
            "maxTemp": 11,
            "shortDesc": "Shower or two.",
            "skyIcon": "Showers",
            "weatherIcon": "Shower",
            "probabilityPrecip": 70,
            "rangePrecipText": "0 to 1 mm",
            "sunrise": "768",
            "sunset": "1675",
            "moonPhase": 1.112,
            "tides": "4,1,0,1.3,H,8,0,0.48,L,14,34,1.31,H,20,41,0.84,L"
        },
        {
            "localDate": "2017-07-01",
            "day": "Saturday",
            "minTemp": 1,
            "maxTemp": 11,
            "shortDesc": "Mostly sunny.",
            "skyIcon": "Sunny",
            "weatherIcon": "MostlySunnyPartlyCloudy",
            "probabilityPrecip": 0,
            "rangePrecipText": "",
            "sunrise": "768",
            "sunset": "1675",
            "moonPhase": 1.315,
            "tides": "4,2,3,1.19,H,8,42,0.58,L,15,13,1.33,H,21,47,0.79,L"
        },
        {
            "localDate": "2017-07-02",
            "day": "Sunday",
            "minTemp": 2,
            "maxTemp": 13,
            "shortDesc": "Mostly sunny.",
            "skyIcon": "Sunny",
            "weatherIcon": "MostlySunnyPartlyCloudy",
            "probabilityPrecip": 0,
            "rangePrecipText": "",
            "sunrise": "768",
            "sunset": "1676",
            "moonPhase": 1.513,
            "tides": "4,3,8,1.1,H,9,16,0.67,L,15,48,1.35,H,22,49,0.74,L"
        },
        {
            "localDate": "2017-07-03",
            "day": "Monday",
            "minTemp": 3,
            "maxTemp": 12,
            "shortDesc": "Mostly sunny.",
            "skyIcon": "Sunny",
            "weatherIcon": "MostlySunnyPartlyCloudy",
            "probabilityPrecip": 20,
            "rangePrecipText": "0 to 1 mm",
            "sunrise": "768",
            "sunset": "1676",
            "moonPhase": 1.898,
            "tides": "4,4,15,1.03,H,9,43,0.75,L,16,20,1.37,H,23,41,0.69,L"
        },
        {
            "localDate": "2017-07-04",
            "day": "Tuesday",
            "minTemp": 5,
            "maxTemp": 12,
            "shortDesc": "Shower or two.",
            "skyIcon": "Showers",
            "weatherIcon": "Shower",
            "probabilityPrecip": 50,
            "rangePrecipText": "0 to 2 mm",
            "sunrise": "768",
            "sunset": "1678",
            "moonPhase": 2.088,
            "tides": "4,5,19,1,H,10,0,0.81,L,16,51,1.39,H"
        }
    ]
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
// const stocks = [
//     {
//         name: '名称',
//         MarketPrice: '1.1191',
//         status: 0,
//         containers: 123,
//         Floating: 4343,
//     },
//     {
//         name: '直盘/交叉盘',
//         MarketPrice: '1.1191',
//         status: 0,
//         containers: 123,
//         Floating: 4343,
//     },
//     {
//         name: '策略状态',
//         MarketPrice: '1.1191',
//         status: 0,
//         containers: 123,
//         Floating: 4343,
//     },
//     {
//         name: '市场价格',
//         MarketPrice: '1.1191',
//         status: 0,
//         containers: 123,
//         Floating: 4343,
//     },
// ]
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


