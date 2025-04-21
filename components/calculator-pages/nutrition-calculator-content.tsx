import { NutritionCalculator } from "@/components/calculators/nutrition-calculator"

interface NutritionCalculatorContentProps {
  jsonLd: any
}

export function NutritionCalculatorContent({ jsonLd }: NutritionCalculatorContentProps) {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Nutrition Calculator</h2>
        <p className="text-muted-foreground mb-6">
          Calculate your daily calorie and macronutrient needs based on your personal metrics, activity level, and
          fitness goals. This calculator provides personalized nutrition recommendations to help you achieve optimal
          health.
        </p>

        <NutritionCalculator />

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Understanding Your Nutritional Needs</h3>
          <p>
            Proper nutrition is essential for maintaining health, supporting physical activity, and achieving fitness
            goals. Your nutritional needs are influenced by various factors including age, gender, weight, height,
            activity level, and specific goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-blue-500">Calories</h4>
              <p className="text-sm mt-2">
                Calories are the energy units your body needs for basic functions and physical activity. Your total
                daily energy expenditure (TDEE) is calculated based on your basal metabolic rate (BMR) and activity
                level.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-green-500">Protein</h4>
              <p className="text-sm mt-2">
                Protein is essential for muscle repair, growth, and maintenance. Requirements range from 1.2g to 2.0g
                per kg of body weight depending on your activity level and goals.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-yellow-500">Carbohydrates</h4>
              <p className="text-sm mt-2">
                Carbohydrates are your body's primary energy source, especially important for high-intensity activities
                and brain function. They typically make up 45-65% of total calories.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-orange-500">Fats</h4>
              <p className="text-sm mt-2">
                Dietary fats are essential for hormone production, vitamin absorption, and overall health. Healthy fats
                should comprise about 20-35% of your total caloric intake.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-purple-500">Micronutrients</h4>
              <p className="text-sm mt-2">
                Vitamins and minerals are essential for numerous bodily functions. Eating a varied diet rich in fruits,
                vegetables, and whole foods helps ensure adequate micronutrient intake.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-pink-500">Hydration</h4>
              <p className="text-sm mt-2">
                Water is crucial for all bodily functions. Aim for 2-3 liters daily, with more needed during intense
                exercise or hot weather.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6">Nutrition for Different Goals</h3>

          <div className="space-y-4 mt-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Weight Maintenance</h4>
              <p className="text-sm mt-2">
                To maintain weight, consume calories equal to your TDEE. Focus on balanced macronutrients and
                nutrient-dense foods to support overall health.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Weight Loss</h4>
              <p className="text-sm mt-2">
                For weight loss, create a moderate calorie deficit (typically 15-20% below TDEE). Maintain higher
                protein intake (1.6-2.0g/kg) to preserve muscle mass while losing fat. Focus on nutrient-dense, filling
                foods.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Muscle Gain</h4>
              <p className="text-sm mt-2">
                Building muscle requires a calorie surplus (typically 10-20% above TDEE) and higher protein intake
                (1.6-2.2g/kg). Timing protein intake around workouts can be beneficial for muscle protein synthesis.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6">Tips for Healthy Eating</h3>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Focus on whole, minimally processed foods</li>
            <li>Include a variety of fruits and vegetables for micronutrients</li>
            <li>Choose lean protein sources</li>
            <li>Incorporate healthy fats from sources like olive oil, avocados, and nuts</li>
            <li>Stay hydrated throughout the day</li>
            <li>Practice portion control and mindful eating</li>
            <li>Consider meal timing around workouts if you're physically active</li>
            <li>Adjust your intake based on results and how you feel</li>
          </ul>

          <p className="mt-4 text-sm text-muted-foreground">
            Note: This calculator provides estimates based on established formulas. Individual needs may vary based on
            factors like medical conditions, specific training goals, and metabolic differences. Consult with a
            registered dietitian or healthcare provider for personalized nutrition advice.
          </p>
        </div>
      </div>
    </div>
  )
}
