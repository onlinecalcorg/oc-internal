import { BMICalculator } from "@/components/calculators/bmi-calculator"

interface BMICalculatorContentProps {
  jsonLd: any
}

export function BMICalculatorContent({ jsonLd }: BMICalculatorContentProps) {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Body Mass Index (BMI) Calculator</h2>
        <p className="text-muted-foreground mb-6">
          Calculate your Body Mass Index (BMI) to assess if your weight is in a healthy range for your height. BMI is a
          screening tool that can indicate whether you may have weight-related health risks.
        </p>

        <BMICalculator />

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Understanding Your BMI Results</h3>
          <p>
            BMI is a calculation that uses your height and weight to estimate how much body fat you have. While BMI
            doesn't directly measure body fat, it provides a reasonable indicator for most people and is used to
            identify possible weight problems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-blue-500">Underweight (BMI below 18.5)</h4>
              <p className="text-sm mt-2">
                Being underweight can indicate malnutrition or other health problems. If you're underweight, consider
                consulting with a healthcare provider to determine if there's an underlying condition.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-green-500">Normal weight (BMI 18.5-24.9)</h4>
              <p className="text-sm mt-2">
                A BMI in this range suggests that your weight is healthy for your height. Maintain a balanced diet and
                regular physical activity to stay in this range.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-yellow-500">Overweight (BMI 25-29.9)</h4>
              <p className="text-sm mt-2">
                Being overweight may increase your risk of health problems. Consider making lifestyle changes such as
                improving your diet and increasing physical activity.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-orange-500">Obesity (BMI 30 and above)</h4>
              <p className="text-sm mt-2">
                Obesity significantly increases your risk for various health conditions. It's recommended to consult
                with healthcare providers about weight management strategies.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6">Limitations of BMI</h3>
          <p>While BMI is a useful screening tool, it has several limitations:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>It doesn't distinguish between fat, muscle, and bone mass</li>
            <li>It doesn't account for where fat is stored in the body</li>
            <li>It may not be accurate for athletes, elderly people, or pregnant women</li>
            <li>BMI categories may not be appropriate for all ethnic groups</li>
          </ul>

          <p className="mt-4">
            For a comprehensive health assessment, BMI should be considered alongside other factors such as waist
            circumference, blood pressure, cholesterol levels, blood sugar, family history, and lifestyle factors.
          </p>
        </div>
      </div>
    </div>
  )
}
